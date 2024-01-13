import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout } from "./../../services/apiAuth";
const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutUser, isLoading: isLogoutLoading } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], {});
      toast.success("logout  successfully");
    },
    onError: (error) => toast.error(error.message),
  });
  return { logoutUser, isLogoutLoading };
};

export default useLogout;
