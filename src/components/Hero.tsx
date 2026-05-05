import { ChevronsDown } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero = () => (
  <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-primary/5 to-background-dark/80 z-10" />
    </div>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-20 text-center px-4 max-w-4xl mx-auto"
    >
      <span className="text-luxury-gold font-medium tracking-[0.3em] uppercase mb-4 block">Event Management Specialists</span>
      <h1 className="font-serif text-6xl md:text-8xl text-white mb-6 leading-tight">Mah'Aura Events</h1>
      <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light italic">Where Energy Meets Elegance</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="https://wa.me/919391116204?text=Hello%20Mah'Aura%20Events,%20I'm%20interested%20in%20planning%20an%20event%20and%20would%20like%20to%20get%20a%20quote."
          target="_blank"
          rel="noopener noreferrer"
          className="gold-gradient text-background-dark px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all text-center"
        >
          Plan Your Event
        </a>
        <a href="#gallery" className="glass text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all text-center">
          View Our Work
        </a>
      </div>
    </motion.div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-luxury-gold">
      <ChevronsDown className="w-8 h-8" />
    </div>
  </section>
);
