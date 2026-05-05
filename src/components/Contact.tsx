import { Mail, Smartphone, MapPin, Compass, Youtube, Instagram, Facebook, MessageCircle } from 'lucide-react';

const contactItems = [
  { icon: Mail, title: "Email Us", val: "mahauraevents@gmail.com", href: "mailto:mahauraevents@gmail.com" },
  { icon: Smartphone, title: "Call Us", val: "+91 93911 16204", href: "tel:+919391116204" },
  { icon: MapPin, title: "Our Studio", val: "Alwal, Hyderabad, Telangana, India", href: null }
];

const socialLinks = [
  // { icon: Youtube, href: "https://youtube.com/@mahauraevents", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/mahaura_events/", label: "Instagram" },
  // { icon: Facebook, href: "https://facebook.com/mahauraevents", label: "Facebook" },
  { icon: MessageCircle, href: "https://wa.me/919391116204?text=Hello%20Mah'Aura%20Events,%20I'm%20interested%20in%20planning%20an%20event%20and%20would%20like%20to%20get%20a%20quote.", label: "WhatsApp" }
];

export const Contact = () => (
  <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-12">
        <div className="space-y-6">
          <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight">Get In Touch</h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-light">
            Whether it’s a grand wedding or an intimate birthday, our team is ready to bring your vision to life. Contact us for a bespoke consultation.
          </p>
        </div>
        <div className="space-y-8">
          {contactItems.map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl glass flex items-center justify-center border border-white/10">
                <item.icon className="text-luxury-gold w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{item.title}</h4>
                {item.href ? (
                  <a href={item.href} className="text-slate-400 text-lg hover:text-luxury-gold transition-colors">
                    {item.val}
                  </a>
                ) : (
                  <p className="text-slate-400 text-lg">{item.val}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 pt-4">
          {socialLinks.map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-all"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50" />
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 purple-glow h-[500px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3616.9300485825775!2d78.50057607493737!3d17.497552983408536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDI5JzUxLjIiTiA3OMKwMzAnMTEuMyJF!5e1!3m2!1sen!2sin!4v1773557413668!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale brightness-75 contrast-125"
          />
        </div>
      </div>
    </div>
  </section>
);
