import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Users, Award, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Gross National Happiness',
      description: 'We embrace Bhutan\'s philosophy of holistic well-being, ensuring our technology promotes cultural preservation and sustainable tourism.',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: Globe,
      title: 'Cultural Preservation',
      description: 'Our AI is trained on authentic Bhutanese knowledge, helping preserve and share the rich cultural heritage for future generations.',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      title: 'Community Connection',
      description: 'We bridge the gap between travelers and local communities, fostering meaningful cultural exchanges and understanding.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Award,
      title: 'Authentic Experience',
      description: 'Every feature is designed to provide genuine insights into Bhutanese culture, traditions, and way of life.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  const stats = [
    { number: '2024', label: 'Founded' },
    { number: '20+', label: 'Cultural Sites' },
    { number: '5', label: 'Languages' },
    { number: '100%', label: 'Authentic Content' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements (Bhutanese Mural Style) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64">
          <div className="w-full h-full rounded-full border-4 border-primary flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-2 border-secondary flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 right-10 w-48 h-48">
          <div className="w-full h-full rounded-full border-2 border-accent flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-primary"></div>
          </div>
        </div>
        {/* Lotus patterns */}
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
          <div className="w-32 h-32 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-primary">
              <path d="M50 20 C30 30, 30 50, 50 50 C70 50, 70 30, 50 20 Z" />
              <path d="M50 50 C30 60, 30 80, 50 80 C70 80, 70 60, 50 50 Z" />
              <path d="M20 50 C30 30, 50 30, 50 50 C50 70, 30 70, 20 50 Z" />
              <path d="M80 50 C70 30, 50 30, 50 50 C50 70, 70 70, 80 50 Z" />
            </svg>
          </div>
        </div>
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
            className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Our Mission</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Promoting </span>
            <span className="bhutan-text-gradient">Gross National Happiness</span>
            <span className="text-gray-900"> Through Technology</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            BhutanTour AI was born from a deep respect for Bhutan's unique philosophy of 
            Gross National Happiness. We believe technology should serve humanity by 
            preserving culture, fostering understanding, and creating meaningful connections 
            between people and places.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          className="bg-white rounded-3xl p-8 md:p-12 monastery-shadow mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 mandala-glow">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Our Mission: Digital Preservation of Living Culture
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We are dedicated to creating technology that honors and preserves Bhutan's 
              extraordinary cultural heritage. Our AI doesn't just provide information—it 
              shares the soul of Bhutan, the wisdom of its people, and the beauty of its 
              traditions with the world.
            </p>
            <blockquote className="text-xl italic text-primary font-medium border-l-4 border-primary pl-6">
              "Happiness is not a place to travel to. It is a way of traveling."
              <footer className="text-sm text-gray-500 mt-2 not-italic">— Bhutanese Wisdom</footer>
            </blockquote>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full border-0 bg-white/80 backdrop-blur-sm monastery-shadow hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${value.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className={`w-8 h-8 ${value.color}`} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-6xl">🏔️</div>
            <div className="absolute bottom-4 left-4 text-6xl">🕉️</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5">☸️</div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="bhutan-text-gradient">BhutanTour AI</span> by the Numbers
              </h3>
              <p className="text-gray-300">
                Building bridges between technology and tradition
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Message */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Us in Celebrating Bhutan's Living Culture
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Every interaction with BhutanTour AI is a step towards preserving and 
              sharing the wisdom of the Last Shangri-La. Together, we can ensure 
              that Bhutan's cultural treasures continue to inspire future generations.
            </p>
            <motion.button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold mandala-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Cultural Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
