import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ ProductList } />
      <Route path="/shopping-cart" component={ ShoppingCart } />
      <Route exact path="/product/:id" component={ ProductDetails } />
      <Route path="/checkout" component={ Checkout } />
    </Switch>
  );
}

export default App;
