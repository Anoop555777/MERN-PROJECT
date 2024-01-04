import axios from "axios";

export async function getCabins({ page, filter }) {
  try {
    const { data } = await axios(
      `http://127.0.0.1:8000/api/v1/cabins?page=${page}&discountPercentage[gte]=${filter}`
    );

    return data.data;
  } catch (err) {
    throw new Error("Cabin could not be loaded");
  }
}

export async function getCabin(id) {
  try {
    const { data } = await axios(`http://127.0.0.1:8000/api/v1/cabins/${id}`);

    return data.data.cabin;
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
  console.log(FormData);
  try {
    const { data } = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/v1/cabins",
      data: cabinData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function editCabin(id, data) {
  const editData = Object.fromEntries(data);
  try {
    const { data } = await axios({
      method: "PATCH",
      url: `http://127.0.0.1:8000/api/v1/cabins/${id}`,
      data: editData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
