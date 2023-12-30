import Input from "./../../ui/Input";
import Form from "./../../ui/Form";
import Button from "./../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
const CreateBookingForm = ({ onCloseModal }) => {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  function onSubmitHandler(data) {}
  const { errors } = formState;
  function onErrorHandler(err) {
    console.log(err);
  }
  const isLoading = false;
  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
    >
      <FormRow label="Number of Nights" error={errors?.name?.message}>
        <Input
          type="number"
          id="numNights"
          {...register("numNights", {
            required: "required",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Number of Guests" error={errors?.name?.message}>
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "required",
          })}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Extra Price 18%(GST)" error={errors?.name?.message}>
        <Input
          type="number"
          id="extraPrice"
          {...register("extraPrice", {
            required: "required",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Total Price" error={errors?.name?.message}>
        <Input
          type="number"
          id="totalPrice"
          {...register("totalPrice", {
            required: "required",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => {
            onCloseModal?.();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Add Booking</Button>
      </FormRow>
    </Form>
  );
};

export default CreateBookingForm;
