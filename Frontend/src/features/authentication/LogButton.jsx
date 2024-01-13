import React, { useState } from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";
import useLogout from "./../authentication/useLogout";
import {
  HiArrowRightOnRectangle,
  HiArrowLeftOnRectangle,
} from "react-icons/hi2";
const LogButton = () => {
  const navigate = useNavigate();
  const { logoutUser, isLogoutLoading } = useLogout();
  return (
    <>
      <ButtonIcon onClick={logoutUser} disabled={isLogoutLoading}>
        <HiArrowRightOnRectangle />
      </ButtonIcon>

      <ButtonIcon onClick={() => navigate("login")}>
        <HiArrowLeftOnRectangle />
      </ButtonIcon>
    </>
  );
};

export default LogButton;
