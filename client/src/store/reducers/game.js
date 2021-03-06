import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';

const players = ['Red', 'Blue'];

const initialState = {
  size: 3,
  winner: null,
  player: null,
  opponent: null,
  roomCode: null,
  gameOver: false,
  isNextTurn: true,
  isGameReady: false,
  opponentTurn: false,
  isOpponnentConnected: false,
  availableMoves: [],
  playerMadeMoves: [],
  opponentMadeMoves: [],
  playerOwnedSquares: [],
  opponentOwnedSquares: [],
};

const setRoomCode = (state, action) => updateObject(state, {
  roomCode: action.roomCode,
});

const setGameSize = (state, action) => updateObject(state, {
  size: parseInt(action.size),
});

const setFirstPlayer = (state) => updateObject(state, {
  player: players[0],
  opponent: players[1],
  isNextTurn: true,
});

const setSecondPlayer = (state) => updateObject(state, {
  player: players[1],
  opponent: players[0],
  isNextTurn: false,
});

const getAvailableMoves = (state, action) => updateObject(state, {
  availableMoves: action.availableMoves,
});

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

const makeMove = (state, action) => updateObject(state, {
  playerMadeMoves: [...state.playerMadeMoves, action.coords],
});

const getOpponentMove = (state, action) => updateObject(state, {
  opponentMadeMoves: [...state.opponentMadeMoves, action.coords],
});

const setNextTurn = (state) => updateObject(state, {
  isNextTurn: !state.isNextTurn,
});

const setPlayerOwnedSquare = (state, action) => updateObject(state, {
  playerOwnedSquares: [...state.playerOwnedSquares, ...action.playerOwnedSquares],
});

const setOpponentOwnedSquare = (state, action) => updateObject(state, {
  opponentOwnedSquares: [...state.opponentOwnedSquares, ...action.opponentOwnedSquares],
});

const setOpponentConnection = (state, action) => updateObject(state, {
  isOpponnentConnected: action.isOpponnentConnected,
});

const setGameStatus = (state, action) => updateObject(state, {
  isGameReady: action.isGameReady,
});

const deleteGame = (state) => updateObject(state, {
  size: 3,
  winner: null,
  player: null,
  opponent: null,
  roomCode: null,
  gameOver: false,
  isNextTurn: true,
  isGameReady: false,
  opponentTurn: false,
  isOpponnentConnected: false,
  availableMoves: [],
  playerMadeMoves: [],
  opponentMadeMoves: [],
  playerOwnedSquares: [],
  opponentOwnedSquares: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ROOM_CODE: return setRoomCode(state, action);
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
    case actionTypes.SET_OPPONNENT_CONNECTION: return setOpponentConnection(state, action);
    case actionTypes.SET_GAME_STATUS: return setGameStatus(state, action);
    case actionTypes.DELETE_GAME: return deleteGame(state);
    default: return state;
  }
};

export default reducer;
