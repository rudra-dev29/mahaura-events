import { Timestamp } from 'firebase/firestore';

export interface GalleryImage {
  id: string;
  imageUrl: string;
  publicId?: string;
  createdAt: Timestamp;
}
