
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Sun, Moon } from 'lucide-react';

const Header = ({ cartItemsCount, onCartClick, theme, onThemeToggle }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">🍕</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
                Pizzaria
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Cardápio Online</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onThemeToggle}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6 text-yellow-400" />}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onCartClick}
              className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 sm:px-4 sm:py-2 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-6 h-6 sm:w-5 sm:h-5" />
                <span className="font-medium hidden sm:inline">Carrinho</span>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-yellow-400 text-orange-800 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
