import Input from "./../../ui/Input";
import Textarea from "./../../ui/Textarea";
import Form from "./../../ui/Form";
import Button from "./../../ui/Button";
import FileInput from "./../../ui/FileInput";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditingSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingSession ? editValues : {},
  });

  const { errors } = formState;
  const { isCreating, createCabinMutate } = useCreateCabin();
  const { isEditing, editCabinMutate } = useEditCabin();
  const isLoading = isEditing || isCreating;

  function onSubmitHandler(data) {
    const form = new FormData();
    if (isEditingSession) {
      if (data.name !== editValues.name) form.append("name", data.name);
    } else {
      form.append("name", data.name);
    }
    form.append("price", data.price);
    form.append("priceDiscount", data.priceDiscount);
    form.append("description", data.description);
    form.append("maxCapacity", data.maxCapacity);
    if (!isEditingSession) {
      form.append("imageCover", data.imageCover[0]);
      form.append("images", data.image1[0]);
      form.append("images", data.image2[0]);
      form.append("images", data.image3[0]);
    }
    if (isEditingSession)
      editCabinMutate(
        { newCabinData: form, id: editId },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    else
      createCabinMutate(form, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  }

  function onErrorHandler(err) {
    console.log(err);
  }
  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Capacity is required",
            min: {
              value: 1,
              message: "capacity must be more than one",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "Price is required",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.priceDiscount?.message}>
        <Input
          type="number"
          id="priceDiscount"
          defaultValue={0}
          {...register("priceDiscount", {
            required: "Discount is required",
            validate: (value) =>
              value <= getValues().price * 0.5 ||
              "Discount should be less than 50%",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
          disabled={isLoading}
        />
      </FormRow>

      {!isEditingSession && (
        <>
          {" "}
          <FormRow label="Cabin Photo" error={errors?.imageCover?.message}>
            <FileInput
              id="imageCover"
              accept="image/*"
              type="file"
              {...register("imageCover", {
                required: "cabin must have image cover",
              })}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label="Cabin Images">
            <FileInput
              id="image1"
              accept="image/*"
              type="file"
              multiple
              {...register("image1")}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label="Cabin Images">
            <FileInput
              id="image2"
              accept="image/*"
              type="file"
              {...register("image2")}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label="Cabin Images">
            <FileInput
              id="image3"
              accept="image/*"
              type="file"
              {...register("image3")}
              disabled={isLoading}
            />
          </FormRow>
        </>
      )}

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditingSession ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
