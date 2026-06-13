import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, CheckCircle2, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';

const MotionButton = motion.create(Button);

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const specsList = product.specs.split('•').map(s => s.trim()).filter(Boolean);
  const whatsappMsg = encodeURIComponent(`مرحبا، أريد الاستفسار عن ${product.nameAr} - السعر ${product.priceLabel}`);
  const whatsappLink = `https://wa.me/9647880545149?text=${whatsappMsg}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          className="bg-[hsl(222_47%_7%)] border border-white/10 rounded-3xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-black/40">
            {product.badge && (
              <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground font-bold rounded-md px-3 py-1 text-sm">
                {product.badge}
              </Badge>
            )}
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_47%_7%)] via-transparent to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8" dir="rtl">
            <div className="mb-6">
              <p className="text-primary font-bold text-sm mb-1 tracking-wide uppercase" dir="ltr">{product.name}</p>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{product.nameAr}</h2>
              <span className="text-3xl font-black text-primary" dir="ltr">{product.priceLabel}</span>
            </div>

            {/* Specs */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-base mb-3">المواصفات</h3>
              <div className="grid grid-cols-1 gap-2">
                {specsList.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/4 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium" dir="ltr">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs text-muted-foreground font-bold">ضمان رسمي</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs text-muted-foreground font-bold">توصيل لكل العراق</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <MotionButton
                onClick={handleAdd}
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                className={`flex-1 h-12 font-bold text-base rounded-xl transition-colors duration-300 ${
                  added
                    ? 'bg-green-500 hover:bg-green-500 text-white'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
              >
                {added ? (
                  <><CheckCircle2 className="w-5 h-5 ml-2" /> تمت الإضافة للسلة</>
                ) : (
                  <><ShoppingCart className="w-5 h-5 ml-2" /> أضف للسلة</>
                )}
              </MotionButton>

              <MotionButton
                onClick={() => window.open(whatsappLink, '_blank')}
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                variant="outline"
                className="flex-1 h-12 font-bold text-base rounded-xl border-green-500/40 text-green-400 hover:bg-green-500/10 hover:text-green-300"
              >
                <MessageCircle className="w-5 h-5 ml-2" /> استفسر عبر واتساب
              </MotionButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
