import React from 'react';
import { GalleryImage } from '../types';
import { CloudinaryImage } from './CloudinaryImage';

interface GalleryGridProps {
  images: GalleryImage[];
  loading: boolean;
  onDelete?: (id: string, publicId?: string) => void;
  isAdmin?: boolean;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ images, loading, onDelete, isAdmin }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-slate-200 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 text-lg">No images found in the gallery.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div key={image.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all hover:shadow-md">
          {image.publicId ? (
            <CloudinaryImage
              publicId={image.publicId}
              alt="Gallery item"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <img
              src={image.imageUrl}
              alt="Gallery item"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          )}
          {isAdmin && onDelete && (
            <button
              onClick={() => onDelete(image.id, image.publicId)}
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
              title="Delete image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-xs font-medium">
              {image.createdAt ? image.createdAt.toDate().toLocaleDateString() : 'Just now'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
