import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { format } from 'date-fns';

export default function GalleryPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await BaseCrudService.getAll<Projects>('projects');
      setProjects(result.items);
    } catch (error) {
      console.error('Error loading projects:', error);
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
              Project Gallery
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-light-grey max-w-4xl mx-auto leading-relaxed">
              Explore our completed projects showcasing the quality and versatility of our coating solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full bg-off-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : projects.length > 0 ? (
              <motion.div
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image 
                        src={project.mainImage || 'https://static.wixstatic.com/media/b4dcdb_f4b276ce885e41328c5b6d10c598e5af~mv2.png?originWidth=448&originHeight=320'} 
                        alt={project.projectName || 'Project'}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        width={500}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-deep-black mb-4">
                        {project.projectName}
                      </h3>
                      
                      {project.location && (
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-accent-red flex-shrink-0" />
                          <p className="font-paragraph text-sm text-dark-grey">
                            {project.location}
                          </p>
                        </div>
                      )}
                      
                      {project.completionDate && (
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-4 w-4 text-accent-red flex-shrink-0" />
                          <p className="font-paragraph text-sm text-dark-grey">
                            {format(new Date(project.completionDate), 'MMMM yyyy')}
                          </p>
                        </div>
                      )}
                      
                      {project.workDescription && (
                        <p className="font-paragraph text-base text-dark-grey mb-4 line-clamp-3 leading-relaxed">
                          {project.workDescription}
                        </p>
                      )}
                      
                      {project.productsUsed && (
                        <div className="pt-4 border-t border-light-grey">
                          <p className="font-paragraph text-sm text-dark-grey">
                            <span className="font-medium text-deep-black">Products Used:</span> {project.productsUsed}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-xl text-dark-grey">
                  Project gallery coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
              Our Impact
            </h2>
            <p className="font-paragraph text-xl text-dark-grey max-w-3xl mx-auto">
              Numbers that speak to our commitment and reach
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '50M+', label: 'Sq. Ft. Covered' },
              { number: '100+', label: 'Cities Served' },
              { number: '98%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-off-white rounded-lg"
              >
                <h3 className="font-heading text-5xl md:text-6xl font-bold text-accent-red mb-3">
                  {stat.number}
                </h3>
                <p className="font-paragraph text-lg text-dark-grey">
                  {stat.label}
                </p>
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
              Start Your Next Project
            </h2>
            <p className="font-paragraph text-xl text-light-grey mb-10 max-w-3xl mx-auto">
              Let us help you achieve the same quality results for your construction project
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
