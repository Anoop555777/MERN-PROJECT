import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineUser,
} from "react-icons/hi2";
import { useUser } from "../store/UserContext";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const List = styled.li`
  flex-shrink: 0;
  position: relative;
  border-radius: var(--border-radius-sm);
  color: var(--color-grey-600);

  &::before {
    content: "";
    display: inline-block;
    width: 0.01px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: var(--border-radius-sm);
    background-color: var(--color-brand-600);
    transform: scaleY(0);
    transition: transform 0.2s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s,
      background-color 0.1s, -webkit-transform 0.2s;
  }

  &:hover {
    color: var(--color-grey-50);
  }

  &:hover::before {
    width: 100%;
    transform: scaleY(1);
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: currentColor;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    position: relative;
    z-index: 10;
    transition: all 0.3s;
  }

  & span {
    color: currentColor;
  }

  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-50);
    background-color: var(--color-brand-600);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: currentColor;
    transition: all 0.3s;
  }

  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-grey-50);
  }
`;

const MainNav = () => {
  const { isAuthenticated } = useUser();
  return (
    <nav>
      <NavList>
        <List>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </List>

        <List>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </List>

        <List>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </List>
        <List>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </List>
        {isAuthenticated && (
          <List>
            <StyledNavLink to="/account">
              <HiOutlineUser />
              <span>Account</span>
            </StyledNavLink>
          </List>
        )}
        <List>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </List>
      </NavList>
    </nav>
  );
};

export default MainNav;
