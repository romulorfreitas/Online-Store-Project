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
    const { title, thumbnail, price, id } = product;
    const obj = {
      title,
      thumbnail,
      price,
      id,
    };
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
        <button
          data-testid="product-detail-add-to-cart"
          type="submit"
          onClick={ () => {
            const oldCart = JSON.parse(localStorage.getItem('Cart Products'));
            localStorage.setItem('Cart Products', JSON.stringify([...oldCart, obj]));
          } }
        >
          Adicionar ao carrinho
        </button>
        <CartButton />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ProductDetails;
