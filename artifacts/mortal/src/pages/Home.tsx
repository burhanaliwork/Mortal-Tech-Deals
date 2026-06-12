import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronLeft,
  Phone,
  Monitor,
  Cpu,
  Headset,
  Laptop,
  ShieldCheck,
  Truck,
  Zap,
  Clock,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
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
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

const MotionButton = motion.create(Button);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = "https://wa.me/9647880545149";

  const vp = { once: true, amount: 0.2 };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary/30 selection:text-primary dark">

      {/* Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 py-4 transition-colors duration-300 ${isScrolled ? 'glass-effect box-glow' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-shrink-0 flex items-center gap-3">
              <img src="/images/mortal-logo.png" alt="Mortal" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
              <div className="flex flex-col">
                <span className="font-black text-xl md:text-2xl tracking-tight text-white leading-none">MORTAL</span>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase leading-none mt-1">Tech Store</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {['الرئيسية','لابتوبات','تجميعات PC','شاشات','اكسسوارات'].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ color: 'hsl(var(--primary))' }}
                  className={`font-${i === 0 ? 'bold text-white' : 'semibold text-muted-foreground'} transition-colors`}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <div className="hidden md:flex items-center flex-1 max-w-md ml-auto gap-4">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="ابحث عن منتج، ماركة، أو فئة..."
                  className="w-full bg-secondary/50 border-white/10 focus-visible:ring-primary pl-10 pr-4 h-10 rounded-full text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MotionButton
                variant="ghost"
                size="icon"
                whileTap={{ scale: 0.88 }}
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative hover:bg-white/5 hover:text-primary rounded-full w-12 h-12"
              >
                <ShoppingCart className="w-7 h-7" />
                <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center rounded-full">3</span>
              </MotionButton>
              <MotionButton
                onClick={() => window.open(whatsappLink, '_blank')}
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-6"
              >
                تواصل معنا <MessageCircle className="w-4 h-4 mr-2" />
              </MotionButton>
              <MotionButton
                variant="ghost"
                size="icon"
                whileTap={{ scale: 0.9 }}
                className="lg:hidden text-white"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </MotionButton>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img src="/images/mortal-logo.png" alt="Mortal" className="w-8 h-8" />
                <span className="font-black text-xl text-white">MORTAL</span>
              </div>
              <MotionButton
                variant="ghost"
                size="icon"
                whileTap={{ scale: 0.88, rotate: 90 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </MotionButton>
            </div>
            <motion.div
              className="p-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full mb-6">
                <Input type="search" placeholder="بحث..." className="w-full bg-secondary border-white/10 h-12 rounded-lg pl-10" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
              <nav className="flex flex-col gap-3 text-lg font-bold">
                {['الرئيسية','لابتوبات','تجميعات PC','شاشات','اكسسوارات'].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    variants={cardVariant}
                    whileTap={{ scale: 0.97 }}
                    className={`p-3 ${i === 0 ? 'bg-white/5 text-primary' : 'hover:bg-white/5'} rounded-lg flex justify-between items-center transition-colors`}
                  >
                    {item} <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                  </motion.a>
                ))}
              </nav>
              <MotionButton
                onClick={() => window.open(whatsappLink, '_blank')}
                whileTap={{ scale: 0.95 }}
                variants={cardVariant}
                className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg"
              >
                تواصل معنا عبر واتساب
              </MotionButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 text-center lg:text-right order-2 lg:order-1">
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm w-fit mx-auto lg:mx-0"
              >
                <Zap className="w-4 h-4" /> الخيار الأول للاعبين في العراق
              </motion.div>

              <motion.h1
                custom={0.12}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
              >
                ارفع مستوى <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-blue-500">اللعب الخاص بك</span>
              </motion.h1>

              <motion.p
                custom={0.24}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
              >
                أحدث القطع، أقوى التجميعات، وأفضل اللابتوبات. مورتال يوفر لك كل ما تحتاجه لتجربة أداء لا مثيل لها مع دعم فني متواصل.
              </motion.p>

              <motion.div
                custom={0.36}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start"
              >
                <MotionButton
                  size="lg"
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(var(--primary-rgb,0,200,255),0.35)' }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                  className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-full"
                >
                  تسوق الآن
                </MotionButton>
                <MotionButton
                  size="lg"
                  variant="outline"
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                  className="h-14 px-8 border-white/20 hover:bg-white/5 text-white font-bold text-lg rounded-full"
                >
                  استكشف التجميعات
                </MotionButton>
              </motion.div>

              <motion.div
                custom={0.48}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-4 pt-8 mt-4 border-t border-white/10"
              >
                {[['500+','منتج متوفر'],['24h','توصيل سريع'],['1Yr','ضمان شامل']].map(([val, label]) => (
                  <div key={label}>
                    <h4 className="text-3xl font-black text-white">{val}</h4>
                    <p className="text-sm text-muted-foreground font-bold">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              custom={0.2}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="order-1 lg:order-2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-square group">
                <img
                  src="/images/mortal-hero.jpg"
                  alt="High-end gaming setup"
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -left-6 glass-effect p-4 rounded-xl border border-white/10 shadow-2xl hidden md:flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-white">وكيل معتمد</p>
                  <p className="text-xs text-muted-foreground">لأشهر الماركات العالمية</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-secondary/30 border-y border-white/5 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="flex justify-between items-end mb-10"
          >
            <div>
              <h2 className="text-3xl font-black text-white mb-2">تسوق حسب الفئة</h2>
              <p className="text-muted-foreground font-medium">كل ما تحتاجه لبناء محطتك المتكاملة</p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
          >
            {[
              { title: 'تجميعات PC', icon: Cpu, count: '45 منتج', color: 'from-primary/20 to-transparent' },
              { title: 'لابتوبات', icon: Laptop, count: '120 منتج', color: 'from-blue-500/20 to-transparent' },
              { title: 'شاشات', icon: Monitor, count: '60 منتج', color: 'from-purple-500/20 to-transparent' },
              { title: 'اكسسوارات', icon: Headset, count: '300+ منتج', color: 'from-emerald-500/20 to-transparent' }
            ].map((cat) => (
              <motion.a
                href="#"
                key={cat.title}
                variants={cardVariant}
                whileHover={{ scale: 1.04, borderColor: 'hsl(var(--primary) / 0.5)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 340, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-secondary/50 p-6"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="w-16 h-16 rounded-full bg-background flex items-center justify-center border border-white/10"
                  >
                    <cat.icon className="w-8 h-8 text-white group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">{cat.title}</h3>
                    <p className="text-xs text-muted-foreground">{cat.count}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-xs mb-4">
                الأكثر مبيعاً
              </div>
              <h2 className="text-4xl font-black text-white">تجميعات إحترافية</h2>
            </div>
            <MotionButton
              variant="link"
              whileHover={{ x: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="text-primary hover:text-primary/80 font-bold group hidden sm:flex"
            >
              عرض الكل <ChevronLeft className="w-4 h-4 ml-1" />
            </MotionButton>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              { name: 'MORTAL EXTREME BUILD', specs: 'RTX 4090 • i9-14900K • 64GB DDR5 • 2TB NVMe', price: '$3,850', image: '/images/mortal-hero.jpg', badge: 'جديد' },
              { name: 'MORTAL PRO GAMER', specs: 'RTX 4070 Ti • Ryzen 7 13700K • 32GB DDR5 • 1TB NVMe', price: '$2,100', image: '/images/mortal-components.png', badge: 'الأكثر مبيعاً' },
              { name: 'MORTAL ENTRY LEVEL', specs: 'RTX 4060 • i5-13400F • 16GB DDR5 • 1TB NVMe', price: '$1,250', image: '/images/mortal-hero.jpg' }
            ].map((product) => (
              <motion.div
                key={product.name}
                variants={cardVariant}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <Card className="bg-secondary/30 border-white/10 hover:border-primary/50 transition-colors duration-500 overflow-hidden group h-full">
                  <div className="relative aspect-video overflow-hidden bg-background">
                    {product.badge && (
                      <Badge className="absolute top-4 right-4 z-10 bg-primary hover:bg-primary text-primary-foreground font-bold rounded-sm px-2">
                        {product.badge}
                      </Badge>
                    )}
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-black text-white mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium mb-6 font-mono text-left" dir="ltr">{product.specs}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-black text-primary" dir="ltr">{product.price}</span>
                      <MotionButton
                        whileTap={{ scale: 0.92 }}
                        whileHover={{ scale: 1.07 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                        className="bg-white text-black hover:bg-gray-200 font-bold rounded-full"
                      >
                        إضافة للسلة
                      </MotionButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid Showcase */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="grid md:grid-cols-2 gap-6"
          >
            <motion.div
              variants={cardVariant}
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 group h-80 md:h-[400px]"
            >
              <img src="/images/mortal-laptops.png" alt="Laptops" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start">
                <Badge className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-white/20 mb-3">عروض خاصة</Badge>
                <h3 className="text-3xl font-black text-white mb-3">أقوى أجهزة اللابتوب</h3>
                <p className="text-muted-foreground font-medium mb-6 max-w-sm">تشكيلة واسعة من أجهزة اللابتوب المخصصة للألعاب والتصميم بأفضل الأسعار.</p>
                <MotionButton
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full"
                >
                  تسوق اللابتوبات <ChevronLeft className="w-4 h-4 ml-2" />
                </MotionButton>
              </div>
            </motion.div>

            <div className="grid grid-rows-2 gap-6 h-80 md:h-[400px]">
              {[
                { img: '/images/mortal-monitors.png', alt: 'Monitors', title: 'شاشات احترافية', desc: 'معدل تحديث عالي وألوان دقيقة.' },
                { img: '/images/mortal-accessories.png', alt: 'Accessories', title: 'معدات اللعب', desc: 'كيبوردات، ماوسات، وسماعات.' }
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={cardVariant}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  className="relative rounded-3xl overflow-hidden border border-white/10 group"
                >
                  <img src={item.img} alt={item.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-center items-start w-2/3">
                    <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                    <MotionButton
                      variant="link"
                      whileHover={{ x: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="text-primary hover:text-primary/80 font-bold p-0"
                    >
                      اكتشف المزيد
                    </MotionButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              { icon: Truck, color: 'blue', title: 'توصيل لكل العراق', desc: 'خدمة توصيل سريعة وآمنة إلى جميع محافظات العراق، مع توفر خدمة الدفع عند الاستلام.' },
              { icon: Clock, color: 'purple', title: 'دعم فني متواصل', desc: 'فريق من الخبراء جاهز للإجابة على استفساراتك ومساعدتك في اختيار أو حل مشاكل القطع الخاصة بك.' }
            ].map((feat) => (
              <motion.div
                key={feat.title}
                variants={cardVariant}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/20 border border-white/5"
              >
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

      {/* WhatsApp CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="max-w-3xl mx-auto text-center glass-effect p-8 md:p-16 rounded-3xl border border-primary/30"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">تحتاج مساعدة في اختيار تجميعتك؟</h2>
            <p className="text-lg text-muted-foreground mb-8">
              تواصل مع فريق المبيعات المختص لدينا عبر الواتساب للحصول على استشارة مجانية.
            </p>
            <MotionButton
              onClick={() => window.open(whatsappLink, '_blank')}
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(34,197,94,0.5)' }}
              transition={{ type: 'spring', stiffness: 340, damping: 20 }}
              size="lg"
              className="h-16 px-10 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-full shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              <MessageCircle className="w-6 h-6 ml-3" /> راسلنا على واتساب
            </MotionButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 pt-16 pb-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
          >
            <motion.div variants={cardVariant}>
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/mortal-logo.png" alt="Mortal" className="w-10 h-10" />
                <span className="font-black text-2xl tracking-tight text-white">MORTAL</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                المتجر الأول في العراق المتخصص في بيع وتجميع أجهزة الكمبيوتر الإحترافية واللابتوبات بأسعار تنافسية.
              </p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <motion.a whileHover={{ scale: 1.15, color: 'hsl(var(--primary))' }} transition={{ type: 'spring', stiffness: 300 }} href="tel:+9647880545149" className="transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Phone className="w-4 h-4" /></div>
                </motion.a>
                <motion.a whileHover={{ scale: 1.15, color: 'hsl(var(--primary))' }} transition={{ type: 'spring', stiffness: 300 }} href={whatsappLink} target="_blank" rel="noreferrer" className="transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><MessageCircle className="w-4 h-4" /></div>
                </motion.a>
              </div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <h4 className="font-bold text-white text-lg mb-6">الأقسام</h4>
              <ul className="space-y-4 text-muted-foreground text-sm font-medium">
                {['تجميعات الكمبيوتر','لابتوبات جيمنج','لابتوبات أعمال','شاشات','قطع الكمبيوتر'].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: -4, color: 'hsl(var(--primary))' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="hover:text-primary transition-colors inline-block"
                    >
                      {item}
                    </motion.a>
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
    </div>
  );
}
