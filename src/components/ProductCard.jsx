import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price, id } = product;
    const obj = {
      title,
      thumbnail,
      price,
      id,
    };
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
          item={ product }
        >
          Ver Detalhes
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="submit"
          onClick={ () => {
            const oldCart = JSON.parse(localStorage.getItem('Cart Products'));
            localStorage.setItem('Cart Products', JSON.stringify([...oldCart, obj]));
          } }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
