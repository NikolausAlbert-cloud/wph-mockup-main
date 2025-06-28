import { FormInput } from '@/components/FormInput'
import { postsData } from '@/constants/posts_data'
import { zodResolver } from '@hookform/resolvers/zod'
import { Path, SubmitHandler, useForm } from 'react-hook-form'
import { PostsData, PostsFormInput, PostsSchema } from '@/utils/validation'
import { useState } from 'react'
import { postPosts } from '@/api/posts'
import {ImageUploadEditor} from '@/components/Posts/Quill'

export const Posts = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<PostsFormInput>({
    resolver: zodResolver(PostsSchema),
    defaultValues: {
      title: "",
      content: "",
      coverimage: undefined,
      tags: ""
    }
  })

    const uploadImageToServer = async (file: File): Promise<string> => {
    console.log("Uploading file:", file.name);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `https://your-image-cdn.com/${Date.now()}-${file.name}`;
  };

  const onSubmit: SubmitHandler<PostsFormInput> = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      let finalCoverImage: string;

      if (data.coverimage instanceof FileList && data.coverimage.length > 0) {
        const fileToUpload = data.coverimage[0]; 
        finalCoverImage = await uploadImageToServer(fileToUpload);
      } else if (typeof data.coverimage === 'string' && data.coverimage.length > 0) {
        finalCoverImage = data.coverimage;
      } else {
        console.error("Cover image is required but not provided or invalid.");
        setError("Cover image is required.");
        setLoading(false);
        return; 
      }
      const transformedTags = data.tags
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const payloadData: PostsData = {
        title: data.title,
        content: data.content,
        coverimage: finalCoverImage, // This is now guaranteed to be a string
        tags: transformedTags,
      };

      console.log("Form submitted successfully:", payloadData);

      const response = await postPosts({
        payload: payloadData,
      });
      console.log("Response from API:", response);
      reset();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Error: An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-30 custom-container">
      {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
    {postsData.map((data, i) => {
      {console.log(data)}
      const fieldName = data.fieldName as Path<PostsFormInput>;
      if (data.type == "quill") {
        return (
          <div key={i} className="mb-4">
            {/* <FormInput label={data.label} error={errors[fieldName]?.message} >
              <ImageUploadEditor
                control={control}
                name={fieldName}
                placeholder={data.placeholder}
                className={`w-full py-2.5 px-4 border ${errors.content ? "border-red-500" : "border-neutral-300"} rounded-xl text-neutral-950 text-sm font-weight-regular focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </FormInput>
            {errors[fieldName] && (
              <p className="text-red-500 text-xs mt-1">{errors[fieldName].message}</p>
            )} */}
            <p>Hello</p>
          </div>
        );
      } else {
        return (
          <FormInput key={i} label={data.label} error={errors[fieldName]?.message} >
            <input 
              {...register(fieldName)}
              placeholder={data.placeholder}
              type={data.type}
              className={`w-full py-2.5 px-4 border ${errors[fieldName] ? "border-red-500" : "border-neutral-300"} rounded-xl text-neutral-950 text-sm font-weight-regular focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </FormInput>
        );
      }
    })} 
    <button 
      type="submit" 
      disabled={loading}
      className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-xl text-sm font-weight-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {loading ? "Submitting..." : "Finish"}
    </button>
  </form>
  )
};
