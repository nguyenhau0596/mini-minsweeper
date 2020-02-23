import { GET_MINES, UPDATE_STATUS_GET_MINES } from "constants/ActionTypes";
import { FETCH_STATUS } from "constants/WebConfig";

const initialState = {
  data: [],
  status: FETCH_STATUS.LOADED
};

export default function mines(state = initialState, action) {
  switch (action.type) {
    case GET_MINES: {
      return {
        data: action.data,
        status: FETCH_STATUS.LOADED
      }
    }

    case UPDATE_STATUS_GET_MINES: {
      return {
        data: [],
        status: action.status
      }
    }

    default:
      return state;
  }
}
