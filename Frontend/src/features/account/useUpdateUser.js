import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateMe } from "../../services/apiUser";
const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUserMutate } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User updated successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUserMutate, isUpdating };
};

export default useUpdateUser;
