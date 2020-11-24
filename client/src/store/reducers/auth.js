import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';
import { cleareMessage } from '../actions';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const registerSuccess = (state) => updateObject(state, {
  isLoggedIn: false,
});

const registerFail = (state, action) => updateObject(state, {
  isLoggedIn: false,
  message: action.message,
});

const loginSuccess = (state, action) => updateObject(state, {
  isLoggedIn: true,
  user: action.userData,
});

const loginFail = (state, action) => updateObject(state, {
  isLoggedIn: false,
  user: null,
  message: action.message,
});

const logout = (state) => updateObject(state, {
  isLoggedIn: false,
  user: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS: return registerSuccess(state);
    case actionTypes.REGISTER_FAIL: return registerFail(state, action);
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL: return loginFail(state, action);
    case actionTypes.LOGOUT: return logout(state);
    case actionTypes.CLEAR_MESSAGE: return cleareMessage(state);
    default: return state;
  }
};

export default reducer;
