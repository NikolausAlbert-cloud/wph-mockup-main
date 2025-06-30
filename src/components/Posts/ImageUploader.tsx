import React, { useRef, useState, useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import { CloudUpload, XCircle } from 'lucide-react';

type ImageUploaderProps = {
  name: string;
  control: Control<any>;
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ name, control }) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const imageUrl = URL.createObjectURL(value);
      setPreviewImage(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    } else if (typeof value === "string" && value) {
      setPreviewImage(value);
    } else {
      setPreviewImage(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    } else {
      onChange(null);
    }
    onBlur();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onChange(files[0]);
    }
    onBlur();
  };

    const handleClearImage = (e) => {
    e.stopPropagation(); // Prevent triggering the handleClick (which opens file dialog)
    onChange(null); // Set the react-hook-form field value to null
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onBlur(); // Mark field as touched
  };

  return (
    <div className="cover-image-container block text-gray-700 text-sm font-bold mb-2">
      
      <div
        className={`image-upload-area ${isDragging ? 'dragging' : ''} ${invalid ? 'error-border border-red-500' : ''}  border-neutral-400 border-dashed  border-[1px] rounded-xl bg-neutral-50`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewImage ? (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" className="h-full w-full object-contain" />
            <span className="file-name">{value?.name}</span>
            <button
              type="button" 
              onClick={handleClearImage}
              className="clear-image-button"
              aria-label="Remove image"
            >
              <XCircle size={20} />
            </button>
          </div>
        ) : (
          <div className="py-4 px-6 flex-center flex-col">
            <CloudUpload  className="size-10 p-3 text-neutral-950 border-neutral-300 border-[1px] rounded-md"/>
            <p className="upload-text text-sm font-regular text-neutral-700 pb-1 pt-3">
              <span className="click-to-upload text-primary-300 font-semibold cursor-pointer">Click to upload</span> or drag and drop
            </p>
            <p className="file-type-info text-xs font-regular text-neutral-700">PNG or JPG (max. 5mb)</p>
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          ref={(e) => {
            ref(e);
            fileInputRef.current = e;
          }}
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default ImageUploader;