import React from 'react';
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
}

export const Quill: React.FC<QuillProps> = ({ value, onChange, placeholder, className }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align'
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className={className}
    />
  );
};