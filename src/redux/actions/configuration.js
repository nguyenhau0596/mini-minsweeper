import { CHANGE_LEVEL } from "constants/ActionTypes";

export function changeLevel(level) {
  return {
    type: CHANGE_LEVEL,
    level
  }
}