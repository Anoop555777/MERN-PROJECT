import axios from "axios";
export async function createBooking(bookingData) {
  try {
    const { data } = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/v1/bookings",
      data: bookingData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getAllBookings({ page, field }) {
  let url;
  if (field === "all") {
    url = `http://127.0.0.1:8000/api/v1/bookings?page=${page}`;
  } else {
    url = `http://127.0.0.1:8000/api/v1/bookings?status=${field}&page=${page}`;
  }
  try {
    const { data } = await axios({
      method: "GET",
      url: url,
    });
    return data.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getBooking(bookingId) {
  const url = `http://127.0.0.1:8000/api/v1/bookings/${bookingId}`;

  try {
    const { data } = await axios({
      method: "GET",
      url: url,
    });
    return data.data.booking;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateBooking(bookingId, bookingData) {
  const url = `http://127.0.0.1:8000/api/v1/bookings/${bookingId}`;

  try {
    const { data } = await axios({
      method: "PATCH",
      url: url,
      data: bookingData,
    });
    return data.data.booking;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteBooking(bookingId) {
  console.log(bookingId);
  const url = `http://127.0.0.1:8000/api/v1/bookings/${bookingId}`;

  try {
    await axios({
      method: "DELETE",
      url: url,
    });
    return null;
  } catch (err) {
    throw new Error(err);
  }
}
