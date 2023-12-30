import CabinHeader from "./../../ui/CabinHeader";
import useCabinDetail from "../useCabinDetail";
import Spinner from "../../ui/Spinner";
import AddBooking from "./../bookings/AddBooking";
const CabinDetailPage = () => {
  const { cabin, isLoading } = useCabinDetail();
  if (isLoading) return <Spinner />;
  return (
    <>
      <CabinHeader cabin={cabin} />
      <AddBooking />
    </>
  );
};

export default CabinDetailPage;
