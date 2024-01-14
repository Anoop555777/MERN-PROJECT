import Row from "./../../ui/Row";
import Heading from "../../ui/Heading";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import useUpdatePassword from "./useUpdatePassword";
const UpdateUserPassword = () => {
  const { register, handleSubmit, reset, getValues, formState } = useForm({});
  const { isUpdating, updatePasswordMutate } = useUpdatePassword();

  const { errors } = formState;
  function onSubmitHandler(data) {
    updatePasswordMutate(data, {
      onSettled: () => reset(),
    });
  }

  function onErrorHandler(err) {
    console.log(err);
  }
  return (
    <Row>
      <Heading as="h3">Update password</Heading>
      <Form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
        <FormRow
          label="Current Password"
          error={errors?.passwordCurrent?.message}
        >
          <Input
            type="password"
            id="passwordCurrent"
            {...register("passwordCurrent", {
              required: "password is required",
            })}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow label="New Password" error={errors?.password?.message}>
          <Input
            type="password"
            id="password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "password must be more than 8 character",
              },
            })}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow
          label="Confirm  Password"
          error={errors?.confirmPassword?.message}
        >
          <Input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "confirmPassword is required",
              validate: (value) =>
                value === getValues().password ||
                "Confirm password must be same as password",
            })}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow>
          <Button disabled={isUpdating}>Update Password</Button>
        </FormRow>
      </Form>
    </Row>
  );
};

export default UpdateUserPassword;
