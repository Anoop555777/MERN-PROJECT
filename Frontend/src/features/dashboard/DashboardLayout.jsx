import styled from "styled-components";
import useRecentBooking from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./../dashboard/Stats";
import useCabin from "../cabins/useCabin";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 30rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading: isLoading1, bookings } = useRecentBooking();
  const {
    isLoading: isLoading2,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { isLoading: isLoading3, cabinsData } = useCabin();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  const { totalCabins } = cabinsData;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        cabinCount={totalCabins}
        confirmedStays={confirmedStays}
        numDays={numDays}
      />
      <div>c</div>
      <div>d</div>
      <div>c</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
