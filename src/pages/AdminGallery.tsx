import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { GalleryImage } from '../types';
import { ImageUploader } from '../components/ImageUploader';
import { GalleryGrid } from '../components/GalleryGrid';
import { useNavigate } from 'react-router-dom';

import { LuxuryBackground } from '../components/LuxuryBackground';

export const AdminGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GalleryImage[];
      setImages(imgs);
      setLoading(false);
    }, (err) => {
      setError(`Error fetching gallery: ${err.message}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUploadComplete = () => {
    // The client already added the document to Firestore
    // The onSnapshot listener will pick it up automatically
  };

  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string, imageUrl: string, cloudinaryId?: string } | null>(null);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const { id, cloudinaryId } = deleteConfirm;

    try {
      setError(null);
      console.log('Attempting to delete image:', { id, cloudinaryId });

      // 1. Delete from Firestore via Client SDK
      await deleteDoc(doc(db, 'gallery', id));
      console.log('Firestore document deleted successfully');

      // 2. Delete from Cloudinary via Server API
      if (cloudinaryId) {
        const response = await fetch('/api/cloudinary/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cloudinaryId }),
        });
        
        if (!response.ok) {
          console.warn('Cloudinary deletion failed, but Firestore doc was removed');
        } else {
          console.log('Cloudinary image deleted successfully');
        }
      }
      setDeleteConfirm(null);
    } catch (err: any) {
      console.error('Delete error:', err);
      setError(`Failed to delete image: ${err.message}`);
      setDeleteConfirm(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen py-12 px-6 text-white selection:bg-luxury-gold/30">
      <LuxuryBackground />
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Delete Image?</h3>
                <p className="text-slate-500">This action cannot be undone. Are you sure you want to remove this masterpiece from your gallery?</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-white tracking-tight">Gallery Management</h1>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase rounded-md tracking-wider">Admin</span>
            </div>
            <p className="text-slate-300 max-w-xl">Upload new masterpieces or manage your existing collection.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors shadow-sm backdrop-blur-sm"
            >
              View Public Site
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-400 bg-white/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors shadow-sm backdrop-blur-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex justify-between items-center backdrop-blur-sm">
            <p className="text-sm font-medium">{error}</p>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          <aside className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-bold text-white">Upload New Image</h2>
            <ImageUploader onUploadComplete={handleUploadComplete} onError={setError} />
          </aside>

          <main className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-bold text-white">Current Gallery ({images.length})</h2>
            <GalleryGrid images={images} loading={loading} isAdmin={true} onDelete={(id, imageUrl, cloudinaryId) => setDeleteConfirm({ id, imageUrl, cloudinaryId })} />
          </main>
        </div>
      </div>
    </div>
  );
};
