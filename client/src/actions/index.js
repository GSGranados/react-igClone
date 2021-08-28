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

export const userFollowing = (followers, following) => {
  return {
    type: types.FOLLOW,
    payload: { following: following, followers: followers },
  };
};

export const updateProfilePhoto = (url) => {
  return {
    type: types.UPDATE_PHOTO,
    payload: url,
  };
};
