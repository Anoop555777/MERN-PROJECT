import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./../../store/UserContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout } from "./../../services/apiAuth";
const useLogout = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useUser();
  const queryClient = useQueryClient();

  const { mutate: logoutUser, isLoading: isLogoutLoading } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      setUser(null);
      setIsAuthenticated(false);
      queryClient.removeQueries({ queryKey: ["user"], exact: true });
      toast.success("logout  successfully");
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });
  return { logoutUser, isLogoutLoading };
};

export default useLogout;
