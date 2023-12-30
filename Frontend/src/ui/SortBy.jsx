import Menus from "./Menus";
import { HiChevronDown } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

const SortBy = ({ filterField, options, query }) => {
  const [searchParams, setSearchParam] = useSearchParams({});

  function handlerFilter(query) {
    searchParams.set(filterField, query);
    setSearchParam(searchParams);
  }

  return (
    <Menus.Menu>
      <Menus.Toggle id={query}>SortBy</Menus.Toggle>
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
      </Menus.List>
    </Menus.Menu>
  );
};

export default SortBy;
