import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "./../../services/apiAuth";
const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginUser, isLoading: isLoginLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], {
        name: data.user.name,
        email: data.user.email,
        id: data.user._id,
        role: data.user.role,
        photo: data.user.photo,
        nationalId: data.user.nationalId,
        nationality: data.user.nationality,
        countryFlag: data.user.countryFlag,
      });
      toast.success("login in successfully");
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });
  return { loginUser, isLoginLoading };
};

export default useLogin;
