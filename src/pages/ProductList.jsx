import React from 'react';
import CartButton from '../components/CartButton';

class ProductList extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="search" data-testid="home-initial-message">
          <input type="text" id="search" />
          Digite algum termo de pesquisa ou escolha uma categoria.
        </label>
        <CartButton />
      </div>
    );
  }
}

export default ProductList;
