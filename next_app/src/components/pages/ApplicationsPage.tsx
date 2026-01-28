"use client";
import { useEffect, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, Factory, Paintbrush, Phone, X } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getApplications } from "@/lib/api-client";
import type { Applications } from "@/entities";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Applications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [careerMessage, setCareerMessage] = useState<string | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Applications | null>(null);
  const [applying, setApplying] = useState(false);

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

  const openApplyModal = (job: Applications) => {
    setSelectedJob(job);
    setApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setApplyModalOpen(false);
    setSelectedJob(null);
  };

  const handleJobApply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedJob) return;
    
    setApplying(true);
    const formData = new FormData(e.currentTarget);
    formData.append("jobId", selectedJob._id);
    formData.append("preferredRole", selectedJob.title || "");
    
    const resume = formData.get("resume") as File | null;
    if (!resume || !resume.name) {
      alert("Please attach your resume before submitting.");
      setApplying(false);
      return;
    }

    try {
      const res = await fetch("/api/career", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to submit application");
      }
      alert("Thank you for applying! Our team will contact you soon.");
      e.currentTarget.reset();
      closeApplyModal();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  const handleCareerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCareerMessage(null);
    const formData = new FormData(e.currentTarget);
    const resume = formData.get("resume") as File | null;
    if (!resume || !resume.name) {
      setCareerMessage("Please attach your resume before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/career", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to submit application");
      }
      setCareerMessage("Thank you for applying. Our team will contact you soon.");
      e.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setCareerMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
              Jobs &amp; Career
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-light-grey max-w-4xl mx-auto leading-relaxed">
              Explore career opportunities with Paper Paints and build a long-term future with us.
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

      {/* Career Opportunities */}
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
              Career Opportunities
            </h2>
            <p className="font-paragraph text-xl text-dark-grey max-w-3xl mx-auto">
              Current openings and roles available with Paper Paints
            </p>
          </motion.div>

          <div className="min-h-[600px]">
            {isLoading ? null : applications.length > 0 ? (
              <motion.div
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {applications.map((app, index) => (
                  <motion.div
                    key={app._id}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-xl overflow-hidden border border-dark-grey/10 hover:border-accent-red/30 hover:shadow-2xl transition-all duration-300 flex flex-col"
                  >
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          {app.category && (
                            <span className="inline-block px-3 py-1 bg-accent-red/10 text-accent-red text-xs font-paragraph font-semibold rounded-full mb-3">
                              {app.category}
                            </span>
                          )}
                          <h3 className="font-heading text-2xl font-bold text-deep-black mb-2">
                            {app.title}
                          </h3>
                          {app.salaryRange && (
                            <p className="font-paragraph text-sm text-accent-red font-medium">
                              {app.salaryRange}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <p className="font-paragraph text-sm text-dark-grey mb-4 leading-relaxed line-clamp-3 flex-grow">
                        {app.description}
                      </p>
                      
                      {app.keyBenefits && (
                        <div className="mb-4">
                          <h4 className="font-heading text-sm font-bold text-deep-black mb-2">
                            Key Benefits:
                          </h4>
                          <div className="space-y-1.5">
                            {app.keyBenefits.split('\n').filter(b => b.trim()).slice(0, 3).map((benefit, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-1 h-1 bg-accent-red rounded-full mt-2 shrink-0"></div>
                                <p className="font-paragraph text-xs text-dark-grey line-clamp-1">
                                  {benefit}
                                </p>
                              </div>
                            ))}
                            {app.keyBenefits.split('\n').filter(b => b.trim()).length > 3 && (
                              <p className="font-paragraph text-xs text-dark-grey/70 italic">
                                +{app.keyBenefits.split('\n').filter(b => b.trim()).length - 3} more benefits
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <Button
                        onClick={() => openApplyModal(app)}
                        className="w-full bg-accent-red text-white hover:bg-accent-red/90 h-11 rounded-lg font-medium mt-auto"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-xl text-dark-grey">
                  Job openings coming soon.
                </p>
              </div>
            )}
          </div>

          {/* Apply Modal */}
          <Dialog open={applyModalOpen} onOpenChange={(o) => !o && closeApplyModal()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleJobApply} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="md:col-span-1">
                  <Label>Full Name *</Label>
                  <Input
                    name="name"
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="md:col-span-1">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div className="md:col-span-1">
                  <Label>Phone Number *</Label>
                  <Input
                    name="phone"
                    required
                    placeholder="Your contact number"
                  />
                </div>
                <div className="md:col-span-1">
                  <Label>Experience (years)</Label>
                  <Input
                    name="experience"
                    placeholder="e.g. 3"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Resume (PDF / DOC) *</Label>
                  <Input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    className="text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Additional Information (optional)</Label>
                  <Textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us anything else we should know."
                  />
                </div>
                <DialogFooter className="md:col-span-2">
                  <Button type="button" variant="outline" onClick={closeApplyModal}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={applying} className="bg-accent-red hover:bg-accent-red/90">
                    {applying ? "Submitting..." : "Submit Application"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Static fallback for candidates who don't find a suitable role */}
          <div className="mt-16 max-w-3xl mx-auto bg-white rounded-lg border border-dark-grey/10 p-8 text-center">
            <h3 className="font-heading text-3xl font-bold text-deep-black mb-4">
              No suitable job found on this page?
            </h3>
            <p className="font-paragraph text-base text-dark-grey mb-6 leading-relaxed">
              Don&apos;t worry – we&apos;ll help you decide which job is better for you at Paper Paints.
              Send your resume to us on WhatsApp and our team will get back to you.
            </p>
            <a
              href="https://wa.me/917828179343?text=I%20would%20like%20to%20apply%20for%20a%20job%20at%20Paper%20Paints"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-accent-red text-white hover:bg-accent-red/90 h-12 px-8 inline-flex items-center gap-2 rounded-lg">
                <Phone className="w-4 h-4" />
                WhatsApp your resume
              </Button>
            </a>
          </div>

          {/* Career application form */}
          {/* <div className="mt-16 max-w-4xl mx-auto bg-white rounded-lg border border-dark-grey/10 p-8">
            <h3 className="font-heading text-3xl font-bold text-deep-black mb-4 text-center">
              Apply for a career at Paper Paints
            </h3>
            <p className="font-paragraph text-base text-dark-grey mb-6 text-center">
              Share your details and upload your resume. We&apos;ll match you to the best available role.
            </p>
            <form onSubmit={handleCareerSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  name="name"
                  required
                  className="w-full border border-light-grey rounded-md px-3 py-2 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-light-grey rounded-md px-3 py-2 text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  name="phone"
                  required
                  className="w-full border border-light-grey rounded-md px-3 py-2 text-sm"
                  placeholder="Your contact number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Role</label>
                <input
                  name="preferredRole"
                  className="w-full border border-light-grey rounded-md px-3 py-2 text-sm"
                  placeholder="e.g. Sales Executive"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experience (years)</label>
                <input
                  name="experience"
                  className="w-full border border-light-grey rounded-md px-3 py-2 text-sm"
                  placeholder="e.g. 3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Attach Resume (PDF / DOC)</label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Additional Information (optional)</label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full border border-light-grey rounded-md px-3 py-2 text-sm"
                  placeholder="Tell us anything else we should know."
                />
              </div>
              <div className="md:col-span-2 flex flex-col items-center gap-3 mt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-deep-black text-white hover:bg-accent-red h-11 px-10 rounded-lg"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
                {careerMessage && (
                  <p className="font-paragraph text-sm text-dark-grey text-center">
                    {careerMessage}
                  </p>
                )}
              </div>
            </form>
          </div> */}
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
              Need Help Choosing a Role?
            </h2>
            <p className="font-paragraph text-xl text-light-grey mb-10 max-w-3xl mx-auto">
              Our HR team can help you find the right opportunity at Paper Paints based on your experience and ambitions.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
