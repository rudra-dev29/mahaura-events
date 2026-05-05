import { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      // Find the current section
      for (let i = navItems.length - 1; i >= 0; i--) {
        const sectionId = navItems[i].href.substring(1);
        const element = document.getElementById(sectionId);
        
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="/assets/logo.png" 
            alt="Mah'Aura Events" 
            className="h-16 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a 
                key={item.name} 
                href={item.href} 
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive 
                  ? 'bg-luxury-gold/20 text-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                  : 'text-slate-300 hover:text-luxury-gold hover:bg-white/5'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        <div className="hidden md:block">
          <a 
            href="https://wa.me/919391116204?text=Hello%20Mah'Aura%20Events,%20I'm%20interested%20in%20planning%20an%20event%20and%20would%20like%20to%20get%20a%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="gold-gradient text-background-dark px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform inline-block"
          >
            Plan Your Event
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium p-3 rounded-xl transition-all ${
                      isActive 
                      ? 'bg-luxury-gold/20 text-luxury-gold' 
                      : 'text-slate-300 hover:text-luxury-gold'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <a href="#contact" onClick={() => setIsOpen(false)} className="gold-gradient text-background-dark px-6 py-3 rounded-full font-bold text-center mt-2">
                Plan Your Event
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
