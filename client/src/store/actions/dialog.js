import * as actionTypes from './actionTypes';

export const showCreateGameDialog = () => {
  return {
    type: actionTypes.SHOW_CREATE_GAME_DIALOG,
  };
};

export const closeCreateGameDialog = () => {
  return {
    type: actionTypes.CLOSE_CREATE_GAME_DIALOG,
  };
};

export const showJoinGameDialog = () => {
  return {
    type: actionTypes.SHOW_JOIN_GAME_DIALOG,
  };
};

export const closeJoinGameDialog = () => {
  return {
    type: actionTypes.CLOSE_JOIN_GAME_DIALOG,
  };
};