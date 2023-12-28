import Input from "./../../ui/Input";
import Textarea from "./../../ui/Textarea";
import Form from "./../../ui/Form";
import Button from "./../../ui/Button";
import FileInput from "./../../ui/FileInput";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmitHandler(data) {
    const form = new FormData();
    form.append("name", data.name);
    form.append("price", data.price);
    form.append("priceDiscount", data.priceDiscount);
    form.append("description", data.description);
    form.append("imageCover", data.imageCover[0]);
    form.append("images", data.image1[0]);
    form.append("images", data.image2[0]);
    form.append("images", data.image3[0]);
    form.append("maxCapacity", data.maxCapacity);
    mutate(form);
  }

  function onErrorHandler(err) {
    console.log(err);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
          })}
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
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "Price is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="priceDiscount"
          defaultValue={0}
          {...register("priceDiscount", {
            required: "Discount is required",
            validate: (value) =>
              value <= getValues().price || "Discount should be less than 50%",
          })}
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
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.imageCover?.message}>
        <FileInput
          id="imageCover"
          accept="image/*"
          type="file"
          {...register("imageCover", {
            required: "cabin must have image cover",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Images">
        <FileInput
          id="image1"
          accept="image/*"
          type="file"
          multiple
          {...register("image1")}
        />
      </FormRow>

      <FormRow label="Cabin Images">
        <FileInput
          id="image2"
          accept="image/*"
          type="file"
          {...register("image2")}
        />
      </FormRow>
      <FormRow label="Cabin Images">
        <FileInput
          id="image3"
          accept="image/*"
          type="file"
          {...register("image3")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
