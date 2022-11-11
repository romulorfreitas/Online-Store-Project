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

  componentDidUpdate() {

  }

  decreaseQnt = (id) => {
    const { products } = this.state;
    const cartTotal = products.filter((product) => (product.id === id)).slice(1);
    const cutCart = products.filter((product) => product.id !== id);
    const newCart = [...cutCart, ...cartTotal];
    const stringedCart = JSON.stringify(newCart);
    localStorage.setItem('Cart Products', stringedCart);
    this.setState({ products: newCart });
  };

  increaseQnt = (id) => {
    const { products } = this.state;
    const cartTotal = products.filter((product) => (product.id === id));
    const cutCart = products.filter((product) => product.id !== id);
    const newCart = [...cutCart, ...cartTotal, cartTotal[0]];
    const stringedCart = JSON.stringify(newCart);
    localStorage.setItem('Cart Products', stringedCart);
    this.setState({ products: newCart });
  };

  removeBtn = (id) => {
    const { products } = this.state;
    const cartTotal = products.filter((product) => product.id !== id);
    const stringedCart = JSON.stringify(cartTotal);
    localStorage.setItem('Cart Products', stringedCart);
    this.setState({ products: cartTotal });
  };

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
              <button
                type="button"
                onClick={ () => this.decreaseQnt(item.id) }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">
                {products.filter((pd) => pd.id === item.id).length}
              </p>
              <button
                type="button"
                onClick={ () => this.increaseQnt(item.id) }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <button
                type="button"
                onClick={ () => this.removeBtn(item.id) }
                data-testid="remove-product"
              >
                Remover do carrinho
              </button>
            </section>))
        )}
      </div>
    );
  }
}

export default ShoppingCart;
