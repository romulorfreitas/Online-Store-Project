import React from 'react';
import CartButton from '../components/CartButton';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';

class ProductList extends React.Component {
  state = {
    search: '',
    returnedProduct: [],
    loading: false,
    found: true,
  };

  onChangeHandler = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  onSumbitHandler = async () => {
    const { search } = this.state;
    this.setState({ loading: true }, async () => {
      const returnedProduct = await getProductsFromCategoryAndQuery(null, search);
      this.setState({ search: '', returnedProduct: returnedProduct.results }, () => {
        if (returnedProduct.results.length !== 0) {
          this.setState({ returnedProduct: returnedProduct.results, loading: false });
        } else {
          this.setState({ loading: false, found: false });
        }
      });
    });
  };

  render() {
    const { returnedProduct, loading, found } = this.state;
    const notFound = 'Nenhum produto foi encontrado';

    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <form>
          <label htmlFor="search" data-testid="home-initial-message">
            <input
              name="search"
              type="text"
              id="search"
              onChange={ this.onChangeHandler }
              data-testid="query-input"
            />
            Digite algum termo de pesquisa ou escolha uma categoria.
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.onSumbitHandler }
          >
            Procurar
          </button>
        </form>
        <CartButton />
        { !found ? <p>{ notFound }</p> : returnedProduct.map((product) => (
          <ProductCard
            key={ product.id }
            product={ product }
          />))}
      </div>
    );
  }
}

export default ProductList;
