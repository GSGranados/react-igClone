import { types } from "../actions/types";
export const initialState = null;
export const userReducer = (state, action) => {
  switch (action.type) {
    case types.USER:
      return action.payload;
    case types.LOGGED_OUT:
      return null;
    default:
      return state;
  }
};
