import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartButton from '../components/CartButton';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.fetchByID();
  }

  fetchByID = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProductById(id);
    this.setState({ product });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <h3 data-testid="product-detail-name">{ product.title }</h3>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <p data-testid="product-detail-price">
          R$
          { product.price }
        </p>
        <CartButton />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ProductDetails;
