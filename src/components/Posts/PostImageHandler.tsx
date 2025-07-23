import React, { useEffect, useState } from "react"
import DefaultSvgComponent from "@/assets/images/person-laptop.svg";

type PostImageHandlerProps = {
  name?: string;
  component: string;
  imageUrl?: string | File ;
  altText: string;
  className: string;
  imgSize?: string;
};

export const PostImageHandler: React.FC<PostImageHandlerProps> = ({ name, component, imageUrl, altText, className, imgSize }) => {
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setHasError(false);
    };
  }, [imageUrl]);

  const imageSrc = ["navbar", "userboxinfo", "userprofiledialog"]

  if (hasError) {
    if (imageSrc.includes(component)) {
      return (
        <div 
          className={`bg-primary-200 rounded-full flex-center overflow-hidden ${className}`}
        >
          {name}
        </div>
      )  
    } else {
      return (
        <DefaultSvgComponent 
          className={className} 
          role="img" 
          aria-labelledby="Default Post Image" 
        />
      )  
    }
    
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