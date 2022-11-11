import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  state = {
    products: [],
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: false,
    canSubmit: false,
    failPayment: false,
  };

  componentDidMount() {
    const getLocalStorage = localStorage.getItem('Cart Products');
    const returnGet = JSON.parse(getLocalStorage);
    this.setState({
      products: returnGet,
    });
  }

  productRender = () => {
    const { products } = this.state;
    const makeStringfy = products.map(JSON.stringify);
    const oneProduct = new Set(makeStringfy);
    return Array.from(oneProduct).map(JSON.parse);
  };

  verifyButton = () => {
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      payment,
    } = this.state;
    const buttonEnable = fullname !== ''
      && email !== ''
      && cpf !== ''
      && phone !== ''
      && cep !== ''
      && address !== ''
      && payment !== false;
    this.setState({ canSubmit: buttonEnable });
  };

  onChangeHandler = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.verifyButton);
  };

  payCheckout = () => {
    const { history } = this.props;
    const cartProducts = [];
    localStorage.setItem('Cart Products', JSON.stringify(cartProducts));
    history.push('/');
  };

  buttonCheck = () => {
    const { canSubmit } = this.state;
    if (canSubmit) {
      this.payCheckout();
    } else {
      this.setState({ failPayment: true });
    }
  };

  render() {
    const { products, failPayment } = this.state;
    return (
      <div>
        <div>
          {
            products && (
              this.productRender().map((item, index) => (
                <section key={ index }>
                  <p data-testid="shopping-cart-product-name">{item.title}</p>
                  <img src={ item.thumbnail } alt={ item.title } />
                  <p>
                    R$
                    {item.price}
                  </p>
                  <p data-testid="shopping-cart-product-quantity">
                    {products.filter((pd) => pd.id === item.id).length}
                  </p>
                </section>)))
          }
        </div>
        <form>
          <label htmlFor="fullname">
            <input
              data-testid="checkout-fullname"
              name="fullname"
              id="fullname"
              placeholder="Nome Completo"
              onChange={ this.onChangeHandler }
            />
          </label>
          <label htmlFor="email">
            <input
              data-testid="checkout-email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={ this.onChangeHandler }
            />
          </label>
          <label htmlFor="cpf">
            <input
              data-testid="checkout-cpf"
              name="cpf"
              id="cpf"
              placeholder="CPF"
              onChange={ this.onChangeHandler }
            />
          </label>
          <label htmlFor="phone">
            <input
              data-testid="checkout-phone"
              name="phone"
              placeholder="Telefone"
              onChange={ this.onChangeHandler }
            />
          </label>
          <label htmlFor="cep">
            <input
              data-testid="checkout-cep"
              name="cep"
              id="cep"
              placeholder="CEP"
              onChange={ this.onChangeHandler }
            />
          </label>
          <label htmlFor="address">
            <input
              data-testid="checkout-address"
              name="address"
              id="address"
              placeholder="Endereço"
              onChange={ this.onChangeHandler }
            />
          </label>
          <label htmlFor="ticket">
            <input
              type="radio"
              name="payment"
              id="ticket"
              data-testid="ticket-payment"
              onChange={ this.onChangeHandler }
            />
            Boleto
          </label>
          <label htmlFor="visa">
            <input
              type="radio"
              name="payment"
              id="visa"
              data-testid="ticket-payment"
              onChange={ this.onChangeHandler }
            />
            Visa
          </label>
          <label htmlFor="master">
            <input
              type="radio"
              name="payment"
              id="master"
              data-testid="master-payment"
              onChange={ this.onChangeHandler }
            />
            MasterCard
          </label>
          <label htmlFor="elo">
            <input
              type="radio"
              name="payment"
              id="elo"
              data-testid="ticket-payment"
              onChange={ this.onChangeHandler }
            />
            Elo
          </label>
          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ (event) => {
              event.preventDefault();
              this.buttonCheck();
            } }
          >
            Botão
          </button>
        </form>
        {
          failPayment ? <h1 data-testid="error-msg">Campos inválidos</h1> : null
        }
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Checkout;
