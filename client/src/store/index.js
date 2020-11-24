import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';

import gameReducer from './reducers/game';
import dialogReducer from './reducers/dialog';
import authReducer from './reducers/auth';
import statisticsReducer from './reducers/statistics';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  game: gameReducer,
  dialog: dialogReducer,
  auth: authReducer,
  stats: statisticsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const persistor = persistStore(store);

export {
  store,
  persistor,
};