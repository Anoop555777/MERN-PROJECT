import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
const AddBooking = ({ cabin }) => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button>Add New Booking</Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm cabin={cabin} />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddBooking;
