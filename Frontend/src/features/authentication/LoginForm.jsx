import React from "react";
import { HiEnvelope, HiLockClosed } from "react-icons/hi2";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useLogin from "./useLogin";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
const Form = styled.form`
  width: 100%;
`;
const FormGroup = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid var(--color-grey-400);
  margin: 4.8rem 0;
  position: relative;
`;

const FormInput = styled.input`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.2rem 0.8rem;

  background: transparent;
  border: none;
  font-size: inherit;
  outline: none;

  &:focus {
    outline: none;
  }
  &:not(:placeholder-shown) ~ label {
    top: -4px;
  }
  &:placeholder-shown ~ label {
    top: 50%;
  }
  &:focus ~ label {
    top: -4px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1.6rem;
  font-weight: 600;
  pointer-events: none;
  transition: all 0.5s;
`;

const Span = styled.span`
  position: absolute;
  right: 8px;
  font-size: 2.4rem;
  color: var(--color-grey-300);
  top: 50%;
  transform: translateY(-50%);
`;

const Button = styled.button`
  display: inline-block;
  padding: 1rem;
  background-color: #162938;
  outline: none;
  border: none;
  color: var(--color-grey-50);
  width: 100%;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.4);
  font-size: 1.6rem;
  transition: all 0.5s;
  border-radius: 11px;
  font-weight: 600;

  &:hover {
    background-color: var(--color-grey-400);
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    color: var(--color-red-700);
  }
`;

const SignIn = styled.div`
  & p {
    margin-top: 1rem;
    font-size: 1.6rem;
    color: var(--color-grey-900);
    font-weight: 600;
  }
`;

const LoginForm = () => {
  const { register, formState, handleSubmit, reset } = useForm();
  const { loginUser, isLoginLoading } = useLogin();
  const { errors } = formState;
  if (isLoginLoading) return <Spinner />;
  const onSubmitHandler = (data) => {
    const { email, password } = data;
    loginUser(
      { email, password },
      {
        onSettled: () => reset(),
      }
    );
  };
  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormGroup>
        <Span>
          <HiEnvelope />
        </Span>
        <FormInput
          type="email"
          id="email"
          placeholder=""
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
        <Label htmlFor="email">Email</Label>
        {errors?.email?.message && <Error>{errors?.email?.message}</Error>}
      </FormGroup>
      <FormGroup>
        <Span>
          <HiLockClosed />
        </Span>
        <FormInput
          type="password"
          id="password"
          placeholder=""
          {...register("password", {
            required: "This field is required",
          })}
        />
        <Label htmlFor="password">Password</Label>
        {errors?.password?.message && (
          <Error>{errors?.password?.message}</Error>
        )}
      </FormGroup>
      <Button type="submit">Login</Button>
      <SignIn>
        <p>
          Don't have an account? &nbsp;
          <StyledNavLink to="/signup">Register</StyledNavLink>
        </p>
      </SignIn>
    </Form>
  );
};

export default LoginForm;
