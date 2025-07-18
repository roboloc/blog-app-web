import * as Yup from "yup";

// YUP DIGUNAKAN UNTUK ERRROR MESSAGE PADA FRONT END
export const CreateBlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  content: Yup.string().required("Content is required"),
});
