import React from 'react';
import CardCart from '../components/CardCart';

class ShoppingCart extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.cartProducts();
  }

  verifyProduct = (product) => {
    const { cart } = this.state;
    if (!cart.includes(product)) {
      this.setState((oldState) => ({
        cart: [...oldState.cart, product],
      }));
    }
  };

  cartProducts = () => {
    const cartFull = JSON.parse(localStorage.getItem('Cart Products'));
    cartFull.forEach((product) => {
      this.verifyProduct(product);
    });
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        {cart[0] === undefined
          ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )
          : cart.map((product) => (
            <CardCart key={ product.title } product={ product } />))}
      </div>
    );
  }
}

export default ShoppingCart;
