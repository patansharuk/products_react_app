import { HOME_PATH, LOGIN_PATH, NOT_FOUND_PATH } from "./urlUtils";

export const replace = (path) => {
  window.location.replace(path);
};

export const redirect_to_back = () => {
  window.history.back();
};

export const redirect_to_home = () => {
  replace(HOME_PATH);
};

export const redirect_to_login = () => {
  replace(LOGIN_PATH);
};

export const redirect_to_notfound = () => {
  replace(NOT_FOUND_PATH);
};

export const redirect_to_prev = () => {
  if (
    window.location.href.includes("signup") ||
    window.location.href.includes("login")
  ) {
    redirect_to_home();
  } else {
    redirect_to_back();
  }
};
