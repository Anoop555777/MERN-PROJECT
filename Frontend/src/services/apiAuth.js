import axios from "axios";

export async function signup(signInData) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `/api/v1/users/signup`,
      data: signInData,
    });

    return data.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function login(loginData) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `/api/v1/users/login`,
      data: loginData,
    });

    return data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function logout() {
  try {
    await axios(`/api/v1/users/logout`);
    return null;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
