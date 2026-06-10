import { useState, useEffect } from 'react';
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

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = "https://wa.me/9647880545149";

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary/30 selection:text-primary dark">
      {/* Top Bar */}
      <div className="bg-secondary text-secondary-foreground py-2 text-xs md:text-sm font-medium border-b border-white/5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-primary" /> توصيل سريع لكافة محافظات العراق</span>
            <span className="hidden md:flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> ضمان حقيقي على جميع القطع</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+9647880545149" className="hover:text-primary transition-colors flex items-center gap-1.5" dir="ltr">
              <Phone className="w-3.5 h-3.5" /> +964 788 054 5149
            </a>
            <div className="flex gap-2">
              <span className="text-primary font-bold cursor-pointer">AR</span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-effect py-3 box-glow' : 'bg-transparent py-5'}`}>
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
              <a href="#" className="text-white hover:text-primary font-bold transition-colors">الرئيسية</a>
              <a href="#" className="text-muted-foreground hover:text-primary font-semibold transition-colors">لابتوبات</a>
              <a href="#" className="text-muted-foreground hover:text-primary font-semibold transition-colors">تجميعات PC</a>
              <a href="#" className="text-muted-foreground hover:text-primary font-semibold transition-colors">شاشات</a>
              <a href="#" className="text-muted-foreground hover:text-primary font-semibold transition-colors">اكسسوارات</a>
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
              <Button variant="ghost" size="icon" className="relative hover:bg-white/5 hover:text-primary rounded-full">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full">3</span>
              </Button>
              <Button onClick={() => window.open(whatsappLink, '_blank')} className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-6 transition-all">
                تواصل معنا <MessageCircle className="w-4 h-4 mr-2" />
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl lg:hidden flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img src="/images/mortal-logo.png" alt="Mortal" className="w-8 h-8" />
              <span className="font-black text-xl text-white">MORTAL</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="p-4">
            <div className="relative w-full mb-6">
              <Input type="search" placeholder="بحث..." className="w-full bg-secondary border-white/10 h-12 rounded-lg pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            <nav className="flex flex-col gap-4 text-lg font-bold">
              <a href="#" className="p-3 bg-white/5 rounded-lg text-primary flex justify-between items-center">الرئيسية <ChevronLeft className="w-5 h-5" /></a>
              <a href="#" className="p-3 hover:bg-white/5 rounded-lg flex justify-between items-center transition-colors">لابتوبات <ChevronLeft className="w-5 h-5 text-muted-foreground" /></a>
              <a href="#" className="p-3 hover:bg-white/5 rounded-lg flex justify-between items-center transition-colors">تجميعات PC <ChevronLeft className="w-5 h-5 text-muted-foreground" /></a>
              <a href="#" className="p-3 hover:bg-white/5 rounded-lg flex justify-between items-center transition-colors">شاشات <ChevronLeft className="w-5 h-5 text-muted-foreground" /></a>
              <a href="#" className="p-3 hover:bg-white/5 rounded-lg flex justify-between items-center transition-colors">اكسسوارات <ChevronLeft className="w-5 h-5 text-muted-foreground" /></a>
            </nav>
            <Button onClick={() => window.open(whatsappLink, '_blank')} className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg">
              تواصل معنا عبر واتساب
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 text-center lg:text-right order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm w-fit mx-auto lg:mx-0">
                <Zap className="w-4 h-4" /> الخيار الأول للاعبين في العراق
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                ارفع مستوى <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-blue-500">اللعب الخاص بك</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                أحدث القطع، أقوى التجميعات، وأفضل اللابتوبات. مورتال يوفر لك كل ما تحتاجه لتجربة أداء لا مثيل لها مع دعم فني متواصل.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-full transition-all">
                  تسوق الآن
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 hover:bg-white/5 text-white font-bold text-lg rounded-full">
                  استكشف التجميعات
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 mt-4 border-t border-white/10">
                <div>
                  <h4 className="text-3xl font-black text-white">500+</h4>
                  <p className="text-sm text-muted-foreground font-bold">منتج متوفر</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white">24h</h4>
                  <p className="text-sm text-muted-foreground font-bold">توصيل سريع</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white">1Yr</h4>
                  <p className="text-sm text-muted-foreground font-bold">ضمان شامل</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-square group">
                <img
                  src="/images/mortal-hero.png"
                  alt="High-end gaming setup"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              </div>

              <div className="absolute -bottom-6 -left-6 glass-effect p-4 rounded-xl border border-white/10 shadow-2xl hidden md:flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-white">وكيل معتمد</p>
                  <p className="text-xs text-muted-foreground">لأشهر الماركات العالمية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-secondary/30 border-y border-white/5 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">تسوق حسب الفئة</h2>
              <p className="text-muted-foreground font-medium">كل ما تحتاجه لبناء محطتك المتكاملة</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { title: 'تجميعات PC', icon: Cpu, count: '45 منتج', color: 'from-primary/20 to-transparent' },
              { title: 'لابتوبات', icon: Laptop, count: '120 منتج', color: 'from-blue-500/20 to-transparent' },
              { title: 'شاشات', icon: Monitor, count: '60 منتج', color: 'from-purple-500/20 to-transparent' },
              { title: 'اكسسوارات', icon: Headset, count: '300+ منتج', color: 'from-emerald-500/20 to-transparent' }
            ].map((cat, i) => (
              <a href="#" key={i} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-secondary/50 p-6 hover:border-primary/50 transition-colors">
                <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform group-hover:border-primary/50">
                    <cat.icon className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">{cat.title}</h3>
                    <p className="text-xs text-muted-foreground">{cat.count}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-xs mb-4">
                الأكثر مبيعاً
              </div>
              <h2 className="text-4xl font-black text-white">تجميعات إحترافية</h2>
            </div>
            <Button variant="link" className="text-primary hover:text-primary/80 font-bold group hidden sm:flex">
              عرض الكل <ChevronLeft className="w-4 h-4 ml-1 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: 'MORTAL EXTREME BUILD',
                specs: 'RTX 4090 • i9-14900K • 64GB DDR5 • 2TB NVMe',
                price: '$3,850',
                image: '/images/mortal-hero.png',
                badge: 'جديد'
              },
              {
                name: 'MORTAL PRO GAMER',
                specs: 'RTX 4070 Ti • Ryzen 7 13700K • 32GB DDR5 • 1TB NVMe',
                price: '$2,100',
                image: '/images/mortal-components.png',
                badge: 'الأكثر مبيعاً'
              },
              {
                name: 'MORTAL ENTRY LEVEL',
                specs: 'RTX 4060 • i5-13400F • 16GB DDR5 • 1TB NVMe',
                price: '$1,250',
                image: '/images/mortal-hero.png',
              }
            ].map((product, i) => (
              <Card key={i} className="bg-secondary/30 border-white/10 hover:border-primary/50 transition-all overflow-hidden group">
                <div className="relative aspect-video overflow-hidden bg-background">
                  {product.badge && (
                    <Badge className="absolute top-4 right-4 z-10 bg-primary hover:bg-primary text-primary-foreground font-bold rounded-sm px-2">
                      {product.badge}
                    </Badge>
                  )}
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-black text-white mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium mb-6 font-mono text-left" dir="ltr">{product.specs}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-black text-primary" dir="ltr">{product.price}</span>
                    <Button className="bg-white text-black hover:bg-gray-200 font-bold rounded-full">
                      إضافة للسلة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Showcase */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 group h-80 md:h-[400px]">
              <img src="/images/mortal-laptops.png" alt="Laptops" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start">
                <Badge className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-white/20 mb-3">عروض خاصة</Badge>
                <h3 className="text-3xl font-black text-white mb-3">أقوى أجهزة اللابتوب</h3>
                <p className="text-muted-foreground font-medium mb-6 max-w-sm">تشكيلة واسعة من أجهزة اللابتوب المخصصة للألعاب والتصميم بأفضل الأسعار.</p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full">
                  تسوق اللابتوبات <ChevronLeft className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="grid grid-rows-2 gap-6 h-80 md:h-[400px]">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
                <img src="/images/mortal-monitors.png" alt="Monitors" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-start w-2/3">
                  <h3 className="text-2xl font-black text-white mb-2">شاشات احترافية</h3>
                  <p className="text-sm text-muted-foreground mb-4">معدل تحديث عالي وألوان دقيقة.</p>
                  <Button variant="link" className="text-primary hover:text-primary/80 font-bold p-0">اكتشف المزيد</Button>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
                <img src="/images/mortal-accessories.png" alt="Accessories" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-start w-2/3">
                  <h3 className="text-2xl font-black text-white mb-2">معدات اللعب</h3>
                  <p className="text-sm text-muted-foreground mb-4">كيبوردات، ماوسات، وسماعات.</p>
                  <Button variant="link" className="text-primary hover:text-primary/80 font-bold p-0">اكتشف المزيد</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/20 border border-white/5">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">توصيل لكل العراق</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                خدمة توصيل سريعة وآمنة إلى جميع محافظات العراق، مع توفر خدمة الدفع عند الاستلام.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/20 border border-white/5">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">دعم فني متواصل</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                فريق من الخبراء جاهز للإجابة على استفساراتك ومساعدتك في اختيار أو حل مشاكل القطع الخاصة بك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center glass-effect p-8 md:p-16 rounded-3xl border border-primary/30">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">تحتاج مساعدة في اختيار تجميعتك؟</h2>
            <p className="text-lg text-muted-foreground mb-8">
              تواصل مع فريق المبيعات المختص لدينا عبر الواتساب للحصول على استشارة مجانية وعروض أسعار مخصصة.
            </p>
            <Button onClick={() => window.open(whatsappLink, '_blank')} size="lg" className="h-16 px-10 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-full shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] transition-all">
              <MessageCircle className="w-6 h-6 ml-3" /> راسلنا على واتساب
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 pt-16 pb-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/mortal-logo.png" alt="Mortal" className="w-10 h-10" />
                <span className="font-black text-2xl tracking-tight text-white">MORTAL</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                المتجر الأول في العراق المتخصص في بيع وتجميع أجهزة الكمبيوتر الإحترافية واللابتوبات بأسعار تنافسية.
              </p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <a href="tel:+9647880545149" className="hover:text-primary transition-colors"><div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Phone className="w-4 h-4" /></div></a>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><MessageCircle className="w-4 h-4" /></div></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white text-lg mb-6">الأقسام</h4>
              <ul className="space-y-4 text-muted-foreground text-sm font-medium">
                <li><a href="#" className="hover:text-primary transition-colors">تجميعات الكمبيوتر</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">لابتوبات جيمنج</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">لابتوبات أعمال</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">شاشات</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">قطع الكمبيوتر</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-lg mb-6">خدمة العملاء</h4>
              <ul className="space-y-4 text-muted-foreground text-sm font-medium">
                <li><a href="#" className="hover:text-primary transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">سياسة الاسترجاع</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">تتبع الطلب</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">الأسئلة الشائعة</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-lg mb-6">معلومات التواصل</h4>
              <ul className="space-y-4 text-muted-foreground text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span dir="ltr" className="text-right w-full">+964 788 054 5149</span>
                </li>
                <li className="flex items-start gap-3 mt-4">
                  <div className="w-5 h-5 flex items-center justify-center text-primary shrink-0 text-base">📍</div>
                  <span>العراق — الصناعه / مجمع عمان</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Mortal Tech Store. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
