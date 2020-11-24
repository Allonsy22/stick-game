import axios from 'axios';
import * as actionTypes from './actionTypes';
import API_URL from '../../utils/api_url';
import socketApi from '../../utils/socketApi';

const socket = new socketApi();

export const createGame = (size, roomCode) => {
  socket.connect(roomCode, 'create');
  socket.emit('create-game', size);
  return (dispatch) => {
    socket.on('game-is-ready', () => {
      dispatch({
        type: actionTypes.SET_GAME_STATUS,
        isGameReady: true,
      });
      dispatch({
        type: actionTypes.SET_OPPONNENT_CONNECTION,
        isOpponnentConnected: true,
      });
    });

    socket.on('get-available-moves', (data) => {
      dispatch(getAvailableMoves(data));
    });

    socket.on('opponent-move', (coords) => {
      dispatch(getOpponentMove(coords));
    });

    socket.on('nextTurn', () => {
      dispatch(setNextTurn());
    });

    socket.on('get-player-owned-square', (squareCoords) => {
      dispatch(setPlayerOwnedSquare(squareCoords));
    });

    socket.on('get-opponent-owned-square', (squareCoords) => {
      dispatch(setOpponentOwnedSquare(squareCoords));
    });

    socket.on('game-over', () => {
      dispatch(gameOver());
    });

    socket.on('opponent-disconected', () => {
      dispatch({
        type: actionTypes.SET_OPPONNENT_CONNECTION,
        isOpponnentConnected: false,
      });
    });

    dispatch(setFirstPlayer());
  };
};

export const joinGame = (roomCode) => {
  socket.connect(roomCode, 'join');
  socket.emit('join-game');
  return (dispatch) => {
    socket.on('game-is-ready', () => {
      dispatch({
        type: actionTypes.SET_GAME_STATUS,
        isGameReady: true,
      });
      dispatch({
        type: actionTypes.SET_OPPONNENT_CONNECTION,
        isOpponnentConnected: true,
      });
    });

    socket.on('get-game-size', (size) => {
      dispatch(setGameSize(size));
    });

    socket.on('get-available-moves', (data) => {
      dispatch(getAvailableMoves(data));
    });

    socket.on('opponent-move', (coords) => {
      dispatch(getOpponentMove(coords));
    });

    socket.on('nextTurn', () => {
      dispatch(setNextTurn());
    });

    socket.on('get-player-owned-square', (squareCoords) => {
      dispatch(setPlayerOwnedSquare(squareCoords));
    });

    socket.on('get-opponent-owned-square', (squareCoords) => {
      dispatch(setOpponentOwnedSquare(squareCoords));
    });

    socket.on('game-over', () => {
      dispatch(gameOver());
    });

    socket.on('opponent-disconected', () => {
      dispatch({
        type: actionTypes.SET_OPPONNENT_CONNECTION,
        isOpponnentConnected: false,
      });
    });

    dispatch(setSecondPlayer());
  };
};

export const getRoomCode = () => (dispatch) => {
  axios.get(`${API_URL}gameRoom`)
    .then((response) => {
      dispatch(setRoomCode(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setRoomCode = (code) => ({
  type: actionTypes.SET_ROOM_CODE,
  roomCode: code,
});

export const setGameSize = (size) => ({
  type: actionTypes.SET_GAME_SIZE,
  size,
});

export const setFirstPlayer = () => ({
  type: actionTypes.SET_FIRST_PLAYER,
});

export const setSecondPlayer = () => ({
  type: actionTypes.SET_SECOND_PLAYER,
});

export const getAvailableMoves = (data) => ({
  type: actionTypes.GET_AVAILABLE_MOVES,
  availableMoves: data,
});

export const makeMove = (coords) => {
  socket.emit('make-move', coords);
  return {
    type: actionTypes.MAKE_MOVE,
    coords,
  };
};

export const getOpponentMove = (coords) => ({
  type: actionTypes.GET_OPPONENT_MOVE,
  coords,
});

export const setNextTurn = () => ({
  type: actionTypes.SET_NEXT_TURN,
});

export const setPlayerOwnedSquare = (squareCoords) => ({
  type: actionTypes.SET_PLAYER_OWNED_SQUARE,
  playerOwnedSquares: squareCoords,
});

export const setOpponentOwnedSquare = (squareCoords) => ({
  type: actionTypes.SET_OPPONENT_OWNED_SQUARE,
  opponentOwnedSquares: squareCoords,
});

export const gameOver = () => ({
  type: actionTypes.GAME_OVER,
});

export const deleteGame = () => ({
  type: actionTypes.DELETE_GAME,
});
