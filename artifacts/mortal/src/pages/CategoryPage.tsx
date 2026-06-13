import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingCart, Menu, X, Search, MessageCircle } from 'lucide-react';
import { useRoute, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import ProductDetailModal from '@/components/ProductDetailModal';
import { products, categoryLabels, type Category } from '@/data/products';

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const MotionButton = motion.create(Button);

export default function CategoryPage() {
  const [, params] = useRoute('/category/:cat');
  const [, navigate] = useLocation();
  const category = (params?.cat ?? 'builds') as Category;

  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);

  const { totalItems } = useCart();
  const whatsappLink = 'https://wa.me/9647880545149';

  const categoryProducts = products.filter(p => p.category === category);
  const label = categoryLabels[category] ?? '';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const locked = cartOpen || mobileMenuOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen, mobileMenuOpen]);

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary/30 selection:text-primary dark">

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 py-4 transition-colors duration-300 ${isScrolled ? 'glass-effect box-glow' : 'bg-background/80 backdrop-blur-sm border-b border-white/5'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <img src="/images/mortal-logo.png" alt="Mortal" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
              <div className="flex flex-col">
                <span className="font-black text-xl md:text-2xl tracking-tight text-white leading-none">MORTAL</span>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase leading-none mt-1">Tech Store</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setCartOpen(true)}
                whileTap={{ scale: 0.88 }} whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative w-10 h-10 rounded-full hover:bg-white/8 hover:text-primary flex items-center justify-center text-white transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.88 }} whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-10 h-10 rounded-full hover:bg-white/8 flex items-center justify-center text-white transition-colors"
                onClick={() => setMobileMenu(true)}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setMobileMenu(false); navigate('/'); }}>
                <img src="/images/mortal-logo.png" alt="Mortal" className="w-8 h-8" />
                <span className="font-black text-xl text-white">MORTAL</span>
              </div>
              <MotionButton variant="ghost" size="icon" whileTap={{ scale: 0.88, rotate: 90 }}
                transition={{ duration: 0.25 }} onClick={() => setMobileMenu(false)}>
                <X className="w-6 h-6" />
              </MotionButton>
            </div>
            <div className="p-4">
              <div className="relative w-full mb-6">
                <input type="search" placeholder="بحث..." className="w-full bg-secondary border border-white/10 h-12 rounded-lg pl-10 pr-4 text-white" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
              <nav className="flex flex-col gap-3 text-lg font-bold">
                <button
                  onClick={() => { setMobileMenu(false); navigate('/'); }}
                  className="p-3 hover:bg-white/5 rounded-lg flex justify-between items-center transition-colors w-full text-right text-white">
                  الرئيسية <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </button>
                {(['builds', 'laptops', 'monitors', 'accessories'] as Category[]).map(cat => (
                  <button key={cat} onClick={() => { setMobileMenu(false); navigate(`/category/${cat}`); }}
                    className={`p-3 ${cat === category ? 'bg-white/5 text-primary' : 'hover:bg-white/5 text-white'} rounded-lg flex justify-between items-center transition-colors w-full text-right`}>
                    {categoryLabels[cat]} <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </nav>
              <MotionButton onClick={() => window.open(whatsappLink, '_blank')}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg">
                <MessageCircle className="w-5 h-5 ml-2" /> تواصل معنا
              </MotionButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="relative py-14 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.button
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-bold"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs mb-4">
              تسوق حسب الفئة
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">{label}</h1>
            <p className="text-muted-foreground mt-2 font-medium">{categoryProducts.length} منتج متاح</p>
          </motion.div>
        </div>
      </div>

      {/* Products Grid — 2 columns */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {categoryProducts.map(product => (
              <motion.div
                key={product.id}
                variants={cardVariant}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onClick={() => setSelectedProduct(product)}
                className="bg-white/5 border border-white/10 hover:border-primary/40 rounded-2xl overflow-hidden flex flex-col group transition-colors duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-black/30">
                  {product.badge && (
                    <Badge className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground font-bold rounded-md px-2 py-0.5 text-xs">
                      {product.badge}
                    </Badge>
                  )}
                  <img
                    src={product.image}
                    alt={product.nameAr}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white font-bold text-sm bg-primary/80 px-4 py-1.5 rounded-full">
                      عرض التفاصيل
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div>
                    <h3 className="font-black text-white text-lg leading-snug mb-1">{product.nameAr}</h3>
                    <p className="text-xs text-muted-foreground font-mono leading-relaxed" dir="ltr">
                      {product.specs}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    <span className="text-2xl font-black text-primary" dir="ltr">
                      {product.priceLabel}
                    </span>
                    <span className="text-xs text-primary border border-primary/30 px-3 py-1 rounded-full font-bold">
                      عرض التفاصيل
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <p className="text-xl font-bold">لا توجد منتجات في هذه الفئة حالياً</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 py-8 border-t border-white/10 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/images/mortal-logo.png" alt="Mortal" className="w-7 h-7" />
            <span className="font-black text-white text-base">MORTAL Tech Store</span>
          </div>
          <p>© {new Date().getFullYear()} Mortal Tech Store. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
