import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
function useBooking() {
  //query
  const [searchParam] = useSearchParams();
  const page = +searchParam.get("page") || 1;
  const field = searchParam.get("status") || "all";
  const { isLoading, data: bookingsData } = useQuery({
    queryKey: ["bookings", page, field],
    queryFn: () => getAllBookings({ page, field }),
  });

  return { isLoading, bookingsData };
}
export default useBooking;
