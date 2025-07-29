import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Search} from 'lucide-react';
import MenuItem from '@/components/MenuItem';

const Menu = ({
                  menuData,
                  searchTerm,
                  setSearchTerm,
                  selectedCategory,
                  setSelectedCategory,
                  filteredItems,
                  onAddToCart
              }) => {
    return (
        <>
            <section className="max-w-7xl mx-auto pt-3 px-4 sm:px-6 lg:px-8 mb-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg transition-colors duration-300"
                >
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5"/>
                            <input
                                type="text"
                                placeholder="Buscar pizzas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto -mx-4 px-4">
                            {menuData.categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl whitespace-nowrap transition-all ${
                                        selectedCategory === category.id
                                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    <span>{category.icon}</span>
                                    <span className="font-medium text-sm sm:text-base">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
                >
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} index={index}/>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">🤷‍♂️</div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Nenhuma pizza
                            encontrada</h3>
                        <p className="text-gray-600 dark:text-gray-400">Tente ajustar sua busca ou filtros.</p>
                    </motion.div>
                )}
            </section>
        </>
    );
};

export default Menu;
