"use client";

import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { Trash } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import useCreateBlog from "../api/useCreateBlog";
import { CreateBlogSchema } from "../schemas";

const FormCreateBlog = () => {
  //is Pending digunakan untuk memberikan efek jika submit sedang berjalan sehingga tidak bisa ditekan
  const { mutateAsync: createBlog, isPending } = useCreateBlog();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      thumbnail: null,
    },

    validationSchema: CreateBlogSchema,
    //setelah isPending maka gunakan onSubmit
    onSubmit: async (values) => {
      await createBlog(values);
    },
  });
  //untuk menghapus image jika di delete menggunakan button
  const thumbnailRef = useRef<HTMLInputElement>(null);
  //untuk menyimpan imageg
  const [selectedImage, setSelectedImage] = useState<string>("");

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="relative mb-2 grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.title}
          required
        />
        {!!formik.touched.title && !!formik.errors.title && (
          <p className="absolute -bottom-4.5 text-xs text-red-500">
            {formik.errors.title}
          </p>
        )}
      </div>
      <div className="relative mb-2 grid gap-2">
        <Label htmlFor="title">Category</Label>
        <Input
          id="category"
          name="category"
          type="text"
          placeholder="Category"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.category}
          required
        />
        {!!formik.touched.category && !!formik.errors.category && (
          <p className="absolute -bottom-4.5 text-xs text-red-500">
            {formik.errors.category}
          </p>
        )}
      </div>
      <div className="relative mb-2 grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description}
          required
        />
        {!!formik.touched.description && !!formik.errors.description && (
          <p className="absolute -bottom-4.5 text-xs text-red-500">
            {formik.errors.description}
          </p>
        )}
      </div>

      <TiptapRichtextEditor
        label="Content"
        field="content"
        isTouch={formik.touched.content}
        content={formik.values.content}
        onChange={(value: string) => formik.setFieldValue("content", value)}
        setError={formik.setFieldError}
        setTouch={formik.setFieldTouched}
      />
      {selectedImage && (
        <div className="relative h-[150px] w-[200px]">
          <Image
            src={selectedImage}
            alt="thumbnail"
            className="object-cover"
            fill
          />
          <Button
            className="absolute -top-2 -right-2 rounded-full"
            variant="destructive"
            type="button"
            size="icon"
            onClick={removeThumbnail}
          >
            <Trash />
          </Button>
        </div>
      )}
      <div className="relative mb-2 grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          ref={thumbnailRef}
          id="thumbnail"
          type="file"
          placeholder="Thumbnail"
          accept="image/*"
          onChange={onChangeThumbnail}
        />
        {!!formik.touched.thumbnail && !!formik.errors.thumbnail && (
          <p className="absolute -bottom-4.5 text-xs text-red-500">
            {formik.errors.thumbnail}
          </p>
        )}
      </div>

      <div className="mb-30 flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default FormCreateBlog;
