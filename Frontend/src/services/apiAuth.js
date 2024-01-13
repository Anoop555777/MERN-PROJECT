import axios from "axios";

export async function signup(signInData) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `http://127.0.0.1:8000/api/v1/users/signup`,
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
      url: `http://127.0.0.1:8000/api/v1/users/login`,
      data: loginData,
    });

    return data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function logout() {
  try {
    await axios(`http://127.0.0.1:8000/api/v1/users/logout`);
    return null;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
