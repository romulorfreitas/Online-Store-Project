import React from 'react';
import { Link } from 'react-router-dom';

class CartButton extends React.Component {
  render() {
    return (
      <Link to="/shopping-cart" data-testid="shopping-cart-button">
        Carrinho de Compras
      </Link>
    );
  }
}

export default CartButton;
