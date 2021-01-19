export const isAuth = () => {
  const authenticated = localStorage.getItem("userInfo");
  if (authenticated) {
    return true;
  }
};
