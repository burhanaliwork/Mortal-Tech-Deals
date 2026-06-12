import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const WHATSAPP = '9647880545149';

function buildWhatsAppMessage(
  items: ReturnType<typeof useCart>['items'],
  total: number
): string {
  const lines = items.map(
    (i) =>
      `• ${i.nameAr} × ${i.quantity} = $${(i.price * i.quantity).toLocaleString()}`
  );
  return encodeURIComponent(
    `مرحباً، أريد إتمام الطلب التالي:\n\n${lines.join('\n')}\n\n💰 المجموع: $${total.toLocaleString()}\n\nشكراً 🙏`
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart();

  const handleOrder = () => {
    const msg = buildWhatsAppMessage(items, totalPrice);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[200] w-full max-w-md bg-[hsl(222_47%_7%)] border-l border-white/10 flex flex-col shadow-2xl"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-black text-white">سلة التسوق</h2>
                {totalItems > 0 && (
                  <span className="w-6 h-6 bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.88, rotate: 90 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-64 text-center gap-4"
                  >
                    <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                    <p className="text-muted-foreground font-medium">السلة فارغة</p>
                    <p className="text-sm text-muted-foreground/60">أضف منتجات لتبدأ طلبك</p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-4 bg-white/5 rounded-2xl p-4 border border-white/5"
                    >
                      <img
                        src={item.image}
                        alt={item.nameAr}
                        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm leading-snug mb-1 line-clamp-2">
                          {item.nameAr}
                        </p>
                        <p className="text-primary font-black text-lg" dir="ltr">
                          {item.priceLabel}
                        </p>

                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-1">
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </motion.button>
                            <span className="text-white font-bold w-5 text-center text-sm">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-primary transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </motion.button>
                          </div>

                          <span className="text-muted-foreground text-xs font-medium mr-auto" dir="ltr">
                            = ${(item.price * item.quantity).toLocaleString()}
                          </span>

                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => removeItem(item.id)}
                            className="w-7 h-7 rounded-full bg-red-500/10 hover:bg-red-500/25 flex items-center justify-center text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <AnimatePresence>
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-5 border-t border-white/10 space-y-4 bg-[hsl(222_47%_5%)]"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">المجموع الكلي</span>
                    <span className="text-3xl font-black text-white" dir="ltr">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground/70 text-center">
                    سيتم إتمام طلبك عبر واتساب — فريقنا سيتواصل معك لتأكيد الطلب والتوصيل
                  </p>

                  <motion.button
                    onClick={handleOrder}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(34,197,94,0.45)' }}
                    transition={{ type: 'spring', stiffness: 340, damping: 20 }}
                    className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(34,197,94,0.3)] transition-colors"
                  >
                    <MessageCircle className="w-6 h-6" />
                    إتمام الطلب عبر واتساب
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
