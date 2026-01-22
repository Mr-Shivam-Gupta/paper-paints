// HPI 1.7-G
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Award, Users, Truck, ChevronRight, Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- CANONICAL DATA SOURCES ---
// Preserving original data structures exactly as found in the source code.

const TRUST_INDICATORS = [
  { icon: Shield, title: '25+ Years', desc: 'Industry Experience' },
  { icon: Award, title: 'ISO Certified', desc: 'Quality Standards' },
  { icon: Users, title: '5000+', desc: 'Satisfied Clients' },
  { icon: Truck, title: 'Pan India', desc: 'Distribution Network' }
];

const PRODUCTS = [
  {
    title: 'Premium Emulsion Paints',
    desc: 'High-quality interior and exterior paints with superior coverage',
    category: 'Paints',
    id: 'emulsion'
  },
  {
    title: 'White Cement',
    desc: 'Ultra-fine white cement for decorative and finishing applications',
    category: 'Cement',
    id: 'cement'
  },
  {
    title: 'Wall Putty',
    desc: 'Smooth finish wall putty for perfect surface preparation',
    category: 'Putty',
    id: 'putty'
  },
  {
    title: 'Universal Primer',
    desc: 'Multi-surface primer for enhanced paint adhesion',
    category: 'Primers',
    id: 'primer'
  },
  {
    title: 'Construction Coatings',
    desc: 'Industrial-grade protective coatings for structures',
    category: 'Coatings',
    id: 'coatings'
  },
  {
    title: 'Specialty Solutions',
    desc: 'Custom formulations for specific project requirements',
    category: 'Solutions',
    id: 'specialty'
  }
];

const FEATURES = [
  {
    title: 'Superior Quality',
    desc: 'Rigorous quality control at every stage of production ensures consistent excellence in every batch.'
  },
  {
    title: 'Technical Expertise',
    desc: 'In-house R&D team developing innovative formulations that push the boundaries of durability.'
  },
  {
    title: 'Reliable Supply',
    desc: 'Consistent availability through our extensive pan-India distribution network.'
  },
  {
    title: 'Customer Support',
    desc: 'Dedicated technical assistance and after-sales service to ensure project success.'
  }
];

// --- UTILITY COMPONENTS ---

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-grey/20 to-transparent my-0" />
);

const AnimatedText = ({ text, className = "" }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
};

// --- MAIN COMPONENT ---

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="bg-off-white min-h-screen selection:bg-accent-red selection:text-white overflow-x-clip font-paragraph">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[100vh] min-h-[800px] bg-deep-black overflow-hidden flex items-center justify-center">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, 200]) }}
        >
          <Image 
            src="https://static.wixstatic.com/media/b4dcdb_01c91d57c459488fbae2e0a11e7f733a~mv2.png?originWidth=1920&originHeight=1024" 
            alt="Industrial paint manufacturing facility"
            className="w-full h-full object-cover opacity-50 scale-105"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/60 via-deep-black/20 to-deep-black/90" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center h-full">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-12 bg-accent-red" />
              <span className="text-accent-red font-medium tracking-widest uppercase text-sm">Est. 1998</span>
            </motion.div>

            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-8">
              <span className="block overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="block"
                >
                  Premium
                </motion.span>
              </span>
              <span className="block overflow-hidden text-light-grey/90">
                <motion.span 
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                  className="block"
                >
                  Coating Solutions
                </motion.span>
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-paragraph text-xl md:text-2xl text-light-grey/80 max-w-2xl mb-12 leading-relaxed border-l-2 border-accent-red pl-6"
            >
              Industrial-grade paints, cement, and coating solutions engineered for durability and excellence. Trusted by professionals across the construction industry.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link to="/products">
                <Button className="bg-accent-red text-white hover:bg-accent-red/90 h-16 px-10 text-lg rounded-none border border-accent-red transition-all duration-300 hover:scale-105">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dealer">
                <Button variant="outline" className="bg-transparent border border-white/30 text-white hover:bg-white hover:text-deep-black h-16 px-10 text-lg rounded-none backdrop-blur-sm transition-all duration-300">
                  Become a Dealer
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* --- TRUST INDICATORS (Architectural Strip) --- */}
      <section className="relative z-20 bg-white border-b border-dark-grey/10">
        <div className="w-full max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-dark-grey/10">
            {TRUST_INDICATORS.map((item, index) => (
              <div key={index} className="group relative p-10 lg:p-12 hover:bg-off-white transition-colors duration-500">
                <div className="flex flex-col items-start gap-4">
                  <div className="p-3 bg-accent-red/5 rounded-none group-hover:bg-accent-red group-hover:text-white transition-colors duration-300 text-accent-red">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl font-bold text-deep-black mb-1 group-hover:translate-x-2 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-dark-grey/70 text-sm uppercase tracking-wider">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCT SHOWCASE (Magazine Grid) --- */}
      <section id="products" className="py-32 bg-off-white overflow-hidden">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-accent-red rounded-full" />
                <span className="text-accent-red font-medium tracking-widest uppercase text-sm">Our Collection</span>
              </div>
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-deep-black leading-none">
                <AnimatedText text="Engineered for" /> <br />
                <span className="text-dark-grey/40"><AnimatedText text="Perfection" /></span>
              </h2>
            </div>
            <div className="flex gap-4">
              <Link to="/products">
                <Button variant="ghost" className="text-deep-black hover:text-accent-red hover:bg-transparent text-lg group">
                  View Full Catalog 
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Sticky Narrative) --- */}
      <section className="relative bg-deep-black text-white py-32">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            {/* Sticky Content Side */}
            <div className="relative h-fit lg:sticky lg:top-32 self-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-px bg-accent-red" />
                  <span className="text-accent-red font-medium tracking-widest uppercase text-sm">The Paper Paints Advantage</span>
                </div>
                <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
                  Why Industry Leaders <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Choose Us</span>
                </h2>
                <p className="font-paragraph text-xl text-light-grey/60 mb-12 max-w-lg leading-relaxed">
                  We combine decades of manufacturing expertise with cutting-edge technology to deliver coating solutions that exceed industry standards.
                </p>
                
                <div className="hidden lg:block">
                  <Link to="/about">
                    <Button className="bg-white text-deep-black hover:bg-light-grey h-14 px-8 text-lg rounded-none transition-colors">
                      Discover Our Story
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Scrolling Features Side */}
            <div className="flex flex-col gap-24">
              {FEATURES.map((feature, index) => (
                <FeatureItem key={index} feature={feature} index={index} />
              ))}
            </div>

            <div className="lg:hidden mt-12">
              <Link to="/about">
                <Button className="bg-white text-deep-black hover:bg-light-grey h-14 px-8 text-lg rounded-none w-full">
                  Discover Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISUAL BREATHER / PARALLAX BREAK --- */}
      <section className="relative h-[80vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/b4dcdb_e6ec6063d0384eb59a73dd91ee6f34b2~mv2.png?originWidth=1920&originHeight=832" 
            alt="Abstract texture"
            className="w-full h-full object-cover grayscale contrast-125"
            width={1920}
          />
          <div className="absolute inset-0 bg-accent-red/80 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-6xl md:text-8xl font-bold text-white mb-6">
              Built to Last.
            </h2>
            <p className="font-paragraph text-xl text-white/90 max-w-2xl mx-auto">
              Every drop engineered for maximum durability and coverage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dark-grey/20 to-transparent" />
        
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="inline-block py-1 px-3 border border-accent-red/30 text-accent-red text-xs font-bold tracking-widest uppercase mb-8 rounded-full">
              Partnership Opportunities
            </span>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-deep-black mb-8">
              Ready to Transform <br /> Your Business?
            </h2>
            <p className="font-paragraph text-xl text-dark-grey/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join our network of dealers and distributors. Access premium products, competitive margins, and comprehensive support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/dealer">
                <Button className="bg-deep-black text-white hover:bg-accent-red h-16 px-12 text-lg rounded-none transition-colors duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent-red/20">
                  Become a Dealer
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-2 border-deep-black text-deep-black hover:bg-deep-black hover:text-white h-16 px-12 text-lg rounded-none transition-all duration-300">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent-red/5 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-dark-grey/5 rounded-full blur-3xl -z-0" />
      </section>

      <Footer />
    </div>
  );
}

// --- SUBCOMPONENTS ---

const ProductCard = ({ product, index }: { product: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white border border-dark-grey/5 hover:border-accent-red/20 transition-colors duration-500 h-full flex flex-col"
    >
      <div className="relative h-80 overflow-hidden">
        <Image 
          src="https://static.wixstatic.com/media/b4dcdb_5152614a5d22441c8cce1eee4496ad80~mv2.png?originWidth=576&originHeight=448" 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={600}
        />
        <div className="absolute inset-0 bg-deep-black/0 group-hover:bg-deep-black/20 transition-colors duration-500" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-deep-black">
          {product.category}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-heading text-3xl font-bold text-deep-black mb-3 group-hover:text-accent-red transition-colors duration-300">
          {product.title}
        </h3>
        <p className="font-paragraph text-dark-grey/70 mb-8 flex-grow leading-relaxed">
          {product.desc}
        </p>
        
        <Link to="/products" className="inline-flex items-center text-deep-black font-medium group/link mt-auto">
          <span className="relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover/link:-translate-y-full">Learn More</span>
            <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover/link:translate-y-0 text-accent-red">Learn More</span>
          </span>
          <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 text-accent-red" />
        </Link>
      </div>
    </motion.div>
  );
};

const FeatureItem = ({ feature, index }: { feature: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex gap-6 group"
    >
      <div className="flex-shrink-0 mt-2">
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent-red group-hover:border-accent-red transition-all duration-300">
          <Check className="w-5 h-5 text-white" />
        </div>
        <div className="w-px h-full bg-white/10 mx-auto mt-4 group-last:hidden" />
      </div>
      <div className="pb-12">
        <h3 className="font-heading text-3xl font-bold text-white mb-3 group-hover:text-accent-red transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="font-paragraph text-lg text-light-grey/60 leading-relaxed max-w-md">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
};