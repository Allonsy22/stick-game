import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';

const players = ['Red', 'Blue'];

const initialState = {
  player: null,
  opponent: null,
  isNextTurn: true,
  opponentTurn: false,
  size: 3,
  gameOver: false,
  winner: null,
  availableMoves: [],
  playerMadeMoves: [],
  opponentMadeMoves: [],
  playerOwnedSquares: [],
  opponentOwnedSquares: [],
};

const setGameSize = (state, action) => {
  return updateObject(state, {
    size: parseInt(action.size),
  });
};

const setFirstPlayer = (state, action) => {
  return updateObject(state, {
    player: players[0],
    opponent: players[1],
    isNextTurn: true,
  });
};

const setSecondPlayer = (state, action) => {
  return updateObject(state, {
    player: players[1],
    opponent: players[0],
    isNextTurn: false,
  });
};

const getAvailableMoves = (state, action) => {
  return updateObject(state, {
    availableMoves: action.availableMoves,
  });
};

const gameOver = (state) => {
  const diff = state.playerOwnedSquares.length - state.opponentOwnedSquares.length;
  let winner = 'Draw';
  if (diff > 0) winner = state.player;
  if (diff < 0) winner = state.opponent;
  return updateObject(state, {
    gameOver: true,
    winner, 
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

const setNextTurn = (state, action) => {
  return updateObject(state, {
    isNextTurn: !state.isNextTurn
  });
};

const setPlayerOwnedSquare = (state, action) => {
  return updateObject(state, {
    playerOwnedSquares: [...state.playerOwnedSquares, ...action.playerOwnedSquares],
  });
};

const setOpponentOwnedSquare = (state, action) => {
  return updateObject(state, {
    opponentOwnedSquares: [...state.opponentOwnedSquares, ...action.opponentOwnedSquares],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAME_SIZE: return setGameSize(state, action);
    case actionTypes.SET_FIRST_PLAYER: return setFirstPlayer(state, action);
    case actionTypes.SET_SECOND_PLAYER: return setSecondPlayer(state, action);
    case actionTypes.GET_AVAILABLE_MOVES: return getAvailableMoves(state, action);
    case actionTypes.GAME_OVER: return gameOver(state);
    case actionTypes.MAKE_MOVE: return makeMove(state, action);
    case actionTypes.GET_OPPONENT_MOVE: return getOpponentMove(state, action);
    case actionTypes.SET_NEXT_TURN: return setNextTurn(state, action);
    case actionTypes.SET_PLAYER_OWNED_SQUARE: return setPlayerOwnedSquare(state, action);
    case actionTypes.SET_OPPONENT_OWNED_SQUARE: return setOpponentOwnedSquare(state, action);
    default: return state;
  }
};

export default reducer;