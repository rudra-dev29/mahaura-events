import React, { useMemo } from 'react';
import { motion } from 'motion/react';

export const NebulaBackground: React.FC = () => {
  // Generate random stars once to avoid re-renders
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      size: Math.random() * 2 + 1 + 'px',
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Nebula Cloud 1: Deep Purple */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full blur-[150px]"
        style={{
          background: 'radial-gradient(circle, #5B2EA8 0%, transparent 70%)',
        }}
      />

      {/* Nebula Cloud 2: Indigo/Blue */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] rounded-full blur-[180px]"
        style={{
          background: 'radial-gradient(circle, #1E1B4B 0%, transparent 70%)',
        }}
      />

      {/* Nebula Cloud 3: Gold Accents */}
      <motion.div
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '10%', '-10%'],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] left-[30%] w-[60%] h-[60%] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 60%)',
        }}
      />

      {/* Nebula Cloud 4: Magenta/Pink highlight */}
      <motion.div
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] right-[10%] w-[50%] h-[50%] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #701A75 0%, transparent 60%)',
        }}
      />

      {/* Star Field */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Cosmic Dust / Grain Texture */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-screen"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
};
