import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const getLocalStorage = localStorage.getItem('Cart Products');
    const returnGet = JSON.parse(getLocalStorage);
    this.setState({
      products: returnGet,
    });
  }

  productRender = () => {
    const { products } = this.state;
    const makeStringfy = products.map(JSON.stringify);
    const oneProduct = new Set(makeStringfy);
    return Array.from(oneProduct).map(JSON.parse);
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <Link to="/">
          <button type="button">
            Home
          </button>
        </Link>
        {
          products[0] === undefined
            && <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</p>
        }
        { products && (
          this.productRender().map((item, index) => (
            <section key={ index }>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>
                R$
                {item.price}
              </p>
              <p data-testid="shopping-cart-product-quantity">
                {products.filter((pd) => pd.id === item.id).length}
              </p>
            </section>))
        )}
      </div>
    );
  }
}

export default ShoppingCart;
