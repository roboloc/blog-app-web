import { Badge } from "@/components/ui/badge";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Image from "next/image";
import ModalConfirmationDeleteBlog from "./ModalConfirmationDeleteBlog";
import { useSession } from "next-auth/react";

interface BlogDetailHeaderProps {
  blog: Blog;
}

const BlogDetailHeader = ({ blog }: BlogDetailHeaderProps) => {
  const session = useSession();

  return (
    <section className="space-y-2">
      {/* //badge import dari components */}
      <Badge
        variant="outline"
        className="mt-5 rounded-sm bg-green-100 font-bold text-green-600 capitalize"
      >
        {blog.category}
      </Badge>
      <h1 className="font-Bold text-2xl md:text-3xl">{blog.title}</h1>

      <div className="flex items-center justify-between">
        <p>
          {format(blog.createdAt, "dd MMMM yyyy")} - {blog.user?.name}
        </p>
        {/* blogID = {blog.id} adalah props */}

        {/* logic untuk membandidngkan userid apakah samaa..jika sama amaka ditampilkan mengguankan usuSession */}
        {Number(session.data?.user.id) === blog.userId && (
          <ModalConfirmationDeleteBlog blogId={blog.id} />
        )}
      </div>

      <div className="relative h-[220px] overflow-hidden md:h-[360px]">
        <Image
          src={blog.thumbnail}
          alt="thumbnail"
          className="rounded-sm object-cover"
          fill
        />
      </div>
    </section>
  );
};

export default BlogDetailHeader;
