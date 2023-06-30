export const setLogout = () => {
  localStorage.removeItem("user-logado");
  localStorage.removeItem("user-name");
  localStorage.removeItem("user-id");
};

export const setLogin = ({ user, name, id }) => {
  localStorage.setItem("user-logado", user);
  localStorage.setItem("user-name", name);
  localStorage.setItem("user-id", id);
};
