"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, CheckCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getProductById } from "@/lib/api-client";
import type { Products } from "@/entities";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id!);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-8">
          <h2 className="font-heading text-4xl font-bold text-deep-black mb-4">
            Product Not Found
          </h2>
          <p className="font-paragraph text-lg text-dark-grey mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/products">
            <Button className="bg-accent-red text-white hover:bg-accent-red/90 h-12 px-6 rounded-lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const features = product.features?.split('\n').filter(f => f.trim()) || [];
  const specifications = product.technicalSpecifications?.split('\n').filter(s => s.trim()) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section className="w-full bg-white py-6 border-b border-light-grey">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="flex items-center gap-3 font-paragraph text-sm text-dark-grey">
            <Link href="/" className="hover:text-accent-red transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-accent-red transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-deep-black">{product.productName}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-32">
                <Image
                  src={product.mainImage || 'https://static.wixstatic.com/media/b4dcdb_4ac8672f981f47068be5aeee8e511a81~mv2.png?originWidth=640&originHeight=640'}
                  alt={product.productName || 'Product'}
                  className="w-full h-auto rounded-lg shadow-lg"
                  width={700}
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {product.category && (
                <span className="inline-block px-4 py-2 bg-accent-red/10 text-accent-red text-base font-paragraph font-medium rounded mb-6">
                  {product.category}
                </span>
              )}

              <h1 className="font-heading text-5xl md:text-6xl font-bold text-deep-black mb-6">
                {product.productName}
              </h1>

              <p className="font-paragraph text-lg text-dark-grey mb-8 leading-relaxed">
                {product.description}
              </p>

              {product.brochureUrl && (
                <a
                  href={product.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-12"
                >
                  <Button className="bg-accent-red text-white hover:bg-accent-red/90 h-14 px-8 text-lg rounded-lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download Brochure
                  </Button>
                </a>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-heading text-3xl font-bold text-deep-black mb-6">
                    Key Features
                  </h2>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="h-6 w-6 text-accent-red flex-shrink-0 mt-0.5" />
                        <p className="font-paragraph text-base text-dark-grey">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              {specifications.length > 0 && (
                <div>
                  <h2 className="font-heading text-3xl font-bold text-deep-black mb-6">
                    Technical Specifications
                  </h2>
                  <div className="bg-off-white p-8 rounded-lg">
                    <div className="space-y-4">
                      {specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="pb-4 border-b border-light-grey last:border-0 last:pb-0"
                        >
                          <p className="font-paragraph text-base text-dark-grey">
                            {spec}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
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
              Interested in This Product?
            </h2>
            <p className="font-paragraph text-xl text-light-grey mb-10 max-w-3xl mx-auto">
              Contact us for pricing, availability, and technical support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-accent-red text-white hover:bg-accent-red/90 h-14 px-8 text-lg rounded-lg">
                  Contact Us
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-deep-black h-14 px-8 text-lg rounded-lg">
                  View More Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
