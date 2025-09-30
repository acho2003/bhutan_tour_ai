import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Camera, Languages, Sparkles, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: MessageCircle,
      title: 'Ask the AI Chatbot',
      description: 'Start a conversation with our intelligent chatbot. Ask about festivals, monasteries, cultural practices, or travel recommendations.',
      culturalIcon: '🎭', // Mask icon
      color: 'primary',
      example: '"Tell me about the Paro Tshechu festival"'
    },
    {
      step: 2,
      icon: Camera,
      title: 'Upload & Discover',
      description: 'Take a photo of any dzong, temple, or cultural artifact. Our AI instantly recognizes and provides detailed historical context.',
      culturalIcon: '📿', // Camera mandala
      color: 'secondary',
      example: 'Photo of Punakha Dzong → Instant history & significance'
    },
    {
      step: 3,
      icon: Languages,
      title: 'Translate Seamlessly',
      description: 'Communicate effortlessly with locals. Our real-time translation bridges language gaps in Dzongkha, English, Hindi, and Chinese.',
      culturalIcon: '☸️', // Prayer wheel
      color: 'accent',
      example: 'English ↔ Dzongkha ↔ Hindi ↔ Chinese'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Thangka-style Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-accent rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 border-2 border-primary rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Simple & Intuitive</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">How </span>
            <span className="bhutan-text-gradient">BhutanTour AI</span>
            <span className="text-white"> Works</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience Bhutan's rich culture through three simple steps. 
            Our AI technology makes cultural discovery accessible and meaningful.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={stepVariants}
              className="relative"
            >
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-32 bg-gradient-to-b from-primary to-secondary opacity-30 hidden md:block"></div>
              )}

              <div className="flex flex-col md:flex-row items-start md:items-center mb-16 last:mb-0">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <div className="relative">
                    {/* Cultural Icon Background */}
                    <div className="absolute -top-2 -right-2 text-4xl opacity-20">
                      {step.culturalIcon}
                    </div>
                    
                    {/* Main Icon Container */}
                    <div className={`w-16 h-16 rounded-full bg-${step.color} flex items-center justify-center mandala-glow relative z-10`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <motion.div 
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 dzong-frame"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                      {step.description}
                    </p>

                    {/* Example */}
                    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                      <p className="text-sm text-primary font-medium mb-1">Example:</p>
                      <p className="text-sm text-gray-300 italic">{step.example}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Arrow (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex items-center ml-8">
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-8 h-8 text-primary" />
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Experience the Magic Yourself
            </h3>
            <p className="text-gray-300 mb-6">
              Try BhutanTour AI and start your journey into the heart of Bhutanese culture
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold mandala-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Demo
              </motion.button>
              {/* <motion.button 
                className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download App
              </motion.button> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
