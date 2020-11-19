import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/updateObject';

const players = ['Red', 'Blue'];

const initialState = {
  player: null,
  opponent: null,
  size: 3,
  availableMoves: [],
  playerMadeMoves: [],
  opponentMadeMoves: [],
};

const setFirstPlayer = (state, action) => {
  return updateObject(state, {
    player: players[0],
    opponent: players[1],
  });
};

const setSecondPlayer = (state, action) => {
  return updateObject(state, {
    player: players[1],
    opponent: players[0],
  });
};

const getAvailableMoves = (state, action) => {
  return updateObject(state, {
    availableMoves: action.availableMoves,
  });
};

const makeMove = (state, action) => {
  return updateObject(state, {
    playerMadeMoves: [...state.playerMadeMoves, action.coords]
  }); 
};

const getOpponentMove = (state, action) => {
  return updateObject(state, {
    opponentMadeMoves: [...state.opponentMadeMoves, action.coords],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FIRST_PLAYER: return setFirstPlayer(state, action);
    case actionTypes.SET_SECOND_PLAYER: return setSecondPlayer(state, action);
    case actionTypes.GET_AVAILABLE_MOVES: return getAvailableMoves(state, action);
    case actionTypes.MAKE_MOVE: return makeMove(state, action);
    case actionTypes.GET_OPPONENT_MOVE: return getOpponentMove(state, action);
    default: return state;
  }
};

export default reducer;