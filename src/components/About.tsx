import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const About = () => (
  <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
          <img 
            src="/assets/about-luxury.png" 
            alt="Luxury Event Decor" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 glass p-8 rounded-xl border border-luxury-gold/30 hidden md:block">
          <p className="text-luxury-gold font-serif text-4xl font-bold">100+</p>
          <p className="text-sm uppercase tracking-widest text-slate-400">Events Hosted</p>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <h2 className="text-luxury-gold uppercase tracking-widest text-sm font-bold">Our Story</h2>
          <h3 className="font-serif text-4xl md:text-5xl leading-snug">Hyderabad's Visionary Event Architects</h3>
        </div>
        <p className="text-lg text-slate-400 leading-relaxed">
          Founded by a team of young, spirited entrepreneurs in the heart of Hyderabad, Mah'Aura Events was born from a simple yet powerful philosophy: every celebration should be a cinematic masterpiece. 
        </p>
        <p className="text-lg text-slate-400 leading-relaxed">
          We combine high-octane energy with sophisticated elegance to create immersive environments that tell your unique story. From intimate gatherings to grand spectacles, we bring a fresh, modern perspective to luxury event management.
        </p>
        <div className="pt-4">
          <a href="#about" className="inline-flex items-center gap-2 text-luxury-gold font-bold hover:gap-4 transition-all">
            Learn more about our journey <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);
