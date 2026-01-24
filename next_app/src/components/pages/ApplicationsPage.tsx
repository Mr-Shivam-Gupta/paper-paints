"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, Factory, Paintbrush } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getApplications } from "@/lib/api-client";
import type { Applications } from "@/entities";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Applications[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const result = await getApplications();
      setApplications(result.items);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const industryIcons = [Building2, Home, Factory, Paintbrush];

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
              Applications & Solutions
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-light-grey max-w-4xl mx-auto leading-relaxed">
              Versatile coating solutions tailored for diverse industry needs and project requirements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Overview */}
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
              Industries We Serve
            </h2>
            <p className="font-paragraph text-xl text-dark-grey max-w-3xl mx-auto">
              Trusted by professionals across multiple sectors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Building2,
                title: 'Commercial Construction',
                desc: 'Office buildings, retail spaces, and commercial complexes'
              },
              {
                icon: Home,
                title: 'Residential Projects',
                desc: 'Homes, apartments, and residential developments'
              },
              {
                icon: Factory,
                title: 'Industrial Facilities',
                desc: 'Warehouses, factories, and manufacturing units'
              },
              {
                icon: Paintbrush,
                title: 'Renovation & Repair',
                desc: 'Restoration and maintenance projects'
              }
            ].map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-off-white p-8 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-red/10 rounded-lg mb-6">
                    <Icon className="w-10 h-10 text-accent-red" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-deep-black mb-3">
                    {industry.title}
                  </h3>
                  <p className="font-paragraph text-base text-dark-grey">
                    {industry.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="w-full bg-off-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-deep-black mb-6">
              Application Solutions
            </h2>
            <p className="font-paragraph text-xl text-dark-grey max-w-3xl mx-auto">
              Specialized products designed for specific use cases
            </p>
          </motion.div>

          <div className="min-h-[600px]">
            {isLoading ? null : applications.length > 0 ? (
              <motion.div
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {applications.map((app, index) => (
                  <motion.div
                    key={app._id}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      <div className="md:col-span-2 aspect-square md:aspect-auto overflow-hidden">
                        <Image
                          src={app.mainImage || 'https://static.wixstatic.com/media/b4dcdb_fc11cc5629144fc5a4c230884bb6d839~mv2.png?originWidth=256&originHeight=256'}
                          alt={app.title || 'Application'}
                          className="w-full h-full object-cover"
                          width={300}
                        />
                      </div>
                      <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                        {app.category && (
                          <span className="inline-block w-fit px-4 py-1 bg-accent-red/10 text-accent-red text-sm font-paragraph font-medium rounded mb-4">
                            {app.category}
                          </span>
                        )}
                        <h3 className="font-heading text-3xl font-bold text-deep-black mb-4">
                          {app.title}
                        </h3>
                        <p className="font-paragraph text-base text-dark-grey mb-6 leading-relaxed">
                          {app.description}
                        </p>
                        {app.keyBenefits && (
                          <div className="space-y-2">
                            <h4 className="font-heading text-lg font-bold text-deep-black mb-3">
                              Key Benefits:
                            </h4>
                            {app.keyBenefits.split('\n').filter(b => b.trim()).map((benefit, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-accent-red rounded-full mt-2 flex-shrink-0"></div>
                                <p className="font-paragraph text-sm text-dark-grey">
                                  {benefit}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        {app.learnMoreUrl && (
                          <a
                            href={app.learnMoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-accent-red font-paragraph font-medium hover:underline mt-4"
                          >
                            Learn More
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-xl text-dark-grey">
                  Application solutions coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Use Cases */}
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
              Common Use Cases
            </h2>
            <p className="font-paragraph text-xl text-dark-grey max-w-3xl mx-auto">
              How our products solve real-world challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Interior Wall Finishing',
                desc: 'Premium emulsion paints and wall putty for smooth, durable interior surfaces with excellent coverage and finish.',
                image: 'https://static.wixstatic.com/media/b4dcdb_46856c6f2e32432f8947c6f532b54e54~mv2.png?originWidth=384&originHeight=256'
              },
              {
                title: 'Exterior Protection',
                desc: 'Weather-resistant coatings that protect building exteriors from harsh environmental conditions and UV damage.',
                image: 'https://static.wixstatic.com/media/b4dcdb_3484005d508944619810f68bfa85eacf~mv2.png?originWidth=384&originHeight=256'
              },
              {
                title: 'Decorative Applications',
                desc: 'White cement and specialty finishes for creating aesthetic decorative elements and architectural details.',
                image: 'https://static.wixstatic.com/media/b4dcdb_513284c7ffc94034b094f4818df6e361~mv2.png?originWidth=384&originHeight=256'
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-off-white rounded-lg overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                    width={400}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-deep-black mb-3">
                    {useCase.title}
                  </h3>
                  <p className="font-paragraph text-base text-dark-grey leading-relaxed">
                    {useCase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-deep-black py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">
              Need a Custom Solution?
            </h2>
            <p className="font-paragraph text-xl text-light-grey mb-10 max-w-3xl mx-auto">
              Our technical team can help design the perfect coating solution for your specific project requirements
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
