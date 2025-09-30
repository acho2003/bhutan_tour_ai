import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Camera, Languages, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Chatbot with Multilingual Support',
      description: 'Ask about Tshechu festivals, monastery histories, or cultural practices. Our AI responds in multiple languages including Dzongkha, English, Hindi, and Chinese.',
      example: 'Ask: "Tell me about the Tiger\'s Nest Monastery" → Get detailed history, significance, and visiting tips',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      culturalElement: '🎭' // Mask dance symbol
    },
    {
      icon: Camera,
      title: 'Image Upload & Recognition',
      description: 'Upload photos of dzongs, temples, or cultural artifacts and instantly learn their history, significance, and cultural context through AI analysis.',
      example: 'Upload photo of Punakha Dzong → AI tells its history, architecture, and cultural importance',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      culturalElement: '📿' // Prayer beads symbol
    },
    {
      icon: Languages,
      title: 'Real-time Language Translation',
      description: 'Break language barriers with instant translation between Dzongkha, English, Hindi, and Chinese. Perfect for communicating with local guides.',
      example: 'Tourist asks in English → Translated to Dzongkha → Guide responds → Translated back to English',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      culturalElement: '☸️' // Dharma wheel symbol
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50 cloud-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Discover Bhutan with </span>
            <span className="bhutan-text-gradient">Intelligent Technology</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience authentic Bhutanese culture through cutting-edge AI technology. 
            Our intelligent features make exploring the Last Shangri-La accessible and meaningful.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full monastery-shadow hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Cultural Element & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <div className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      {feature.culturalElement}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Example */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-sm text-gray-700 font-medium mb-1">Example:</p>
                    <p className="text-sm text-gray-600 italic">{feature.example}</p>
                  </div>

                  {/* Decorative Element */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 monastery-shadow max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Bhutan's Magic?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of travelers discovering authentic Bhutanese culture through AI
            </p>
            <motion.button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold mandala-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
