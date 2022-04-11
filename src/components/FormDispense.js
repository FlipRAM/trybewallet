import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { editExpense, fetchQuotation, removeFormToEdit } from '../actions';
import styles from './FormDispense.module.css';

class FormDispense extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      payMethodList: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagDispense: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      editData: false,
    };
  }

  componentDidUpdate() {
    const { dataToEditForm, removeEdit } = this.props;
    if (dataToEditForm) {
      this.setState({
        id: dataToEditForm.id,
        value: dataToEditForm.value,
        description: dataToEditForm.description,
        currency: dataToEditForm.currency,
        method: dataToEditForm.method,
        tag: dataToEditForm.tag,
        editData: dataToEditForm,
      }, () => removeEdit());
    }
  }

  updateState = ({ target: { name, value } }) => {
    const { editData } = this.state;
    if (editData === false) {
      this.setState({
        [name]: value,
      });
    } if (editData) {
      const newEditData = editData;
      newEditData[name] = value;
      this.setState({
        [name]: value,
        editData: newEditData,
      });
    }
  }

  saveExpense = () => {
    const { isEditingForm, expensesList, editExpenseForm } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
      editData,
    } = this.state;
    const obj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    if (isEditingForm === false) {
      const { fetchQuote } = this.props;
      this.setState({
        id: id + 1,
        value: '',
        description: '',
      }, () => fetchQuote(obj));
    } if (isEditingForm === true) {
      this.setState({
        id: id + 1,
        value: '',
        description: '',
      }, () => editExpenseForm(expensesList, editData, id));
    }
  }

  render() {
    const { currencies, isEditingForm } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      payMethodList,
      tagDispense,
    } = this.state;
    return (
      <div className={ styles.container }>
        <form className={ styles.FormsContainer }>
          <label htmlFor="value" className={ styles.label }>
            {'Valor: '}
            <input
              className={ styles.Input }
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.updateState }
            />
          </label>
          <label htmlFor="currency" className={ styles.label }>
            {'Moeda: '}
            <select
              className={ styles.Select }
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.updateState }
            >
              {currencies.length > 0 && currencies.map((eachCurrency) => (
                <option key={ eachCurrency } value={ eachCurrency }>
                  {eachCurrency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method" className={ styles.label }>
            {'Método de pagamento: '}
            <select
              className={ styles.Select }
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.updateState }
            >
              {payMethodList.map((eachMethod) => (
                <option key={ eachMethod } value={ eachMethod }>
                  {eachMethod}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="tag" className={ styles.label }>
            {'Categoria: '}
            <select
              className={ styles.Select }
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.updateState }
            >
              {tagDispense.map((eachTag) => (
                <option key={ eachTag } value={ eachTag }>
                  {eachTag}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="description" className={ styles.label }>
            {'Descrição: '}
            <input
              className={ styles.Input }
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.updateState }
            />
          </label>
          <button
            className={ styles.btnAdd }
            type="button"
            onClick={ () => this.saveExpense() }
          >
            { isEditingForm ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isEditingForm: state.wallet.isEditing,
  dataToEditForm: state.wallet.dataToEdit,
  expensesList: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuote: (obj) => dispatch(fetchQuotation(obj)),
  removeEdit: () => dispatch(removeFormToEdit()),
  editExpenseForm: (list, obj, index) => dispatch(editExpense(list, obj, index)),
});

FormDispense.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string),
  fetchQuotation: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormDispense);
