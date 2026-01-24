import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-deep-black text-white">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-3xl font-bold mb-6">
              Paper<span className="text-accent-red">Paints</span>
            </h3>
            <p className="font-paragraph text-base text-light-grey mb-6 leading-relaxed">
              Premium coating solutions for the construction industry. Trusted by professionals for over 25 years.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-grey hover:bg-accent-red rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-grey hover:bg-accent-red rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-grey hover:bg-accent-red rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Products', path: '/products' },
                { name: 'Applications', path: '/applications' }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="font-paragraph text-base text-light-grey hover:text-accent-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-xl font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { name: 'Gallery', path: '/gallery' },
                { name: 'Become a Dealer', path: '/dealer' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Technical Support', path: '/contact' }
              ].map((link, index) => (
                <li key={`service-${index}`}>
                  <Link
                    href={link.path}
                    className="font-paragraph text-base text-light-grey hover:text-accent-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent-red flex-shrink-0 mt-1" />
                <span className="font-paragraph text-base text-light-grey">
                  Industrial Area, Sector 45<br />
                  New Delhi, India - 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent-red flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="font-paragraph text-base text-light-grey hover:text-accent-red transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent-red flex-shrink-0" />
                <a
                  href="mailto:info@paperpaints.com"
                  className="font-paragraph text-base text-light-grey hover:text-accent-red transition-colors"
                >
                  info@paperpaints.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-grey">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-light-grey text-center md:text-left">
              © {new Date().getFullYear()} Paper Paints. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/contact"
                className="font-paragraph text-sm text-light-grey hover:text-accent-red transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="font-paragraph text-sm text-light-grey hover:text-accent-red transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
