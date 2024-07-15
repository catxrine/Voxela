export const getCurrentUserId = () => {
  try {
    const token = window.localStorage.getItem("jwt");
    return JSON.parse(atob(token.split(".")[1]))?.id;
  } catch (e) {
    return null;
  }
};

export const accents = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-pink-500",
  "bg-rose-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-orange-500",
];
