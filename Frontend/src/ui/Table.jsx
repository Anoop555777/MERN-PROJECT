import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
`;

const TableHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const TableRow = styled(CommonRow)`
  padding: 1.2rem;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const TableContext = createContext();

const Table = ({ children, columns }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <TableHeader as="header" role="row" columns={columns}>
      {children}
    </TableHeader>
  );
}

function Row({ children, onClick }) {
  const { columns } = useContext(TableContext);
  function handler(e) {
    if (e.target.closest("button")) return;
    onClick?.();
  }
  return (
    <TableRow role="row" columns={columns} onClick={handler}>
      {children}
    </TableRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>No data found</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
