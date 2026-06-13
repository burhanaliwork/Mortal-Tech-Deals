import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Search, Menu, X, ChevronLeft,
  Phone, Monitor, Cpu, Headset, Laptop,
  ShieldCheck, Truck, Zap, Clock, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import { products, categoryLabels, type Category } from '@/data/products';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay }
  })
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

const MotionButton = motion.create(Button);
const CATEGORIES: { key: Category; label: string; icon: React.ElementType; img: string }[] = [
  { key: 'builds',      label: 'تجميعات PC',  icon: Cpu,     img: '/images/mortal-builds-new.jpg'      },
  { key: 'laptops',     label: 'لابتوبات',     icon: Laptop,  img: '/images/mortal-laptops-new.jpg'     },
  { key: 'monitors',    label: 'شاشات',        icon: Monitor, img: '/images/mortal-monitors-new.jpg'    },
  { key: 'accessories', label: 'اكسسوارات',   icon: Headset, img: '/images/mortal-accessories-new.jpg' },
];

export default function Home() {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const [cartOpen, setCartOpen]         = useState(false);
  const [activeTab, setActiveTab]       = useState<Category>('builds');

  const { totalItems, totalPrice } = useCart();
  const whatsappLink = 'https://wa.me/9647880545149';
  const vp = { once: true, amount: 0.15 };

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

  const tabProducts = products.filter(p => p.category === activeTab);

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary/30 selection:text-primary dark">

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ── Navbar ───────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 py-4 transition-colors duration-300 ${isScrolled ? 'glass-effect box-glow' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <img src="/images/mortal-logo.png" alt="Mortal" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
              <div className="flex flex-col">
                <span className="font-black text-xl md:text-2xl tracking-tight text-white leading-none">MORTAL</span>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase leading-none mt-1">Tech Store</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {['الرئيسية', 'لابتوبات', 'تجميعات PC', 'شاشات', 'اكسسوارات'].map((item, i) => (
                <motion.a key={item} href="#" whileHover={{ color: 'hsl(var(--primary))' }}
                  className={`font-${i === 0 ? 'bold text-white' : 'semibold text-muted-foreground'} transition-colors`}>
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md ml-auto gap-4">
              <div className="relative w-full">
                <Input type="search" placeholder="ابحث عن منتج، ماركة، أو فئة..."
                  className="w-full bg-secondary/50 border-white/10 focus-visible:ring-primary pl-10 pr-4 h-10 rounded-full text-sm" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
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

              {/* Hamburger — always visible */}
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

      {/* ── Nav Menu ─────────────────────────────────────────── */}
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
              <div className="flex items-center gap-3">
                <img src="/images/mortal-logo.png" alt="Mortal" className="w-8 h-8" />
                <span className="font-black text-xl text-white">MORTAL</span>
              </div>
              <MotionButton variant="ghost" size="icon" whileTap={{ scale: 0.88, rotate: 90 }}
                transition={{ duration: 0.25 }} onClick={() => setMobileMenu(false)}>
                <X className="w-6 h-6" />
              </MotionButton>
            </div>
            <motion.div className="p-4" variants={staggerContainer} initial="hidden" animate="visible">
              <div className="relative w-full mb-6">
                <Input type="search" placeholder="بحث..." className="w-full bg-secondary border-white/10 h-12 rounded-lg pl-10" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
              <nav className="flex flex-col gap-3 text-lg font-bold">
                <motion.button
                  onClick={() => { setMobileMenu(false); window.open(whatsappLink, '_blank'); }}
                  variants={cardVariant} whileTap={{ scale: 0.97 }}
                  className="p-3 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg flex justify-between items-center transition-colors w-full text-right">
                  تواصل معنا <MessageCircle className="w-5 h-5" />
                </motion.button>
                {['الرئيسية', 'لابتوبات', 'تجميعات PC', 'شاشات', 'اكسسوارات'].map((item, i) => (
                  <motion.a key={item} href="#" variants={cardVariant} whileTap={{ scale: 0.97 }}
                    className={`p-3 ${i === 0 ? 'bg-white/5 text-primary' : 'hover:bg-white/5'} rounded-lg flex justify-between items-center transition-colors`}>
                    {item} <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                  </motion.a>
                ))}
              </nav>
              <MotionButton onClick={() => { setMobileMenu(false); setCartOpen(true); }}
                whileTap={{ scale: 0.95 }} variants={cardVariant}
                className="w-full mt-4 bg-secondary hover:bg-secondary/80 text-white font-bold h-12 text-lg border border-white/10 rounded-xl">
                <ShoppingCart className="w-5 h-5 ml-2" /> السلة ({totalItems})
              </MotionButton>
              <MotionButton onClick={() => window.open(whatsappLink, '_blank')}
                whileTap={{ scale: 0.95 }} variants={cardVariant}
                className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg">
                تواصل معنا عبر واتساب
              </MotionButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 text-center lg:text-right order-2 lg:order-1">
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm w-fit mx-auto lg:mx-0">
                <Zap className="w-4 h-4" /> الخيار الأول للاعبين في العراق
              </motion.div>

              <motion.h1 custom={0.12} variants={fadeUp} initial="hidden" animate="visible"
                className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                ارفع مستوى <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-blue-500">اللعب الخاص بك</span>
              </motion.h1>

              <motion.p custom={0.24} variants={fadeUp} initial="hidden" animate="visible"
                className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                أحدث القطع، أقوى التجميعات، وأفضل اللابتوبات. مورتال يوفر لك كل ما تحتاجه لتجربة أداء لا مثيل لها.
              </motion.p>

              <motion.div custom={0.36} variants={fadeUp} initial="hidden" animate="visible"
                className="flex mt-4 justify-center lg:justify-start">
                <MotionButton size="lg"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  whileTap={{ scale: 0.94 }} whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                  className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-full">
                  استكشف التجميعات
                </MotionButton>
              </motion.div>

              <motion.div custom={0.48} variants={fadeUp} initial="hidden" animate="visible"
                className="grid grid-cols-3 gap-4 pt-8 mt-4 border-t border-white/10">
                {[
                  { icon: Truck,       text: 'توصيل سريع لكل محافظات العراق' },
                  { icon: Cpu,         text: 'تجميع متقن' },
                  { icon: ShieldCheck, text: 'دعم بعد البيع' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground font-bold leading-snug">{text}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div custom={0.2} variants={fadeIn} initial="hidden" animate="visible"
              className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-square group">
                <img src="/images/mortal-hero.jpg" alt="Gaming setup" fetchPriority="high" loading="eager"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -left-6 glass-effect p-4 rounded-xl border border-white/10 shadow-2xl hidden md:flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div><p className="font-bold text-white">وكيل معتمد</p>
                  <p className="text-xs text-muted-foreground">لأشهر الماركات العالمية</p></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── All Products (tabbed) ─────────────────────────────── */}
      <section id="products" className="py-20 bg-secondary/20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={vp} className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs mb-4">
              جميع المنتجات
            </div>
            <h2 className="text-4xl font-black text-white">تسوق حسب الفئة</h2>
          </motion.div>

          {/* Tabs — circular images */}
          <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={vp}
            className="flex flex-wrap justify-center gap-8 mb-12">
            {CATEGORIES.map(({ key, img }) => (
              <motion.button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.07 }}
                transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                className="flex flex-col items-center gap-0 focus:outline-none group"
              >
                <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                  activeTab === key
                    ? 'border-primary shadow-[0_0_24px_rgba(0,200,255,0.5)]'
                    : 'border-white/10 group-hover:border-primary/60'
                }`}>
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {tabProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-20 bg-background border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={vp}
            className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Truck, color: 'blue', title: 'توصيل لكل العراق', desc: 'خدمة توصيل سريعة وآمنة إلى جميع محافظات العراق، مع توفر خدمة الدفع عند الاستلام.' },
              { icon: Clock, color: 'purple', title: 'دعم فني متواصل', desc: 'فريق من الخبراء جاهز للإجابة على استفساراتك ومساعدتك في اختيار أو حل مشاكل القطع الخاصة بك.' }
            ].map((feat) => (
              <motion.div key={feat.title} variants={cardVariant} whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/20 border border-white/5">
                <div className={`w-16 h-16 bg-${feat.color}-500/10 rounded-full flex items-center justify-center mb-6`}>
                  <feat.icon className={`w-8 h-8 text-${feat.color}-500`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WhatsApp CTA ─────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={vp}
            className="max-w-3xl mx-auto text-center glass-effect p-8 md:p-16 rounded-3xl border border-primary/30">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">تحتاج مساعدة في اختيار تجميعتك؟</h2>
            <p className="text-lg text-muted-foreground mb-8">
              تواصل مع فريق المبيعات المختص لدينا عبر الواتساب للحصول على استشارة مجانية.
            </p>
            <div className="flex justify-center">
              <MotionButton onClick={() => window.open(whatsappLink, '_blank')}
                whileTap={{ scale: 0.93 }} whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(34,197,94,0.5)' }}
                transition={{ type: 'spring', stiffness: 340, damping: 20 }}
                size="lg" className="h-14 px-10 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-full shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <MessageCircle className="w-5 h-5 ml-3" /> راسلنا على واتساب
              </MotionButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-secondary/50 pt-16 pb-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={vp}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <motion.div variants={cardVariant}>
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/mortal-logo.png" alt="Mortal" className="w-10 h-10" />
                <span className="font-black text-2xl tracking-tight text-white">MORTAL</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                المتجر الأول في العراق المتخصص في بيع وتجميع أجهزة الكمبيوتر الإحترافية واللابتوبات بأسعار تنافسية.
              </p>
            </motion.div>

            <motion.div variants={cardVariant}>
              <h4 className="font-bold text-white text-lg mb-6">الأقسام</h4>
              <ul className="space-y-4 text-muted-foreground text-sm font-medium">
                {Object.values(categoryLabels).map((label) => (
                  <li key={label}>
                    <motion.button onClick={() => { setActiveTab(Object.keys(categoryLabels).find(k => categoryLabels[k as Category] === label) as Category); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
                      whileHover={{ x: -4, color: 'hsl(var(--primary))' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="hover:text-primary transition-colors text-right">
                      {label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Mortal Tech Store. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* ── Floating Cart Button ──────────────────────────────── */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(0,200,255,0.5)' }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-5 left-5 z-[120] h-12 px-4 bg-primary rounded-full flex items-center gap-2.5 text-primary-foreground shadow-[0_0_22px_rgba(0,200,255,0.35)]"
            dir="ltr"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 text-white text-[10px] font-black flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            </div>
            <span className="font-black text-sm">${totalPrice.toLocaleString()}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
