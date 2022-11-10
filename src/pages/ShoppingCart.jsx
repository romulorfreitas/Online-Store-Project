import React from 'react';
import ProductCard from '../components/ProductCard';

class ShoppingCart extends React.Component {
  render() {
    const cart = JSON.parse(localStorage.getItem('Cart Products'));
    return (
      <div>
        {cart[0] === undefined
          ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )
          : cart.map((product) => <ProductCard key={ product.id } product={ product } />)}
      </div>
    );
  }
}

export default ShoppingCart;
