import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/updateObject';

const players = ['Red', 'Blue'];

const initialState = {
  player: null,
};

const createGame = (state, action) => {
  return updateObject(state, {
    player: players[0],
  });
};

const joinGame = (state, action) => {
  return updateObject(state, {
    player: players[1],
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_GAME: return createGame(state, action);
    case actionTypes.JOIN_GAME: return joinGame(state, action);
    default: return state;
  }
};

export default reducer;