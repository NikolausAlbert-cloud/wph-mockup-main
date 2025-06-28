import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { Control, Controller, FieldValues, Path } from 'react-hook-form'; 

interface ImageUploadEditorProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>; // Explicitly type control
  name: Path<TFieldValues>;
  placeholder?: string; // Optional prop
  className?: string; // Optional prop
}

export const ImageUploadEditor =  <TFieldValues extends FieldValues>({ 
  control, name, placeholder, className 
}: ImageUploadEditorProps<TFieldValues>) => {
  const quillRef =  useRef<ReactQuill | null>(null)

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      // Custom handler for image (if you want to implement server-side image uploads)
      // For a full image upload example, see the previous detailed explanation.
      // Here's a placeholder for context:
      // handlers: {
      //   image: yourCustomImageUploadHandler,
      // },
    },
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'script', 'indent', 'direction',
    'size', 'color', 'background', 'font', 'align',
    'link', 'image', 'video', 'clean'
  ];

  return (
    <Controller
      name={name} // The name from react-hook-form's register
      control={control} // The control object from useForm
      render={({ field: { onChange, value, onBlur } }) => (
        <ReactQuill
          ref={(element: ReactQuill | null) => {
            quillRef.current = element; // Our local ref for direct Quill access (e.g., for image handler)
          }}
          theme="snow" // or "bubble"
          value={value || ''} // Ensure value is a string, even if initially undefined
          onChange={(content) => {
            onChange(content); // Update react-hook-form value
          }}
          onBlur={() => {
            onBlur(); // Notify react-hook-form about blur
          }}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className={className}
        />
      )}
    />
  );
};