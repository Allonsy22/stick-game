import * as actionTypes from './actionTypes';
import socketApi from '../../utils/socketApi';
import axios from 'axios';

const socket = new socketApi();
const URI = "http://localhost:3333/gameRoom/";

export const createGame = (size) => {
    socket.connect(22, 'Create');
    socket.emit('create-game', size);
    axios.post(URI, {owner: 'Red'}).then( response => {
        console.log(response);
    });
    return dispatch => {
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

        dispatch(setFirstPlayer());
    };
};

export const joinGame = () => {
    socket.connect(22, 'Join');
    return dispatch => {
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

        dispatch(setSecondPlayer());
    };
};

export const setFirstPlayer = () => {
    return {
        type: actionTypes.SET_FIRST_PLAYER,
    };
};

export const setSecondPlayer = () => {
    return {
        type: actionTypes.SET_SECOND_PLAYER,
    };
};

export const getAvailableMoves = (data) => {
    return {
        type: actionTypes.GET_AVAILABLE_MOVES,
        availableMoves: data,
    };
};

export const makeMove = (coords) => {
    socket.emit('make-move', coords);
    return {
        type: actionTypes.MAKE_MOVE,
        coords,
    };
};

export const getOpponentMove = (coords) => {
    return {
        type: actionTypes.GET_OPPONENT_MOVE,
        coords,
    };
};

export const setNextTurn = () => {
    return {
        type: actionTypes.SET_NEXT_TURN,
    };
};

export const setPlayerOwnedSquare = (squareCoords) => {
    return {
        type: actionTypes.SET_PLAYER_OWNED_SQUARE,
        playerOwnedSquares: squareCoords,
    };
};

export const setOpponentOwnedSquare = (squareCoords) => {
    return {
        type: actionTypes.SET_OPPONENT_OWNED_SQUARE,
        opponentOwnedSquares: squareCoords,
    };
};

export const gameOver = () => {
    return {
        type: actionTypes.GAME_OVER,
    }
}