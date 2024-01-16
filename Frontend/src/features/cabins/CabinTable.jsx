import Spinner from "./../../ui/Spinner";
import Table from "./../../ui/Table";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Menus from "./../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

const CabinTable = () => {
  const { isLoading, cabinsData } = useCabin();
  const [searchParam] = useSearchParams();
  if (isLoading) return <Spinner />;
  //1>filter
  const { cabins, noOfFilterCabins, totalCabins } = cabinsData;
  const filter = searchParam.get("discount[gte]");

  //2> sortBy
  const sortBy = searchParam.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCabins;
  if (field === "name")
    sortedCabins = cabins.sort(
      (a, b) => a.name.localeCompare(b.name) * modifier
    );
  else sortedCabins = cabins.sort((a, b) => (a[field] - b[field]) * modifier);

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
        <Table.Footer>
          <Pagination
            count={
              filter && filter !== "0"
                ? sortedCabins.length === 0
                  ? 0
                  : noOfFilterCabins
                : totalCabins
            }
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default CabinTable;
