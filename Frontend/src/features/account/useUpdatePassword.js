import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../services/apiUser";
const useUpdatePassword = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updatePasswordMutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"], exact: true });
      toast.success("Password updated successfully");
      navigate("/login");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updatePasswordMutate, isUpdating };
};

export default useUpdatePassword;
