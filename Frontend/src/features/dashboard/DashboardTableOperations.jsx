import React from "react";
import Filter from "../../ui/Filter";
import styled from "styled-components";
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
          filterField="last"
          query="filter"
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
        />
      </Menus>
    </TableOperations>
  );
};

export default CabinTableOperations;
