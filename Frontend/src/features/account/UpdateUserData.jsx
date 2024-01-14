import React from "react";
import Row from "./../../ui/Row";
import Heading from "../../ui/Heading";
import { useUser } from "../../store/UserContext";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import FileInput from "./../../ui/FileInput";
import UserImage from "./../../ui/UserImage";
import Button from "../../ui/Button";
import useUpdateUser from "./useUpdateUser";
const UpdateUserData = () => {
  const { user } = useUser();
  const { isUpdating, updateUserMutate } = useUpdateUser();

  const { register, handleSubmit, formState, resetField } = useForm({
    defaultValues: user ? { name: user.name, photo: user.photo } : {},
  });
  const { errors } = formState;
  function onSubmitHandler(data) {
    const form = new FormData();
    form.append("name", data.name);
    if (data.photo[0]) {
      form.append("photo", data.photo[0]);
    }
    updateUserMutate(form, {
      onSettled: () => resetField("photo"),
    });
  }

  function onErrorHandler(err) {
    console.log(err);
  }
  return (
    <Row>
      <Heading as="h3">Update user data</Heading>
      <UserImage src={user.photo} alt="user" />
      <Form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
        <FormRow label="User Photo" error={errors?.photo?.message}>
          <FileInput
            id="photo"
            accept="image/*"
            type="file"
            {...register("photo")}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow label="User Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            {...register("name")}
            defaultValue={user.name}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow>
          <Button>Update User</Button>
        </FormRow>
      </Form>
    </Row>
  );
};

export default UpdateUserData;
