import React, { useState } from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";
import {
  HiArrowRightOnRectangle,
  HiArrowLeftOnRectangle,
} from "react-icons/hi2";
const LogButton = () => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {login ? (
        <ButtonIcon>
          <HiArrowRightOnRectangle />
        </ButtonIcon>
      ) : (
        <ButtonIcon onClick={() => navigate("login")}>
          <HiArrowLeftOnRectangle />
        </ButtonIcon>
      )}
    </>
  );
};

export default LogButton;
