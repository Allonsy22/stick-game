import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';

const initialState = {
  isCreateGameDialog: false,
  isJoinGameDialog: false,
};

const showCreateGameDialog = (state) => updateObject(state, {
  isCreateGameDialog: true,
});

const closeCreateGameDialog = (state) => updateObject(state, {
  isCreateGameDialog: false,
});

const showJoinGameDialog = (state) => updateObject(state, {
  isJoinGameDialog: true,
});

const closeJoinGameDialog = (state) => updateObject(state, {
  isJoinGameDialog: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_CREATE_GAME_DIALOG: return showCreateGameDialog(state);
    case actionTypes.CLOSE_CREATE_GAME_DIALOG: return closeCreateGameDialog(state);
    case actionTypes.SHOW_JOIN_GAME_DIALOG: return showJoinGameDialog(state);
    case actionTypes.CLOSE_JOIN_GAME_DIALOG: return closeJoinGameDialog(state);
    default: return state;
  }
};

export default reducer;
