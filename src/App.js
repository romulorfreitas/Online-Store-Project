import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ ProductList } />
      <Route path="/shopping-cart" component={ ShoppingCart } />
    </Switch>
  );
}

export default App;
