import axios from 'axios';
import { GET_MINE_URL } from 'constants/ApiUrls';
import { UPDATE_STATUS_GET_MINES, GET_MINES } from 'constants/ActionTypes';
import { FETCH_STATUS } from 'constants/WebConfig';

export function getMines(size, mines) {
  return dispatch => {
    dispatch({
      type: UPDATE_STATUS_GET_MINES,
      status: FETCH_STATUS.LOADING
    });

    const url = GET_MINE_URL.replace('{size}', size).replace('{mines}', mines);
    axios({
      method: 'get',
      url
    })
    .then(response => {
      return dispatch({
        type: GET_MINES,
        data: response.data ? response.data.data : null
      });
    })
    .catch(() => {
      dispatch({
        type: UPDATE_STATUS_GET_MINES,
        status: FETCH_STATUS.FAILED
      });
    });
  }
}