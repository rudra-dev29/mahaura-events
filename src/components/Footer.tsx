import { Sparkles, Youtube, Instagram, Facebook, MessageCircle } from 'lucide-react';

const socialLinks = [
  // { icon: Youtube, href: "https://youtube.com/@mahauraevents", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/mahaura_events/", label: "Instagram" },
  // { icon: Facebook, href: "https://facebook.com/mahauraevents", label: "Facebook" },
  { icon: MessageCircle, href: "https://wa.me/919391116204?text=Hello%20Mah'Aura%20Events,%20I'm%20interested%20in%20planning%20an%20event%20and%20would%20like%20to%20get%20a%20quote.", label: "WhatsApp" }
];

export const Footer = () => (
  <footer className="bg-background-dark/80 backdrop-blur-md border-t border-white/5 pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-luxury-gold" />
            {/* <img 
              src="/assets/logo.png" 
              alt="Mah'Aura Events" 
              className="h-20 w-auto object-contain"
              referrerPolicy="no-referrer"
            /> */}
            <h2 className="font-serif text-2xl font-bold">Mah'Aura Events</h2>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed">
            Where Energy Meets Elegance. We are Hyderabad's premier luxury event startup, dedicated to crafting unforgettable memories through visionary design and flawless execution.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-luxury-gold uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            {[
              { name: 'Our Story', href: '#about' },
              { name: 'Event Gallery', href: '#gallery' },
              { name: 'Service List', href: '#services' },
              { name: 'Contact Us', href: '#contact' }
            ].map(link => (
              <li key={link.name}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-luxury-gold uppercase tracking-widest text-xs">Services</h4>
          <ul className="space-y-4 text-slate-400">
            {[
              { name: 'Birthday Parties', href: '#services' },
              { name: 'Theme Decor', href: '#services' },
              { name: 'Entertainment', href: '#services' },
              { name: 'Gourmet Catering', href: '#services' }
            ].map(link => (
              <li key={link.name}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-sm">© 2024 Mah'Aura Events. All rights reserved.</p>
        <div className="flex gap-8 text-sm text-slate-500">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);
