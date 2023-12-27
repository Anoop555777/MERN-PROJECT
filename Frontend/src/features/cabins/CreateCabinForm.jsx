import styled from "styled-components";
import Input from "./../../ui/Input";
import Textarea from "./../../ui/Textarea";
import Form from "./../../ui/Form";
import Button from "./../../ui/Button";
import FileInput from "./../../ui/FileInput";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.4rem;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
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

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="price">Regular price</Label>
        <Input type="number" id="price" {...register("price")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="priceDiscount">Discount</Label>
        <Input
          type="number"
          id="priceDiscount"
          defaultValue={0}
          {...register("priceDiscount")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="imageCover">Cabin photo</Label>
        <FileInput
          id="imageCover"
          accept="image/*"
          type="file"
          {...register("imageCover")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image1">Cabin Images</Label>
        <FileInput
          id="image1"
          accept="image/*"
          type="file"
          multiple
          {...register("image1")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image2">Cabin Images</Label>
        <FileInput
          id="image2"
          accept="image/*"
          type="file"
          {...register("image2")}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="image3">Cabin Images</Label>
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
