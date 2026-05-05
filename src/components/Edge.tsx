import { Wand2, CheckCircle2, Smile, Users } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  { icon: Wand2, title: "Creative Themes", desc: "Glassmorphism designs with soft glow effects tailored to your personality." },
  { icon: CheckCircle2, title: "Smooth Execution", desc: "Seamless management from the first concept to the final cleanup." },
  { icon: Smile, title: "Joyful Experiences", desc: "Curating emotional moments that resonate and last a lifetime." },
  { icon: Users, title: "Friendly Team", desc: "A passionate group of experts dedicated to your complete satisfaction." }
];

export const Edge = () => (
  <section className="py-24 bg-primary/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-serif text-4xl md:text-5xl">The Mah'Aura Edge</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Elevating standard celebrations into extraordinary memories with our signature touch.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-2xl border border-white/5 hover:border-luxury-gold/30 hover:shadow-[0_0_30px_rgba(91,46,168,0.2)] transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <f.icon className="text-luxury-gold w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-3">{f.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
