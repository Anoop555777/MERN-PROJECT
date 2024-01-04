import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
function useCabin() {
  const [searchParam] = useSearchParams();
  const page = +searchParam.get("page") || 1;
  const filter = +searchParam.get("discount[gte]") || 0;

  const { isLoading, data: cabinsData } = useQuery({
    queryKey: ["cabins", page, filter],
    queryFn: () => getCabins({ page, filter }),
  });

  return { isLoading, cabinsData };
}

export default useCabin;
