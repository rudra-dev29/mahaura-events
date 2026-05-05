import React, { useState, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  onError: (error: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadComplete, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      onError('Please select a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      onError('File size must be less than 5MB.');
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      onError('No file selected for upload.');
      return;
    }

    try {
      setUploading(true);
      setProgress(10); // Start progress

      const formData = new FormData();
      formData.append('image', file);

      // 1. Upload to Cloudinary via Server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      setProgress(70);

      // 2. Save to Firestore via Client SDK
      await addDoc(collection(db, 'gallery'), {
        imageUrl: data.url,
        cloudinaryId: data.cloudinaryId,
        createdAt: serverTimestamp(),
        fileName: file.name
      });

      setProgress(100);
      
      setTimeout(() => {
        setUploading(false);
        setFile(null);
        setPreview(null);
        setProgress(0);
        onUploadComplete(data.url);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }, 500);

    } catch (err: any) {
      setUploading(false);
      onError(`Upload failed: ${err.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-8 transition-colors hover:border-slate-300">
        {preview ? (
          <div className="relative w-full max-w-xs aspect-square rounded-lg overflow-hidden shadow-inner">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={() => { setFile(null); setPreview(null); }}
              className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-sm text-slate-600">
              <label className="relative cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 5MB</p>
          </div>
        )}
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-slate-600">
            <span>Uploading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all ${
          !file || uploading
            ? 'bg-slate-300 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow-md'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload to Gallery'}
      </button>
    </div>
  );
};
