import React from 'react';
import CartButton from '../components/CartButton';
import SideBar from '../components/SideBar';
import * as api from '../services/api';

class ProductList extends React.Component {
  state = {
    categoryList: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categories = await api.getCategories();
    this.setState({
      categoryList: categories,
    });
  };

  render() {
    const { categoryList } = this.state;
    return (
      <div>
        <label htmlFor="search" data-testid="home-initial-message">
          <input type="text" id="search" />
          Digite algum termo de pesquisa ou escolha uma categoria.
        </label>
        <ul>
          { categoryList.map((categories) => (<SideBar
            key={ categories.id }
            name={ categories.name }
            category={ categories.id }
          />))}
        </ul>
        <CartButton />
      </div>
    );
  }
}

export default ProductList;
