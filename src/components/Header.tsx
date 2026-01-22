import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Applications', path: '/applications' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Dealer', path: '/dealer' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-light-grey">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-deep-black">
              Paper<span className="text-accent-red">Paints</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-base font-medium transition-colors relative ${
                  isActive(link.path)
                    ? 'text-accent-red'
                    : 'text-dark-grey hover:text-accent-red'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-red"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* WhatsApp Button - Desktop */}
          <div className="hidden lg:block">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-accent-red text-white hover:bg-accent-red/90 h-12 px-6 rounded-lg">
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-deep-black hover:text-accent-red transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-light-grey overflow-hidden"
          >
            <nav className="px-8 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-paragraph text-lg font-medium py-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-accent-red'
                      : 'text-dark-grey hover:text-accent-red'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="block pt-4"
              >
                <Button className="w-full bg-accent-red text-white hover:bg-accent-red/90 h-12 rounded-lg">
                  <Phone className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
