import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { changeEmail } from '../actions';
import styles from './Login.module.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      passIsShow: false,
    };
  }

  changeForm = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  }

  validateForm = () => {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordMinLength = 6;
    if (emailRegex.test(email) && password.length >= passwordMinLength) {
      this.setState({
        isDisabled: false,
      });
    } if (!emailRegex.test(email) || password.length < passwordMinLength) {
      this.setState({
        isDisabled: true,
      });
    }
  }

  saveEmailAndExit = () => {
    const { saveEmail, history } = this.props;
    const { email } = this.state;
    saveEmail(email);
    history.push('/carteira');
  }

  changePassType = () => {
    const { passIsShow } = this.state;
    if (passIsShow) {
      this.setState({ passIsShow: false });
    } if (passIsShow === false) {
      this.setState({ passIsShow: true });
    }
  }

  render() {
    const { isDisabled, passIsShow } = this.state;
    return (
      <div className={ styles.container }>
        <form className={ styles.wrapper }>
          <h1>Entrar</h1>
          <label htmlFor="email" className={ styles.label }>
            <input
              className={ styles.input }
              type="email"
              data-testid="email-input"
              name="email"
              onChange={ this.changeForm }
              placeholder="Email"
            />
          </label>
          <label htmlFor="password" className={ styles.label }>
            <input
              className={ styles.input }
              type={ passIsShow ? 'text' : 'password' }
              data-testid="password-input"
              name="password"
              onChange={ this.changeForm }
              placeholder="Senha"
            />
            <button
              className={ styles.btn_pass }
              type="button"
              onClick={ this.changePassType }
            >
              {passIsShow ? <FaEye /> : <FaEyeSlash />}
            </button>
          </label>
          <button
            className={ styles.btn_login }
            type="button"
            disabled={ isDisabled }
            onClick={ this.saveEmailAndExit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(changeEmail(email)),
});

Login.propTypes = {
  saveEmail: propTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
