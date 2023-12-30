import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
const AddBooking = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Booking</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddBooking;
