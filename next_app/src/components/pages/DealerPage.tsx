"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Package, HeadphonesIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function DealerPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    experience: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Application Submitted!',
      description: 'Thank you for your interest. Our team will contact you within 24 hours.',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      location: '',
      experience: '',
      message: ''
    });

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
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
              Become a Dealer
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-light-grey max-w-4xl mx-auto leading-relaxed">
              Join our network of successful dealers and distributors across India
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-deep-black mb-6">
              Partnership Benefits
            </h2>
            <p className="font-paragraph text-xl text-dark-grey max-w-3xl mx-auto">
              Why choose Paper Paints as your manufacturing partner
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Competitive Margins',
                desc: 'Attractive profit margins and volume-based incentives'
              },
              {
                icon: Package,
                title: 'Wide Product Range',
                desc: 'Comprehensive portfolio of premium coating solutions'
              },
              {
                icon: HeadphonesIcon,
                title: 'Dedicated Support',
                desc: 'Technical assistance and marketing support'
              },
              {
                icon: CheckCircle,
                title: 'Quality Assurance',
                desc: 'ISO-certified products with consistent quality'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-off-white p-8 rounded-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-red/10 rounded-lg mb-6">
                  <benefit.icon className="w-10 h-10 text-accent-red" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-black mb-3">
                  {benefit.title}
                </h3>
                <p className="font-paragraph text-base text-dark-grey">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="w-full bg-off-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-deep-black mb-6">
                Dealer Requirements
              </h2>
              <p className="font-paragraph text-lg text-dark-grey mb-8 leading-relaxed">
                We're looking for committed partners who share our vision of quality and excellence. Here's what we expect from our dealer network:
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Business Experience',
                    desc: 'Minimum 2 years in construction materials or paint industry'
                  },
                  {
                    title: 'Infrastructure',
                    desc: 'Adequate storage space and display area for products'
                  },
                  {
                    title: 'Market Reach',
                    desc: 'Established network in your local market or region'
                  },
                  {
                    title: 'Financial Capability',
                    desc: 'Ability to maintain adequate inventory levels'
                  }
                ].map((req, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle className="h-6 w-6 text-accent-red flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading text-xl font-bold text-deep-black mb-2">
                        {req.title}
                      </h3>
                      <p className="font-paragraph text-base text-dark-grey">
                        {req.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-12 rounded-lg shadow-lg"
            >
              <h3 className="font-heading text-3xl font-bold text-deep-black mb-6">
                Apply Now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="h-12 font-paragraph"
                    placeholder="Enter your full name"
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
                    className="h-12 font-paragraph"
                    placeholder="your.email@example.com"
                  />
                </div>

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
                    className="h-12 font-paragraph"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block font-paragraph text-sm font-medium text-deep-black mb-2">
                    Company Name *
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="h-12 font-paragraph"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block font-paragraph text-sm font-medium text-deep-black mb-2">
                    Location *
                  </label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="h-12 font-paragraph"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block font-paragraph text-sm font-medium text-deep-black mb-2">
                    Years of Experience *
                  </label>
                  <Input
                    id="experience"
                    name="experience"
                    type="text"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="h-12 font-paragraph"
                    placeholder="e.g., 5 years"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-paragraph text-sm font-medium text-deep-black mb-2">
                    Additional Information
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-32 font-paragraph"
                    placeholder="Tell us about your business and why you want to partner with us..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-red text-white hover:bg-accent-red/90 h-14 text-lg rounded-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-deep-black mb-6">
              Application Process
            </h2>
            <p className="font-paragraph text-xl text-dark-grey max-w-3xl mx-auto">
              Simple steps to become a Paper Paints dealer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Submit Application',
                desc: 'Fill out the dealer application form with your details'
              },
              {
                step: '02',
                title: 'Initial Review',
                desc: 'Our team reviews your application within 24-48 hours'
              },
              {
                step: '03',
                title: 'Discussion',
                desc: 'We schedule a call to discuss partnership terms'
              },
              {
                step: '04',
                title: 'Onboarding',
                desc: 'Complete documentation and start your partnership'
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-red text-white rounded-lg mb-6 font-heading text-2xl font-bold">
                  {process.step}
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-black mb-3">
                  {process.title}
                </h3>
                <p className="font-paragraph text-base text-dark-grey">
                  {process.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
