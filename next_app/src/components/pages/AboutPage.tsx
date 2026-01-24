"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Eye, Users } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getTeam } from "@/lib/api-client";
import type { TeamMembers } from "@/entities";

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMembers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const result = await getTeam();
      setTeam(result.items);
    } catch (error) {
      console.error('Error loading team:', error);
    } finally {
      setIsLoading(false);
    }
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
              About Paper Paints
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-light-grey max-w-4xl mx-auto leading-relaxed">
              Building trust through quality, innovation, and excellence in coating solutions for over 25 years
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-deep-black mb-6">
                Our Story
              </h2>
              <p className="font-paragraph text-lg text-dark-grey mb-6 leading-relaxed">
                Founded in 1998, Paper Paints began with a simple mission: to provide the construction industry with coating solutions that combine durability, quality, and innovation. What started as a small manufacturing unit has grown into one of India's trusted names in industrial paints and coatings.
              </p>
              <p className="font-paragraph text-lg text-dark-grey mb-6 leading-relaxed">
                Our state-of-the-art manufacturing facilities employ cutting-edge technology and rigorous quality control processes to ensure every product meets the highest standards. We've built our reputation on consistency, reliability, and a commitment to excellence that spans over two decades.
              </p>
              <p className="font-paragraph text-lg text-dark-grey leading-relaxed">
                Today, Paper Paints serves thousands of clients across India, from individual contractors to large construction firms, all trusting us to deliver products that stand the test of time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://static.wixstatic.com/media/b4dcdb_6e4f075d79b84cf59cb5eeb6ff3c648e~mv2.png?originWidth=640&originHeight=448"
                alt="Paper Paints manufacturing facility"
                className="w-full h-auto rounded-lg shadow-lg"
                width={700}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Core Values
            </h2>
            <p className="font-paragraph text-xl text-dark-grey max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Quality First',
                desc: 'Uncompromising standards in every product we manufacture'
              },
              {
                icon: Target,
                title: 'Innovation',
                desc: 'Continuous research and development for better solutions'
              },
              {
                icon: Eye,
                title: 'Transparency',
                desc: 'Honest communication and ethical business practices'
              },
              {
                icon: Users,
                title: 'Customer Focus',
                desc: 'Dedicated support and service for every client'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-red/10 rounded-lg mb-6">
                  <value.icon className="w-10 h-10 text-accent-red" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-black mb-3">
                  {value.title}
                </h3>
                <p className="font-paragraph text-base text-dark-grey">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Excellence */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <Image
                src="https://static.wixstatic.com/media/b4dcdb_d0227e02b2544086a3523ddd62c74beb~mv2.png?originWidth=640&originHeight=448"
                alt="Quality control laboratory"
                className="w-full h-auto rounded-lg shadow-lg"
                width={700}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-deep-black mb-6">
                Manufacturing Excellence
              </h2>
              <p className="font-paragraph text-lg text-dark-grey mb-8 leading-relaxed">
                Our ISO-certified manufacturing facilities are equipped with advanced machinery and operated by skilled professionals who ensure consistent quality in every batch.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Advanced Technology',
                    desc: 'State-of-the-art production equipment and automated systems'
                  },
                  {
                    title: 'Quality Assurance',
                    desc: 'Multi-stage testing and quality control protocols'
                  },
                  {
                    title: 'R&D Laboratory',
                    desc: 'In-house research facility for product development'
                  },
                  {
                    title: 'Sustainable Practices',
                    desc: 'Environmentally responsible manufacturing processes'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-2 h-2 bg-accent-red rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-deep-black mb-2">
                        {item.title}
                      </h3>
                      <p className="font-paragraph text-base text-dark-grey">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Our Leadership Team
            </h2>
            <p className="font-paragraph text-xl text-dark-grey max-w-3xl mx-auto">
              Meet the experts driving innovation and excellence at Paper Paints
            </p>
          </motion.div>

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : team.length > 0 ? (
              <motion.div
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {team.map((member, index) => (
                  <motion.div
                    key={member._id}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={member.profilePhoto || 'https://static.wixstatic.com/media/b4dcdb_06f62d90728e4f9c9ccb1654cdc1842e~mv2.png?originWidth=384&originHeight=384'}
                        alt={member.name || 'Team member'}
                        className="w-full h-full object-cover"
                        width={400}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-deep-black mb-2">
                        {member.name}
                      </h3>
                      <p className="font-paragraph text-base text-accent-red font-medium mb-3">
                        {member.jobTitle}
                      </p>
                      <p className="font-paragraph text-base text-dark-grey mb-4 leading-relaxed">
                        {member.bio}
                      </p>
                      {member.linkedInProfile && (
                        <a
                          href={member.linkedInProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-accent-red font-paragraph font-medium hover:underline"
                        >
                          View LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full bg-deep-black py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '25+', label: 'Years of Excellence' },
              { number: '5000+', label: 'Happy Clients' },
              { number: '50+', label: 'Product Range' },
              { number: '100%', label: 'Quality Assured' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="font-heading text-5xl md:text-6xl font-bold text-accent-red mb-3">
                  {stat.number}
                </h3>
                <p className="font-paragraph text-lg text-light-grey">
                  {stat.label}
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
