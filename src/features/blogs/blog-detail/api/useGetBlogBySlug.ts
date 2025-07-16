import { axiosInstance } from "@/lib/axios";
import { Blog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";

const useGetBlogBySlug = (slug: string) => {
  return useQuery({
    //slug harus dimasukan jika terjadi perubahan maka gunakan slug terbaru
    //seperti berganti  page slug maka harus menggunakan slug baru
    // contoh cara jago minum menjadi cara jago makan
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data } = await axiosInstance<Blog>(`/blogs/${slug}`);
      return data;
    },
  });
};

export default useGetBlogBySlug;
