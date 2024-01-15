import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useRecentBooking = () => {
  const [searchParam] = useSearchParams();
  const numDays = +searchParam.get("last") || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isLoading, bookings };
};

export default useRecentBooking;
