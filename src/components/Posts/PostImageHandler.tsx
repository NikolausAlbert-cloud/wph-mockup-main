import React, { useEffect, useState } from "react"
import DefaultSvgComponent from "@/assets/images/person-laptop.svg";

type PostImageHandlerProps = {
  name?: string;
  component: string;
  imageUrl: string | File;
  altText: string;
  className: string;
};

export const PostImageHandler: React.FC<PostImageHandlerProps> = ({ name, component, imageUrl, altText, className }) => {
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setHasError(false);
    };
  }, [imageUrl]);

  const componentImage = component;
  if (hasError) {
    if (componentImage === "userboxinfo") {
      return (
        <div className="bg-primary-300 rounded-full size-20 flex-center">
          {name}
        </div>
      )  
    } else if (componentImage === "postblog") {
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