import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardCart extends Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price, id, cont } = product;
    return (
      <div data-testid="product">
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <h5>{ id }</h5>
        <img src={ thumbnail } alt={ title } />
        <p>
          R$
          { price }
        </p>
        <Link
          to={ `/product/${id}` }
          data-testid="product-detail-link"
        >
          Ver Detalhes
        </Link>
        <p data-testid="shopping-cart-product-quantity">
          Você tem
          { ` ${cont} ` }
          no seu carrinho!
        </p>
      </div>
    );
  }
}

CardCart.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    cont: PropTypes.number,
  }).isRequired,
};

export default CardCart;
