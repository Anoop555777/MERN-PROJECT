import Input from "./../../ui/Input";
import Form from "./../../ui/Form";
import Button from "./../../ui/Button";
import FormRow from "../../ui/FormRow";
import { Controller, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { subtractDates } from "../../utiles/helper";
import { useState } from "react";
import useCreateBooking from "./useCreateBooking";
const CreateBookingForm = ({ onCloseModal, cabin }) => {
  const { isCreating, createBookingMutate } = useCreateBooking();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { control, register, handleSubmit, reset, getValues, formState } =
    useForm({
      defaultValues: {
        startDate: new Date(),
        endDate: new Date(),
        extraPrice: (cabin.price * 18) / 100,
        totalPrice: cabin.price + (cabin.price * 18) / 100,
        numNights: 0,
      },
    });
  const { errors } = formState;

  function onSubmitHandler(data) {
    if (subtractDates(startDate, endDate) <= 0) {
      errors.startDate = "StartDate must be less than EndDate";
      return;
    }
    createBookingMutate(
      {
        ...data,
        numNights: subtractDates(startDate, endDate),
        cabin: cabin.id,
        user: "655504f1adc2463138728082",
        cabinPrice: cabin.price,
      },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  function onErrorHandler(err) {
    console.log(err);
  }
  const isLoading = false;
  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
    >
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Controller
          id="startDate"
          control={control}
          name="startDate"
          rules={{
            validate: () =>
              subtractDates(startDate, endDate) > 0
                ? subtractDates(new Date(), startDate) >= 0 ||
                  "startDate must be greater than present date"
                : "StartDate must be less than EndDate",
          }}
          render={({ field }) => (
            <DatePicker
              id="startDate"
              onChange={(date) => {
                field.onChange(date);
                setStartDate(date);
              }}
              selected={field.value || new Date()}
            />
          )}
        />
      </FormRow>
      <FormRow label="End Date" error={errors?.name?.message}>
        <Controller
          control={control}
          name="endDate"
          id="endDate"
          render={({ field }) => (
            <DatePicker
              id="endDate"
              onChange={(date) => {
                field.onChange(date);
                setEndDate(date);
              }}
              selected={field.value || new Date()}
            />
          )}
        />
      </FormRow>

      <FormRow label="Number of Nights" error={errors?.name?.message}>
        <Input
          type="number"
          id="numNights"
          value={Math.abs(subtractDates(startDate, endDate))}
          {...register("numNights")}
          disabled={true}
        />
      </FormRow>

      <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "NumGuests is required",
          })}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Extra Price 18%(GST)" error={errors?.name?.message}>
        <Input
          type="number"
          id="extraPrice"
          {...register("extraPrice")}
          disabled={true}
        />
      </FormRow>

      <FormRow label="Total Price" error={errors?.name?.message}>
        <Input
          type="number"
          id="totalPrice"
          value={cabin.price + getValues().extraPrice}
          {...register("totalPrice")}
          disabled={true}
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
