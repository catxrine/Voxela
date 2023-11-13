export const logIn = (loginCredentials) => {
  fetch("http://localhost:3030/auth/login", {
    method: "POST",
    body: JSON.stringify(loginCredentials),
    headers: {
      "Content-Type": "application/json",
      jwt: localStorage.getItem("jwt"),
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      errorSnackBar(await res.json());
    })
    .then((data) => {
      localStorage.setItem("jwt", data.jwt);
      sessionStorage.setItem("username", data.username);
      window.location.pathname = "/home";
    });
};

export const registerUser = (loginCredentials) => {
  fetch("http://localhost:3030/auth/register", {
    method: "POST",
    body: JSON.stringify(loginCredentials),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      errorSnackBar(await res.json());
    })
    .then((data) => {
      localStorage.setItem("jwt", data.jwt);
      sessionStorage.setItem("username", data.username);
      successSnackBar(SUCCESS_REGISTER);
    });
};
