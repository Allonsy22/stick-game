import * as actionTypes from './actionTypes';
import socketApi from '../../utils/socketApi';

const socket = new socketApi();

export const createGame = (size) => {
    socket.connect();
    socket.emit('create-game', size);
    return dispatch => {
        socket.on('get-available-moves', (data) => {
            dispatch(getAvailableMoves(data));
        });
        dispatch(setFirstPlayer());
    };
};

export const joinGame = () => {
    socket.connect();
    return dispatch => {
        socket.on('get-available-moves', (data) => {
            dispatch(getAvailableMoves(data));
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
