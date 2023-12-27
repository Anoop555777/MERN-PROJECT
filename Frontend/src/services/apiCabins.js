import axios from "axios";

export async function getCabins() {
  try {
    const { data } = await axios("http://127.0.0.1:8000/api/v1/cabins");

    return data.data.cabins;
  } catch (err) {
    throw new Error("Cabin could not be loaded");
  }
}

export async function deleteCabin(id) {
  try {
    await axios({
      method: "DELETE",
      url: `http://127.0.0.1:8000/api/v1/cabins/${id}`,
    });
    return null;
  } catch (err) {
    throw new Error("Cabin could not be deleted");
  }
}

export async function createCabin(cabinData) {
  try {
    const { data } = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/v1/cabins",
      data: cabinData,
    });
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong please try again");
  }
}
