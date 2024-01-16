import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "./../../services/apiUser";
const useIsLoggedIn = () => {
  const { isLoading: isLoggedInLoading, data: user } = useQuery({
    queryFn: isLoggedIn,
    queryKey: ["user"],
    retry: false,
  });
  return { isLoggedInLoading, user, isAuthenticated: user?.name };
};

export default useIsLoggedIn;
