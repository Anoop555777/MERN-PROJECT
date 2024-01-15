import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useRecentStays = () => {
  const [searchParam] = useSearchParams();
  const numDays = +searchParam.get("last") || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: stays } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, stays, confirmedStays, numDays };
};

export default useRecentStays;
