import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {X, Plus, Minus, ShoppingCart} from 'lucide-react';
import {Button} from '@/components/ui/button';

const Cart = ({isOpen, onClose, cart, cartItemsCount, cartTotal, updateQuantity, removeFromCart, handleCheckout}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{x: '100%'}}
                        animate={{x: 0}}
                        exit={{x: '100%'}}
                        transition={{type: 'spring', damping: 30, stiffness: 220}}
                        className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">Seu Pedido</h2>
                                    <p className="text-orange-100">{cartItemsCount} {cartItemsCount === 1 ? 'item' : 'itens'}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6"/>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                                    <div className="text-6xl mb-4">🍕</div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Seu carrinho
                                        está vazio</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Que tal adicionar uma pizza
                                        deliciosa?</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{opacity: 0, x: 20}}
                                            animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: -20}}
                                            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 flex items-start space-x-3"
                                        >
                                            <img
                                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                                                alt={item.name}
                                                src={`/images/${item.image}`}/>

                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base">{item.name}</h4>
                                                <p className="text-orange-600 font-bold">R$ {item.price.toFixed(2)}</p>

                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center space-x-1 sm:space-x-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4"/>
                                                        </button>
                                                        <span
                                                            className="font-bold text-base sm:text-lg w-8 text-center text-gray-800 dark:text-gray-100">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4"/>
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                    >
                                                        <X className="w-5 h-5"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div
                                className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Total:</span>
                                    <span className="text-xl sm:text-2xl font-bold text-orange-600">
                    R$ {cartTotal.toFixed(2)}
                  </span>
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5"/>
                                    Finalizar Pedido
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
