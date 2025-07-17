import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
//harus dari next/navigation
import { toast } from "sonner";
const useDeleteBlog = () => {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blogId: number) => {
      const { data } = await axiosInstance.delete(`/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${session.data?.user.accessToken}`,
        },
      });

      return data;
    },

    onSuccess: async () => {
      toast.success("delete success");
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.replace("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useDeleteBlog;
