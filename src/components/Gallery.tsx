import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const cld = new Cloudinary({ 
  cloud: { 
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'droniywtz' 
  } 
});

export const Gallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setImages(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section id="gallery" className="py-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl">Our Gallery</h2>
          <p className="text-slate-400">A glimpse into the magic we create</p>
        </div>
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 px-4 space-y-4">
        {images.map((img, i) => {
          if (img.cloudinaryId) {
            const cldImg = cld.image(img.cloudinaryId)
              .format('auto')
              .quality('auto')
              .resize(auto().gravity(autoGravity()).width(500).height(500));

            return (
              <motion.div
                key={img.id || i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="w-full aspect-square rounded-xl overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
              >
                <AdvancedImage cldImg={cldImg} className="w-full h-full object-cover" />
              </motion.div>
            );
          }

          return (
            <motion.img 
              key={img.id || i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              src={img.imageUrl} 
              alt={`Gallery item ${i}`} 
              className="w-full rounded-xl hover:opacity-80 transition-opacity cursor-pointer"
              referrerPolicy="no-referrer"
            />
          );
        })}
      </div>
    </section>
  );
};
