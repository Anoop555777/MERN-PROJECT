import axios from "axios";
export async function getSettings() {
  try {
    const { data } = await axios(`/api/v1/settings`);
    return data.data.setting[0];
  } catch (err) {
    throw new Error("Cabin could not be loaded");
  }
}

export async function updateSettings({ id, updateData }) {
  console.log(id, updateData);
  try {
    const { data } = await axios({
      method: "PATCH",
      url: `/api/v1/settings/${id}`,
      data: updateData,
    });

    return data.data;
  } catch (err) {
    throw new Error("Cabin could not be loaded");
  }
}
