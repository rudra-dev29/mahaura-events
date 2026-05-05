import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage, placeholder } from '@cloudinary/react';

interface CloudinaryImageProps {
  publicId: string;
  alt?: string;
  className?: string;
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ publicId, alt, className }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }
  });

  const img = cld
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(800).height(800));

  return (
    <AdvancedImage 
      cldImg={img} 
      alt={alt} 
      className={className}
      plugins={[placeholder({ mode: 'blur' })]}
    />
  );
};
