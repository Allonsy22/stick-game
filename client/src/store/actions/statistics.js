import * as actionTypes from './actionTypes';
import axios from 'axios';
import API_URL from '../../utils/api_url';

export const updatePlayerStatistics = (winner, currentPlayer) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user.email;
  const type = currentPlayer === winner ? 'win' : 'lose/draw';
  axios.post(API_URL + 'auth/update', {email, type})
    .then( response => {
      console.log(response.data);
    })
    .catch(error => console.log(error));
  return {
    type: actionTypes.UPDATE_PLAYER_STATISTICS,
  };
};

export const getPlayerStatistics = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user.email;
  axios.post(API_URL + 'auth/statistics', {email})
    .then(response => {
      dispatch({
        type: actionTypes.GET_PLAYER_STATISTICS,
        statistics: response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
};

