import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import LogButton from "../features/authentication/LogButton";
import { useUser } from "../store/UserContext";
import DarkModeToggle from "./DarkModeToggle";
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  return (
    <StyledHeaderMenu>
      <li>
        {isAuthenticated && (
          <ButtonIcon onClick={() => navigate("account")}>
            <HiOutlineUser />
          </ButtonIcon>
        )}
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <LogButton />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
