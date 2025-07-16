"use client";

import { Loader } from "lucide-react";
import usegetBlogs from "../api/useGetBlogs";
import BlogCard from "./BlogCard";
import { Input } from "@/components/ui/input";
// import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import PaginationSection from "@/components/PaginationSection";
import { parseAsInteger, useQueryState } from "nuqs";
import NoData from "@/components/NoData";

const BlogList = () => {
  // const [search, setSearch] = useState<string>("");
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  //  const [page, setPage] = useState<number>(1);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [debounceSearch] = useDebounceValue(search, 500);

  // search: search
  const { data: blogs, isPending } = usegetBlogs({
    page,
    take: 3,
    search: debounceSearch,
  });

  console.log("ini isi state search", search);

  return (
    <>
      <Input
        className="mx-auto mt-8 max-w-xl"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <section className="mt-16 grid gap-8 md:grid-cols-3">
        {isPending && (
          <div className="col-span-3 flex h-[30vh] items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )}

        {!isPending && !blogs?.data.length && <NoData />}

        {blogs?.data.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </section>

      {!!blogs && (
        <div className="mt-4">
          <PaginationSection
            page={blogs.meta.page}
            take={blogs.meta.take}
            total={blogs.meta.total}
            setPage={setPage}
          />
        </div>
      )}
    </>
  );
};

export default BlogList;
