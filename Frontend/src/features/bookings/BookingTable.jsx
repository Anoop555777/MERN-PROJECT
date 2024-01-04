import React from "react";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import useBooking from "./useBookings";
import Spinner from "./../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";
const BookingTable = () => {
  const { isLoading, bookingsData } = useBooking();
  const [searchParam] = useSearchParams();
  const filter = searchParam.get("status");

  if (isLoading) return <Spinner />;
  const { bookings, noOfFilterBookings, totalBookings } = bookingsData;
  let filterBookings = bookings;

  //2) sortBy
  const sortBy = searchParam.get("sortBy") || "startDate-desc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedBookings;
  if (field === "startDate")
    sortedBookings = filterBookings.sort(
      (a, b) => a.startDate.localeCompare(b.startDate) * modifier
    );
  else
    sortedBookings = filterBookings.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  return (
    <Menus>
      <Table columns="1.5fr 2fr 2.4fr 1.4fr 1fr 3.2rem ">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedBookings}
          render={(booking) => (
            <BookingRow booking={booking} key={booking._id} />
          )}
        />

        <Table.Footer>
          <Pagination
            count={
              filter && filter !== "all"
                ? sortedBookings.length === 0
                  ? 0
                  : noOfFilterBookings
                : totalBookings
            }
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;
