import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';

const MotionButton = motion.create('button');

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="bg-white/5 border border-white/10 hover:border-primary/40 rounded-2xl overflow-hidden flex flex-col group transition-colors duration-400"
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
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-black text-white text-base leading-snug mb-1">{product.nameAr}</h3>
          <p className="text-xs text-muted-foreground font-mono leading-relaxed" dir="ltr">
            {product.specs}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className="text-xl font-black text-primary" dir="ltr">
            {product.priceLabel}
          </span>
          <MotionButton
            onClick={handleAdd}
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors duration-300 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-white text-black hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            {added ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> تمت الإضافة
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> أضف للسلة
              </>
            )}
          </MotionButton>
        </div>
      </div>
    </motion.div>
  );
}
