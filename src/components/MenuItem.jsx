import React from 'react';
import {motion} from 'framer-motion';
import {Plus, Star, Clock} from 'lucide-react';
import {Button} from '@/components/ui/button';

const MenuItem = ({item, onAddToCart, index}) => {
    return (
        <motion.div
            layout
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            transition={{delay: index * 0.05}}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
        >
            <div className="relative overflow-hidden">
                <img
                    className="w-full h-32 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={item.name}
                    src={`/images/${item.image}`}/>
                <div
                    className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500"/>
                    <span
                        className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">{item.rating}</span>
                </div>
                <div
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-orange-500 text-white rounded-full px-2 py-1 sm:px-3 flex items-center space-x-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4"/>
                    <span className="text-xs sm:text-sm font-medium">{item.prepTime}</span>
                </div>
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 leading-tight">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-xs sm:text-sm leading-relaxed flex-grow">{item.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto gap-2">
                    <span className="text-lg sm:text-2xl font-bold text-orange-600">
                          {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                          }).format(item.price)}
                    </span>


                    <Button
                        onClick={() => onAddToCart(item)}
                        className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Plus className="w-4 h-4 mr-2"/>
                        Adicionar
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuItem;
