import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Slogan do <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Estabelecimento</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
            Texto ou frase que chame atenção
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-200">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Endereço</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-orange-500" />
              <span>Telefone/Whatsapp</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Horário de funcionamento</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;