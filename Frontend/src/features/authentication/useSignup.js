import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "./../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signupUser, isLoading: isSignupLoading } = useMutation({
    mutationFn: ({ name, email, password, confirmPassword, nationalId }) =>
      signup({ name, email, password, confirmPassword, nationalId }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], {
        name: data.user.name,
        email: data.user.email,
        id: data.user._id,
        role: data.user.role,
        photo: data.user.photo,
      });
      toast.success("Account is successfully created!");
      navigate("/");
    },
    onError: (error) => {
      toast.error("sorry! something went wrong please try again later");
    },
  });

  return { signupUser, isSignupLoading };
}
