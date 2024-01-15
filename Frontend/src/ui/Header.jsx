import React from "react";
import { styled } from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";

import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 1.2rem 3.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  gap: 1.2rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
