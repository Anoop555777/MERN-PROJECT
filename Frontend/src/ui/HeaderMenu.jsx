import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import LogButton from "../features/authentication/LogButton";
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <LogButton />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
