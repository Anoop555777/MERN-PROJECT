import styled, { css } from "styled-components";
import Menus from "./Menus";
import { HiChevronDown } from "react-icons/hi2";

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
const filterOptions = ["priceDiscount", "price", "rating"];
const Filter = () => {
  return (
    <Menus>
      <Menus.Menu>
        <Menus.Toggle id="filter">Filter</Menus.Toggle>
        <Menus.List id="filter">
          <Menus.Button onClick={() => handlerFilter()}>
            <span>
              <HiChevronDown />
            </span>
            Discount
          </Menus.Button>
          <Menus.Button>
            <span>
              <HiChevronDown />
            </span>
            Price
          </Menus.Button>

          <Menus.Button>
            <span>
              <HiChevronDown />
            </span>
            Rating
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Menus>
  );
};

export default Filter;
