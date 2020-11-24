import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';

const initialState = {
  statistics: null,
};

const setPlayerStatistics = (state, action) => {
  return updateObject(state, {
    statistics: action.statistics,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PLAYER_STATISTICS: return setPlayerStatistics(state, action);
    default: return state;
  }
};

export default reducer;