"use client";
import { Loader } from "lucide-react";
import useGetBlogBySlug from "./api/useGetBlogBySlug";
import BlogDetailBody from "./components/BlogDetailBody";
import BlogDetailHeader from "./components/BlogDetailHeader";
import NoData from "@/components/NoData";
import Loading from "@/components/Loading";

interface BlogDetailPageProps {
  slug: string;
}

const BlogDetailPage = ({ slug }: BlogDetailPageProps) => {
  const { data: blog, isPending } = useGetBlogBySlug(slug);

  if (isPending) {
    return <Loading></Loading>;
  }

  if (!blog) {
    return <NoData></NoData>;
  }

  return (
    <main className="conntainer mx-auto px-4">
      {/* jika masih ada merah maka pastikan data pada blog detail header di
      interface props apakah harus ada isi atau bisa null jika tidak boleh null
      maka buat kondisi diatas seperti !blog */}
      <BlogDetailHeader blog={blog} />
      <BlogDetailBody blog={blog} />
    </main>
  );
};

export default BlogDetailPage;
