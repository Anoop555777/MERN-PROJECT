import React from "react";
import Filter from "../../ui/Filter";
import styled from "styled-components";
const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;
const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter />
    </TableOperations>
  );
};

export default CabinTableOperations;
