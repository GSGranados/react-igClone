import { types } from "./types";

export const userLoggedIn = (user) => {
  return {
    type: types.USER,
    payload: user,
  };
};

export const userLoggedOut = () => {
  return {
    type: types.LOGGED_OUT,
  };
};
