"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getProducts } from "@/lib/api-client";
import type { Products } from "@/entities";

export default function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const loadProducts = async () => {
    try {
      const result = await getProducts();
      setProducts(result.items);
      setFilteredProducts(result.items);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

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
              Our Products
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-light-grey max-w-4xl mx-auto leading-relaxed">
              Comprehensive range of premium coating solutions for every construction need
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full bg-white py-16 border-b border-light-grey">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="max-w-4xl mx-auto bg-off-white border border-light-grey/60 rounded-2xl px-6 md:px-10 py-8 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="h-5 w-5 text-accent-red" />
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-deep-black">
                  Find the right product
                </h2>
                <p className="font-paragraph text-sm md:text-base text-dark-grey/80">
                  Search by name or description and quickly filter by product category.
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-grey" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 font-paragraph bg-white"
                />
              </div>

              {/* Category Filter */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category || '')}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      className={`h-10 px-5 rounded-full font-paragraph text-sm ${selectedCategory === category
                        ? 'bg-accent-red text-white hover:bg-accent-red/90 border-accent-red'
                        : 'border-dark-grey/40 text-dark-grey hover:bg-white'
                        }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full bg-off-white py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredProducts.length > 0 ? (
              <motion.div
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.mainImage || 'https://static.wixstatic.com/media/b4dcdb_9099c0b70aa948589ea41676728b6bdf~mv2.png?originWidth=448&originHeight=320'}
                        alt={product.productName || 'Product'}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        width={500}
                      />
                    </div>
                    <div className="p-6">
                      {product.category && (
                        <span className="inline-block px-4 py-1 bg-accent-red/10 text-accent-red text-sm font-paragraph font-medium rounded mb-4">
                          {product.category}
                        </span>
                      )}
                      <h3 className="font-heading text-2xl font-bold text-deep-black mb-3">
                        {product.productName}
                      </h3>
                      <p className="font-paragraph text-base text-dark-grey mb-6 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                      <Link
                        href={`/products/${product._id}`}
                        className="inline-flex items-center text-accent-red font-paragraph font-medium hover:underline"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-xl text-dark-grey">
                  No products found matching your criteria.
                </p>
              </div>
            )}
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
              Need Technical Assistance?
            </h2>
            <p className="font-paragraph text-xl text-light-grey mb-10 max-w-3xl mx-auto">
              Our technical team is ready to help you choose the right products for your project
            </p>
            <Link href="/contact">
              <Button className="bg-accent-red text-white hover:bg-accent-red/90 h-14 px-8 text-lg rounded-lg">
                Contact Our Team
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
