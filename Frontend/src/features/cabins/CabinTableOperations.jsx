import React from "react";
import Filter from "../../ui/Filter";
import styled from "styled-components";
import SortBy from "../../ui/SortBy";
import Menus from "../../ui/Menus";
const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;
const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Menus>
        <Filter
          filterField="discount[gte]"
          query="filter"
          options={[
            { value: "0", label: "All" },
            { value: "40", label: "Discount more than 40%" },
            { value: "20", label: "Discount more than 20%" },
            { value: "10", label: "Discount more than 10%" },
          ]}
        />
        <SortBy
          filterField="sortBy"
          query="sort"
          options={[
            { value: "name-desc", label: "Sort by name" },
            { value: "name-asc", label: "Sort by name" },
            {
              value: "price-desc",
              label: "Sort by amount (high first)",
            },
            { value: "price-asc", label: "Sort by amount (low first)" },
          ]}
        />
      </Menus>
    </TableOperations>
  );
};

export default CabinTableOperations;
