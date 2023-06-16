export const setLogout = () => {
  sessionStorage.removeItem("user-logado");
  sessionStorage.removeItem("user-name");
};

export const setLogin = ({ user, name }) => {
  sessionStorage.setItem("user-logado", user);
  sessionStorage.setItem("user-name", name);
};
