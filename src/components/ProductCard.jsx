import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div data-testid="product">
        <h3>{ title }</h3>
        <img src={ thumbnail } alt={ title } />
        <p>
          R$
          { price }
        </p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default ProductCard;
