import { CHANGE_LEVEL } from "constants/ActionTypes";
import { LEVEL } from "constants/WebConfig";

const initialState = {
  level: LEVEL.BEGINNER
};

export default function configuration(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LEVEL: {
      return {
        ...state,
        level: action.level
      }
    }
    default:
      return state;
  }
}
