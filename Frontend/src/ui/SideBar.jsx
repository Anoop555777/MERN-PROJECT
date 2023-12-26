import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1rem;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--color-brand-600);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-brand-700);
  }
`;
const SideBar = () => {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
    </StyledSideBar>
  );
};

export default SideBar;
