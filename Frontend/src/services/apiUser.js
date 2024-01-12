import axios from "axios";

export async function isLoggedIn() {
  try {
    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/v1/users/isLoggedIn"
    );
    return data.user;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}
