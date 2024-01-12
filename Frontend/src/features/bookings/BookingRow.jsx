import React from "react";
import Table from "../../ui/Table";
import styled from "styled-components";
import { format, isToday } from "date-fns";
import { formatDistanceFromNow } from "./../../utiles/helper";
import { formatCurrency } from "./../../utiles/helper";
import Tag from "./../../ui/Tag";
import Menus from "../../ui/Menus";
import { HiEllipsisVertical, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/useCheckout";
import Modal from "./../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;
const BookingRow = ({ booking }) => {
  const navigate = useNavigate();
  const { checkout } = useCheckOut();
  const { deleteBookingMutate, isDeleting } = useDeleteBooking();

  const {
    _id: bookingId,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    cabin: { name: cabinName },
    user: { name: guestName, email },
  } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId}>
            <HiEllipsisVertical />
          </Menus.Toggle>
          <Menus.List id={bookingId}>
            <Menus.Button onClick={() => navigate(`/bookings/${bookingId}`)}>
              <HiEye />
              <span>see details</span>
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                <HiEye />
                <span>check in</span>
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button onClick={() => checkout(bookingId)}>
                <HiEye />
                <span>check out</span>
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button>
                <span>
                  <HiTrash />
                </span>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resource="booking"
            disabled={isDeleting}
            onConfirm={() => {
              deleteBookingMutate(bookingId, {
                onSettled: () => navigate(-1),
              });
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default BookingRow;
