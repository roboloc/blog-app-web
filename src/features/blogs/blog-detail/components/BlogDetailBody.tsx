import Markdown from "@/components/Markdown";
import { Blog } from "@/types/blog";
import React from "react";

interface BlogDetailBodyProps {
  blog: Blog;
}

const BlogDetailBody = ({ blog }: BlogDetailBodyProps) => {
  return (
    <section className="mt-4 mb-20 space-y-3.5 px-4">
      <Markdown content={blog.content} />
    </section>
  );
};

export default BlogDetailBody;
