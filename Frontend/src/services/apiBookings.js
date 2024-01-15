import axios from "axios";

import { getToday } from "../utiles/helper";
export async function createBooking(bookingData) {
  try {
    const { data } = await axios({
      method: "POST",
      url: "/api/v1/bookings",
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
    url = `/api/v1/bookings?page=${page}`;
  } else {
    url = `/api/v1/bookings?status=${field}&page=${page}`;
  }
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

export async function getBooking(bookingId) {
  const url = `/api/v1/bookings/${bookingId}`;

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
  const url = `/api/v1/bookings/${bookingId}`;

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
  const url = `/api/v1/bookings/${bookingId}`;

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

export async function getBookingsAfterDate(date) {
  console.log(date);
  try {
    const { data } = await axios.get(
      `/api/v1/bookings?createdAt[gte]=${date}&createdAt[lte]=${getToday({
        end: true,
      })}`
    );
    return data.data.bookings;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getStaysAfterDate(date) {
  console.log(date);
  try {
    const { data } = await axios.get(
      `/api/v1/bookings?startDate[gte]=${date}&startDate[lte]=${getToday({
        end: true,
      })}`
    );
    return data.data.bookings;
  } catch (err) {
    throw new Error(err.message);
  }
}
