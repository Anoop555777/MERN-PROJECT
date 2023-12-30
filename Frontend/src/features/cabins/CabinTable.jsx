import Spinner from "./../../ui/Spinner";
import Table from "./../../ui/Table";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Menus from "./../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { isLoading, cabins } = useCabin();
  const [searchParam] = useSearchParams();
  if (isLoading) return <Spinner />;
  //1>filter
  const filteredValue = searchParam.get("discount[gte]") || "all";

  let filterCabins;
  if (filteredValue === "all") filterCabins = cabins;
  else
    filterCabins = cabins.filter(
      (cabin) => cabin.discountPercentage >= +filteredValue
    );

  //2> sortBy
  const sortBy = searchParam.get("sortBy") || "name-asc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCabins;
  if (field === "name")
    sortedCabins = filterCabins.sort(
      (a, b) => a.name.localeCompare(b.name) * modifier
    );
  else
    sortedCabins = filterCabins.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin._id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
