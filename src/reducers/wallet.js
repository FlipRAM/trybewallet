// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  REQUEST_CURRENCIES,
  FAILED_REQUEST,
  GET_QUOTATION,
  REQUEST_QUOTATION,
  FAILED_QUOTATION_REQUEST,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  FORM_TO_EDIT,
  REMOVE_FORM_TO_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  isFetchingQuotation: false,
  dataToEdit: false,
  isEditing: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      currencies: ['Erro na API'],
      isFetching: false,
    };
  case REQUEST_QUOTATION:
    return {
      ...state,
      isFetchingQuotation: true,
    };
  case GET_QUOTATION:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      isFetching: false,
    };
  case FAILED_QUOTATION_REQUEST:
    return {
      ...state,
      expenses: ['Erro na API'],
      isFetching: false,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.newExpenses,
      isEditing: false,
    };
  case FORM_TO_EDIT: return { ...state, dataToEdit: action.dataToEdit, isEditing: true };
  case REMOVE_FORM_TO_EDIT: return { ...state, dataToEdit: false };
  default: return state;
  }
};

export default wallet;
