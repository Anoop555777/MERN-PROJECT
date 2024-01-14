import React from "react";
import Row from "./../../ui/Row";
import Heading from "../../ui/Heading";
import { useUser } from "../../store/UserContext";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
const UpdateUserData = () => {
  const { user } = useUser();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: user ? { name: user.name, photo: user.photo } : {},
  });
  const { errors } = formState;
  function onSubmitHandler(data) {}

  function onErrorHandler(err) {
    console.log(err);
  }
  return (
    <Row>
      <Heading as="h3">Update user data</Heading>
      <Form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
        <FormRow label="Cabin Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
            defaultValue={user.name}
          />
        </FormRow>
      </Form>
    </Row>
  );
};

export default UpdateUserData;
