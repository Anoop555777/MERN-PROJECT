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
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
const BookingDetail = () => {
  const moveBack = useMoveBack();
  const { isLoading, booking } = useBooking();
  if (isLoading) return <Spinner />;
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
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Row>
  );
};

export default BookingDetail;
