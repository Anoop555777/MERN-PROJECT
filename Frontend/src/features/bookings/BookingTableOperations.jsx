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
const BookingTableOperations = () => {
  return (
    <TableOperations>
      <Menus>
        <Filter
          filterField="status"
          query="filter"
          options={[
            { value: "all", label: "all" },
            { value: "checked-out", label: "checked-out" },
            { value: "checked-in", label: "checked-in" },
            { value: "unconfirmed", label: "unconfirmed" },
          ]}
        />
        <SortBy
          filterField="sortBy"
          query="sort"
          options={[
            { value: "startDate-desc", label: "Sort by date (recent first)" },
            { value: "startDate-asc", label: "Sort by date (earlier first)" },
            {
              value: "totalPrice-desc",
              label: "Sort by amount (high first)",
            },
            { value: "totalPrice-asc", label: "Sort by amount (low first)" },
          ]}
        />
      </Menus>
    </TableOperations>
  );
};

export default BookingTableOperations;
