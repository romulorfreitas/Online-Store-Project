import React, { Component } from 'react';
import PropType from 'prop-type'

class ProductCard extends Component {
  render() {
    const { product } = this.props;
    return (
      <div data-testid="product">
        <h3>{ product.title }</h3>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>{ product.price }</p>
      </div>
    );
  }
}

export default ProductCard;
