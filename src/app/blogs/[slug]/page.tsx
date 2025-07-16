import BlogDetailPage from "@/features/blogs/blog-detail";

const BlogDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  // jika ingin mengirim data antar page harus menggunakan props pada function
  // dan jangan lupa masukan slug
  return <BlogDetailPage slug={slug} />;
};

export default BlogDetail;
