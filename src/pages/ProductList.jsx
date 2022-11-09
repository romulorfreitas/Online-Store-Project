import React from 'react';
import CartButton from '../components/CartButton';
import SideBar from '../components/SideBar';
import * as api from '../services/api';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';

class ProductList extends React.Component {
  state = {
    search: '',
    returnedProduct: [],
    loading: false,
    found: true,
    categoryList: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  onSumbitHandler = async () => {
    const { search } = this.state;
    this.setState({ loading: true }, async () => {
      const returnedProduct = await api.getProductsFromCategoryAndQuery(null, search);
      this.setState({ search: '', returnedProduct: returnedProduct.results }, () => {
        if (returnedProduct.results.length !== 0) {
          this.setState({ returnedProduct: returnedProduct.results, loading: false });
        } else {
          this.setState({ loading: false, found: false });
        }
      });
    });
  };

  onChangeHandler = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  fetchCategories = async () => {
    const categories = await api.getCategories();
    this.setState({
      categoryList: categories,
    });
  };

  render() {
    const { returnedProduct, loading, found, categoryList } = this.state;
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
        <ul>
          { categoryList.map((categories) => (<SideBar
            key={ categories.id }
            name={ categories.name }
            category={ categories.id }
          />))}
        </ul>
        <CartButton />
        { !found ? <p>{ notFound }</p> : returnedProduct.map((product) => (
          <ProductCard
            key={ product.id }
            price={ product.price }
            title={ product.title }
            thumbnail={ product.thumbnail }
          />))}
      </div>
    );
  }
}

export default ProductList;
