import { types } from "../actions/types";
export const initialState = null;
export const userReducer = (state, action) => {
  switch (action.type) {
    case types.USER:
      return action.payload;
    case types.LOGGED_OUT:
      return null;
    case types.FOLLOW:
      return {
        ...state,
        following: action.payload.following,
        followers: action.payload.followers,
      };
    case types.UPDATE_PHOTO:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};
