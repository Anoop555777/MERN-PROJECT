import axios from "axios";

export async function isLoggedIn() {
  try {
    const { data } = await axios.get("/api/v1/users/isLoggedIn");
    return data.user;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}

export async function updatePassword(password) {
  console.log(password);
  try {
    const { data } = await axios({
      method: "PATCH",
      url: "/api/v1/users/updatePassword",
      data: password,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
