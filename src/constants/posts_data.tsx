import { PostsFormInput } from "@/utils/validation";
import { Path } from "react-hook-form";

type postsProps = {
  label: string;
  type: "text" | "quill" | "file";
  placeholder: string;
  fieldName:  Path<PostsFormInput>;
};

export const postsData: postsProps[] = [
  {
    label: "Title",
    type: "text",
    placeholder: "Enter your title",
    fieldName: "title",
  },
  {
    label: "Content",
    type: "quill",
    placeholder: "Enter your content",
    fieldName: "content",
  },
  {
    label: "Cover Image",
    type: "file",
    placeholder: "",
    fieldName: "coverImage",
  },
  {
    label: "Tags",
    type: "text",
    placeholder: "Enter your tags (comma-separated)",
    fieldName: "tags",
  },
];