import * as actionTypes from './actionTypes';
import socketApi from '../../utils/socketApi';

const socket = new socketApi();

export const createGame = () => {
    socket.connect();
    socket.emit('test', 'hello');
    return {
        type: actionTypes.CREATE_GAME,
    };
};

export const joinGame = () => {
    socket.connect();
    socket.emit('test', 'hello');
    return {
        type: actionTypes.JOIN_GAME,
    };
}
