import styled, { css } from "styled-components";
import Menus from "./Menus";
import { HiChevronDown } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
// const FilterButton = styled.button`
//   background-color: var(--color-grey-0);
//   border: none;

//   ${(props) =>
//     props.active &&
//     css`
//       background-color: var(--color-brand-600);
//       color: var(--color-brand-50);
//     `}

//   border-radius: var(--border-radius-sm);
//   font-weight: 500;
//   font-size: 1.4rem;
//   /* To give the same height as select */
//   padding: 0.44rem 0.8rem;
//   transition: all 0.3s;

//   &:hover:not(:disabled) {
//     background-color: var(--color-brand-600);
//     color: var(--color-brand-50);
//   }
// `;

const Filter = ({ filterField, options, query }) => {
  const [searchParam, setSearchParam] = useSearchParams({});

  function handlerFilter(query) {
    searchParam.set(filterField, query);
    searchParam.set("page", 1);
    setSearchParam(searchParam);
  }
  return (
    <Menus.Menu>
      <Menus.Toggle id={query}>Filter</Menus.Toggle>
      <Menus.List id={query}>
        {options.map((option) => (
          <Menus.Button
            key={option.value}
            onClick={() => handlerFilter(option.value)}
          >
            <span>
              <HiChevronDown />
            </span>
            {option.label}
          </Menus.Button>
        ))}
        {/* <Menus.Button onClick={() => handlerFilter(40)}>
            <span>
              <HiChevronDown />
            </span>
            Discount more than 40%
          </Menus.Button>
          <Menus.Button onClick={() => handlerFilter(20)}>
            <span>
              <HiChevronDown />
            </span>
            Discount more than 20%
          </Menus.Button>

          <Menus.Button onClick={() => handlerFilter(10)}>
            <span>
              <HiChevronDown />
            </span>
            Discount more than 10%
          </Menus.Button>

          <Menus.Button onClick={() => handlerFilter("all")}>
            <span>
              <HiChevronDown />
            </span>
            All
          </Menus.Button> */}
      </Menus.List>
    </Menus.Menu>
  );
};

export default Filter;
