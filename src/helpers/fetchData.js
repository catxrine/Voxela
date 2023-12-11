import { BASE_URL } from "../constants/constants";
import { errorSnackBar } from "../components/snackbars";

export function fetchData({ url, auth = "", method, body }) {
  let options = {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      jwt: auth,
    },
  };

  return fetch(`${BASE_URL}${url}`, options).then(async (res) => {
    const data = await res.json();
    if (res.ok) {
      return data;
    }
    errorSnackBar(data);
  });
}
