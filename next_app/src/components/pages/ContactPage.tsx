"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Submission failed');
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will respond within 24 hours.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      toast({
        title: 'Submission Failed',
        description: (err as Error)?.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-deep-black py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="font-heading text-6xl md:text-7xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-light-grey max-w-4xl mx-auto leading-relaxed">
              Get in touch with our team for inquiries, support, or partnership opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-deep-black mb-8">
                Get In Touch
              </h2>
              <p className="font-paragraph text-lg text-dark-grey mb-12 leading-relaxed">
                Have questions about our products or services? Our team is here to help you find the right coating solutions for your project.
              </p>

              <div className="space-y-8">
                {/* Office Address */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-accent-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-deep-black mb-2">
                      Head Office
                    </h3>
                    <p className="font-paragraph text-base text-dark-grey leading-relaxed">
                      Industrial Area, Sector 45<br />
                      New Delhi, India - 110001
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-accent-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-deep-black mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+919876543210"
                      className="font-paragraph text-base text-dark-grey hover:text-accent-red transition-colors"
                    >
                      +91 98765 43210
                    </a>
                    <br />
                    <a
                      href="tel:+911123456789"
                      className="font-paragraph text-base text-dark-grey hover:text-accent-red transition-colors"
                    >
                      +91 11 2345 6789
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-accent-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-deep-black mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:info@paperpaints.com"
                      className="font-paragraph text-base text-dark-grey hover:text-accent-red transition-colors"
                    >
                      info@paperpaints.com
                    </a>
                    <br />
                    <a
                      href="mailto:sales@paperpaints.com"
                      className="font-paragraph text-base text-dark-grey hover:text-accent-red transition-colors"
                    >
                      sales@paperpaints.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-accent-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-deep-black mb-2">
                      Business Hours
                    </h3>
                    <p className="font-paragraph text-base text-dark-grey">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="mt-12">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-accent-red text-white hover:bg-accent-red/90 h-14 px-8 text-lg rounded-lg w-full sm:w-auto">
                    <Phone className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-off-white p-8 md:p-12 rounded-lg"
            >
              <h3 className="font-heading text-3xl font-bold text-deep-black mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-paragraph text-sm font-medium text-deep-black mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 font-paragraph bg-white"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-paragraph text-sm font-medium text-deep-black mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 font-paragraph bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block font-paragraph text-sm font-medium text-deep-black mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12 font-paragraph bg-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-paragraph text-sm font-medium text-deep-black mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="h-12 font-paragraph bg-white"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-paragraph text-sm font-medium text-deep-black mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-40 font-paragraph bg-white"
                    placeholder="Tell us about your inquiry or project requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-red text-white hover:bg-accent-red/90 h-14 text-lg rounded-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full bg-off-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-deep-black mb-6">
              Visit Our Office
            </h2>
            <p className="font-paragraph text-xl text-dark-grey max-w-3xl mx-auto">
              We welcome you to visit our manufacturing facility and showroom
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-96 bg-light-grey rounded-lg overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890123!2d77.1234567890123!3d28.6234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzI0LjQiTiA3N8KwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Paper Paints Office Location"
            ></iframe>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
