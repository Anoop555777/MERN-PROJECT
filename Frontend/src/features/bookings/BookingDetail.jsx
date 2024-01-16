import styled from "styled-components";
import useBooking from "./useBooking";
import ButtonText from "./../../ui/ButtonText";
import Row from "./../../ui/Row";
import Spinner from "./../../ui/Spinner";
import Heading from "./../../ui/Heading";
import Tag from "./../../ui/Tag";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "./../../ui/ButtonGroup";
import Button from "./../../ui/Button";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
const BookingDetail = () => {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckOut();
  const { isLoading, booking } = useBooking();
  const { isDeleting, deleteBookingMutate } = useDeleteBooking();
  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;
  const { status, _id: bookingId } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <Row>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            <span>Check In</span>
          </Button>
        )}

        {status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={() => checkout(bookingId)}>
            <span>Check Out</span>
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Open>
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
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Row>
  );
};

export default BookingDetail;
