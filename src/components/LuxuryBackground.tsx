import React from 'react';
import { motion } from 'motion/react';

export const LuxuryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050505]">
      {/* Ambient Base Glow */}
      <div className="absolute inset-0 opacity-20" 
           style={{ background: 'radial-gradient(circle at 50% 50%, #1A1A1A 0%, transparent 100%)' }} />

      {/* Flowing Royal Purple - Top Left */}
      <motion.div
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '5%', '-10%'],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] opacity-40 blur-[140px]"
        style={{
          background: 'radial-gradient(circle at center, #5B2EA8 0%, transparent 70%)',
        }}
      />

      {/* Flowing Luxury Gold - Bottom Right */}
      <motion.div
        animate={{
          x: ['10%', '-10%', '10%'],
          y: ['10%', '-5%', '10%'],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-[20%] -right-[10%] w-[100%] h-[100%] opacity-25 blur-[140px]"
        style={{
          background: 'radial-gradient(circle at center, #D4AF37 0%, transparent 70%)',
        }}
      />

      {/* Central Elegant Light Streak */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          rotate: [35, 40, 35],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[20%] blur-[100px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
          transform: 'translate(-50%, -50%) rotate(35deg)',
        }}
      />

      {/* Soft Floating Highlights */}
      <motion.div
        animate={{
          y: ['0%', '20%', '0%'],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] right-[20%] w-96 h-96 rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, #701A75 0%, transparent 70%)' }}
      />

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none" />
    </div>
  );
};
