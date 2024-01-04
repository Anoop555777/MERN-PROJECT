import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCabin } from "../../services/apiCabins";

const useCabinDetail = () => {
  const { cabinId } = useParams();
  const { isLoading, data: cabin } = useQuery({
    queryKey: ["cabin", cabinId],
    queryFn: () => getCabin(cabinId),
    retry: false,
  });
  return { isLoading, cabin };
};

export default useCabinDetail;
