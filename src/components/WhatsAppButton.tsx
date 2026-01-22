import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-accent-red hover:bg-accent-red/90 text-white rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </motion.a>
  );
}
