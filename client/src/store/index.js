import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import gameReducer from './reducers/game';
import dialogReducer from './reducers/dialog';

const rootReducer = combineReducers({
  game: gameReducer,
  dialog: dialogReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;