export const CTA = () => (
  <section className="py-20 px-6">
    <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-primary via-primary/80 to-luxury-gold/50 p-12 md:p-20 text-center">
      <div className="relative z-10 space-y-8">
        <h2 className="font-serif text-4xl md:text-6xl text-white">Let’s Create a Celebration to Remember</h2>
        <p className="text-xl text-slate-100 max-w-2xl mx-auto font-light">Bring your vision to life with Hyderabad's most creative event team.</p>
        <a 
          href="https://wa.me/919391116204?text=Hello%20Mah'Aura%20Events,%20I'm%20interested%20in%20planning%20an%20event%20and%20would%20like%20to%20get%20a%20quote."
          target="_blank"
          rel="noopener noreferrer"
          className="gold-gradient text-background-dark px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl inline-block"
        >
          Get a Quote Today
        </a>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-luxury-gold/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
    </div>
  </section>
);
