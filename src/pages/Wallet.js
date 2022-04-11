import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import FormDispense from '../components/FormDispense';
import TableExpense from '../components/TableExpense';
import { fetchCurrencies } from '../actions';
// import styles from './Wallet.module.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetch, currencies } = this.props;
    if (currencies.length === 0) {
      fetch();
    }
  }

  render() {
    return (
      <main>
        <Header />
        <FormDispense />
        <TableExpense />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  isFetching: propTypes.bool,
  currencies: propTypes.arrayOf(propTypes.shape),
  fetchCurrencies: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
