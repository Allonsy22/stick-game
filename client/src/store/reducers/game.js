import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/updateObject';

const players = ['Red', 'Blue'];

const initialState = {
  player: null,
  size: 3,
  availableMoves: [],
};

const setFirstPlayer = (state, action) => {
  return updateObject(state, {
    player: players[0],
  });
};

const setSecondPlayer = (state, action) => {
  return updateObject(state, {
    player: players[1],
  });
};

const getAvailableMoves = (state, action) => {
  return updateObject(state, {
    availableMoves: action.availableMoves,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FIRST_PLAYER: return setFirstPlayer(state, action);
    case actionTypes.SET_SECOND_PLAYER: return setSecondPlayer(state, action);
    case actionTypes.GET_AVAILABLE_MOVES: return getAvailableMoves(state, action);
    default: return state;
  }
};

export default reducer;