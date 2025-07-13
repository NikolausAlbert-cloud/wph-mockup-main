import React, { useEffect, useState } from "react"
import DefaultSvgComponent from "@/assets/images/person-laptop.svg";

type PostImageHandlerProps = {
  imageUrl: string;
  altText: string;
  className: string;
};

export const PostImageHandler: React.FC<PostImageHandlerProps> = ({ imageUrl, altText, className }) => {
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setHasError(false);
    };
  }, [imageUrl]);

  if (hasError) {
    return (
      <DefaultSvgComponent 
        className={className} 
        role="img" 
        aria-labelledby="Default Post Image" 
      />
    )
  }

  return (
    <img 
      src={imageUrl} 
      alt={altText} 
      className={className} 
      onError={(e) => {
        setHasError(true);
      }} 
    />
  )
}