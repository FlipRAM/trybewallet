import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { BiMoney } from 'react-icons/bi';
import styles from './Header.module.css';

class Header extends React.Component {
  checkExpense = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return 0;
    } if (expenses.length > 0) {
      const totalParc = expenses.reduce(
        (sum, curEl) => {
          sum += (
            parseInt(curEl.value, 10)
            * parseFloat(curEl.exchangeRates[curEl.currency].ask)
          );
          return sum;
        }, 0,
      );
      const total = totalParc.toFixed(2);
      return total;
    }
  }

  render() {
    const { email } = this.props;
    return (
      <header className={ styles.HeaderContainer }>
        <div className={ styles.IconContainer }>
          <div className={ styles.Icon }>
            <BiMoney />
            <span>
              /
            </span>
          </div>
          <p
            data-testid="email-field"
          >
            { email }
            feliperangel@live.com.pt
          </p>
        </div>
        <div className={ styles.TotalExpenses }>
          <p
            data-testid="total-field"
          >
            {this.checkExpense()}
            {' '}
            <span
              data-testid="header-currency-field"
            >
              BRL
            </span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string,
  expenses: propTypes.arrayOf(propTypes.shape),
}.isRequired;

export default connect(mapStateToProps, null)(Header);
