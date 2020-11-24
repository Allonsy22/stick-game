import * as actionTypes from './actionTypes';

export const showCreateGameDialog = () => ({
  type: actionTypes.SHOW_CREATE_GAME_DIALOG,
});

export const closeCreateGameDialog = () => ({
  type: actionTypes.CLOSE_CREATE_GAME_DIALOG,
});

export const showJoinGameDialog = () => ({
  type: actionTypes.SHOW_JOIN_GAME_DIALOG,
});

export const closeJoinGameDialog = () => ({
  type: actionTypes.CLOSE_JOIN_GAME_DIALOG,
});
