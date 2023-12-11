export const getCurrentUserId = () => {
  try {
    const token = window.localStorage.getItem("jwt");
    return JSON.parse(atob(token.split(".")[1]))?.id;
  } catch (e) {
    return null;
  }
};
