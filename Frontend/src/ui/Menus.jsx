import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useOutsideClickHook from "../hooks/useOutsideClickHook";
const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2rem;
  &:hover {
    background-color: var(--color-grey-100);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  top: 3.8rem;
  z-index: 20;
  width: max-content;
`;

const StyledButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  gap: 1.6rem;
  align-items: center;
  &:hover {
    background-color: var(--color-grey-50);
  }
  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

const Menus = ({ children }) => {
  const [isOpen, setIsOpen] = useState("");

  function close() {
    setIsOpen("");
  }
  const open = setIsOpen;
  return (
    <MenuContext.Provider value={{ isOpen, open, close }}>
      {children}
    </MenuContext.Provider>
  );
};

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id, children }) {
  const { isOpen, open, close } = useContext(MenuContext);
  function handlerToggle() {
    isOpen === "" || isOpen !== id ? open(id) : close();
  }
  return <StyledToggle onClick={handlerToggle}>{children}</StyledToggle>;
}

function List({ children, id }) {
  const { isOpen } = useContext(MenuContext);

  if (isOpen !== id) return null;
  return <StyledList>{children}</StyledList>;
}

function Button({ children, onClick }) {
  const { close } = useContext(MenuContext);
  function handlerClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handlerClick}>{children}</StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Button = Button;
Menus.List = List;
Menus.Toggle = Toggle;

export default Menus;
