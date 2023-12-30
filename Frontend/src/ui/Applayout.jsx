import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import styled from "styled-components";

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.6rem 6.4rem;
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

const Applayout = () => {
  return (
    <StyledLayout>
      <Header />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledLayout>
  );
};

export default Applayout;
