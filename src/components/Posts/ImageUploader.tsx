import React, { useRef, useState, useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import { ArrowUpToLine, CloudUpload, Trash2, XCircle } from 'lucide-react';

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

  const handleChangeImage = (e) => {
    e.stopPropagation(); // Prevent triggering the handleClick (which opens file dialog)
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    onBlur(); // Mark field as touched
  }

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
          <div className="image-preview py-4 px-6 flex flex-col gap-3">
            <div className="flex-center">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="object-contain flex-center"
                style={{
                  height: `clamp(10.38rem, 19.44vw, 17.50rem)`,
                  width: `clamp(19.56rem, 36.74vw, 33.06rem)`,
                }}
              />
            </div>
            {/* <span className="file-name">{value?.name}</span> */}
            <div className="flex-center gap-3">
              <button 
                className="py-1.5 px-3 flex-center gap-1.5 border-neutral-300 border-[1px] rounded-lg cursor-pointer"
                type="button" 
                onClick={handleChangeImage}
                aria-label="Change image"
              >
                <ArrowUpToLine size={15} />
                <p className="text-sm font-semibold">Change Image</p>
              </button>
              <button 
                className="py-1.5 px-3 flex-center gap-1.5 border-neutral-300 border-[1px] rounded-lg text-red-delete cursor-pointer"
                type="button" 
                onClick={handleClearImage}
                aria-label="Remove image"
              >
                <Trash2 size={15} />
                <p className="text-sm font-semibold">Delete Image</p>
              </button>
            </div>
            <div className="flex-center">
              <p className="text-neutral-700 text-xs font-regular">
                PNG or JPG  (max. 5mb)
              </p>
            </div>
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