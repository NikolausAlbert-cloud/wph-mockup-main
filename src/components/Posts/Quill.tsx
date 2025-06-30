import React, { useRef, useImperativeHandle } from 'react';
import ReactQuill from 'react-quill';
import DeltaStatic from 'quill';
import 'react-quill/dist/quill.snow.css';

type QuillProps = {
  value: string;
  onChange: (
    content: string,
    delta: DeltaStatic,
    source: 'user' | 'api' | 'silent',
    editor: ReactQuill.UnprivilegedEditor
  ) => void;
  placeholder: string;
  className: string;
  id: string;
}

export const Quill: React.FC<QuillProps> = React.forwardRef(({ value, onChange, placeholder, className, id }, ref) => {
  const quillRef = useRef<ReactQuill>(null); // Create an internal ref for ReactQuill

  // Expose the internal quillRef to the parent component via the forwarded ref
  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current ? quillRef.current.getEditor() : null,
    focus: () => quillRef.current && quillRef.current.focus(),
    blur: () => quillRef.current && quillRef.current.blur(),
  }));

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, false] }],
      ['bold', 'strike', 'italic'],
      [{ 'script': 'sub'}, { 'script': 'super' }],  
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'formula'],
      [{ 'align': "" }, { 'align': "center" }, { 'align': "right" }, { 'align': "justify" }],
      ['blockquote', 'code-block'],
      ['clean']
    ],
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true
    }
  };

  const formats = [
    "font",
    'header',
    'bold', 'strike','italic',
    "script",
    'list', 'bullet', 'indent',
    'link', 'image', "formula",
    'blockquote', 'code-block',
    'align'
  ];

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className={`${className || ''} quill-rounded-editor`} 
      id={id}
    />
  );
});

Quill.displayName = 'Quill';