import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import gameReducer from './reducers/game';
import dialogReducer from './reducers/dialog';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  game: gameReducer,
  dialog: dialogReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;