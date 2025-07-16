import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  title: string;
  category: string;
  description: string;
  content: string;
  thumbnail: File | null;
}

const useCreateBlog = () => {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      //jika create datanya banyak maka gunaakan form data tidak langusng {title : blah }
      const formData = new FormData();

      formData.append("title", payload.title);
      formData.append("category", payload.category);
      formData.append("description", payload.description);
      formData.append("content", payload.content);
      formData.append("thumbnail", payload.thumbnail!);

      const { data } = await axiosInstance.post("/blogs", formData, {
        headers: {
          Authorization: `Bearer ${session.data?.user.accessToken}`,
        },
      });

      return data;
    },

    onSuccess: async () => {
      toast.success("create blog success");
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      // console.log(error);
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateBlog;
