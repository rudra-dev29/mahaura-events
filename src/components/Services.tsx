import { Cake, PartyPopper, Palette, Music, Utensils, Camera } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  { 
    title: "Birthday Parties", 
    icon: Cake, 
    img: "/assets/birthday.png",
    desc: "From whimsical first birthdays to sophisticated milestones, we create themed wonderlands."
  },
  { 
    title: "Private Parties", 
    icon: PartyPopper, 
    img: "/assets/private.png",
    desc: "Exclusive house warmings, anniversaries, and cocktail nights with an elegant flair."
  },
  { 
    title: "Theme-Based Décor", 
    icon: Palette, 
    img: "/assets/theme.png",
    desc: "Custom stage designs and immersive environments using cutting-edge aesthetics."
  },
  { 
    title: "Entertainment", 
    icon: Music, 
    img: "/assets/entertainment.png",
    desc: "Live bands, DJs, and bespoke performances to keep the energy high all night long."
  },
  { 
    title: "Catering", 
    icon: Utensils, 
    img: "/assets/catering.png",
    desc: "Curated menus from world-class chefs that delight every palate and preference."
  },
  { 
    title: "Photography", 
    icon: Camera, 
    img: "/assets/photography.png",
    desc: "Cinematic storytelling through lenses that capture the soul of your celebration."
  }
];

export const Services = () => (
  <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
      <div className="space-y-4">
        <h2 className="text-luxury-gold uppercase tracking-widest text-sm font-bold">What We Do</h2>
        <h3 className="font-serif text-4xl md:text-5xl">Bespoke Event Services</h3>
      </div>
      <p className="text-slate-400 max-w-md">Comprehensive solutions designed to handle every detail while you focus on celebrating.</p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((s, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group relative h-[450px] overflow-hidden rounded-lg bg-background-dark shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        >
          <img 
            src={s.img} 
            alt={s.title} 
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 transition-all duration-500">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
              <s.icon className="text-luxury-gold w-6 h-6" />
            </div>
            <h4 className="font-serif text-3xl text-white mb-2">{s.title}</h4>
            <p className="max-h-0 overflow-hidden text-slate-300 text-sm leading-relaxed transition-all duration-500 group-hover:max-h-24 group-hover:mb-4">
              {s.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);
