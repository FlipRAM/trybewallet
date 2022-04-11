import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { editExpense, formToEdit, removeExpense } from '../actions';
import styles from './TableExpense.module.css';

class TableExpense extends React.Component {
  getName = (abbreviation) => {
    const { expenses } = this.props;
    if (abbreviation === 'USD') {
      return 'Dólar Comercial';
    }
    const objMatch = expenses.find((element) => element.currency === abbreviation);

    return objMatch.exchangeRates[abbreviation].name.split('/')[0];
  }

  removeExpense = (obj) => {
    const { expenses, removeById } = this.props;
    const newExpenses = [...expenses];
    const index = newExpenses.indexOf(obj);
    newExpenses.splice(index, 1);
    removeById(newExpenses);
  }

  editExpense = (obj) => {
    const { formEdit } = this.props;
    formEdit(obj);
  }

  render() {
    const { expenses } = this.props;
    const tableHeaderList = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <div className={ styles.TableContainer }>
        <table className={ styles.Table }>
          <thead>
            <tr>
              {tableHeaderList.map((header) => (
                <th key={ header }>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{parseFloat(element.value).toFixed(2)}</td>
                <td>{this.getName(element.currency)}</td>
                <td>
                  {parseFloat(element.exchangeRates[element.currency].ask).toFixed(2)}
                </td>
                <td>
                  {`${(parseFloat(element.value)
                  * parseFloat(element.exchangeRates[element.currency].ask)).toFixed(2)
                  }`}
                </td>
                <td>Real</td>
                <td>
                  <button
                    className={ styles.btnEdit }
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editExpense(element) }
                  >
                    Editar
                  </button>
                  <button
                    className={ styles.btnRemove }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.removeExpense(element) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeById: (obj) => dispatch(removeExpense(obj)),
  editExpenseAction: (list, obj, index) => dispatch(editExpense(list, obj, index)),
  formEdit: (obj) => dispatch(formToEdit(obj)),
});

TableExpense.propTypes = {
  expenses: propTypes.arrayOf(propTypes.shape),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableExpense);
