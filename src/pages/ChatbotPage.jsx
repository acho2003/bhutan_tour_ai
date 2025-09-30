import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

import { 
  Send, 
  MessageSquare, 
  Loader2, 
  Sparkles, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Camera, 
  Upload,
  MapPin,
  Clock,
  Star,
  ArrowLeft
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Link } from 'react-router-dom';
import { generateSmartSuggestions, getNearbyAttractions } from '../services/hotspotService';
import '../styles/chatbot.css';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      text: "Tashi Delek! 🙏 Welcome to BhutanTour AI. I'm your personal guide to the Last Shangri-La. Ask me anything about Bhutanese culture, monasteries, festivals, or travel tips. You can also upload images or use voice commands!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-lite-latest' });
  const visionModel = genAI.getGenerativeModel({ model: 'gemini-flash-lite-latest' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateHotspotSuggestions = (userQuery) => {
    return generateSmartSuggestions(userQuery || '', null, []);
  };

  const handleHotspotClick = (hotspot) => {
    const hotspotQuery = `Tell me about ${hotspot.name}`;
    handleSendMessage(null, hotspotQuery);
  };

  const handleSendMessage = async (e, customInput = null) => {
    if (e) e.preventDefault();
    const messageText = customInput || input.trim();
    if (messageText === '' && !uploadedImage) return;

    const userMessage = { 
      text: messageText, 
      sender: 'user', 
      timestamp: new Date(),
      image: imagePreview 
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let result;
      let prompt = `You are a Bhutan Tourism AI Assistant. ${messageText}

Please provide a helpful, friendly response about Bhutanese culture, travel, or tourism. Keep your tone conversational like a knowledgeable tour guide.`;

      if (uploadedImage) {
        // Handle image analysis
        const imageData = await convertImageToBase64(uploadedImage);
        prompt = `You are a Bhutan Tourism AI Assistant. Analyze this image and provide information about what you see. If it's a Bhutanese landmark, monastery, dzong, or cultural site, provide its history, significance, and travel tips. If it's a landscape, describe the location and suggest activities. ${messageText}`;
        
        result = await visionModel.generateContent([prompt, {
          inlineData: {
            data: imageData.split(',')[1],
            mimeType: uploadedImage.type
          }
        }]);
      } else {
        result = await model.generateContent(prompt);
      }

      const response = await result.response;
      const text = response.text();
      
           const aiMessage = { 
        text, 
        sender: 'ai', 
        timestamp: new Date(),
        suggestions: generateHotspotSuggestions(messageText)
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      

      
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      const errorMessage = {
        text: 'Tashi Delek! I apologize, but I encountered an issue. Please try again or ask me something else about Bhutan.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
      setUploadedImage(null);
      setImagePreview(null);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center text-white hover:text-primary transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-white/20"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">BhutanTour AI Assistant</h1>
                  <p className="text-sm text-gray-300">Your personal guide to the Last Shangri-La</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-300">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl monastery-shadow border border-white/10 overflow-hidden">
          {/* Chat Messages */}
          <div className="h-[60vh] p-6 overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex mb-6 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    {/* Message Bubble */}
                    <div
                      className={`p-4 rounded-2xl ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-white ml-4' 
                          : 'bg-white/10 text-white mr-4 border border-white/20'
                      }`}
                    >
                      {msg.image && (
                        <div className="mb-3">
                          <img 
                            src={msg.image} 
                            alt="Uploaded" 
                            className="max-w-full h-auto rounded-lg"
                          />
                        </div>
                      )}
                     <div className="whitespace-pre-wrap leading-relaxed">
  <ReactMarkdown>{msg.text}</ReactMarkdown>
</div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {formatTime(msg.timestamp)}
                        </span>
                        {msg.sender === 'ai' && (
                          <button
                            onClick={() => speakText(msg.text)}
                            className="text-xs opacity-70 hover:opacity-100 transition-opacity duration-200 flex items-center space-x-1"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Listen</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Hotspot Suggestions */}
                    {msg.suggestions && (
                      <motion.div 
                        className="mt-4 mr-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-sm text-gray-300 mb-3">🏔️ Explore these nearby attractions:</p>
                        <div className="grid grid-cols-1 gap-2">
                          {msg.suggestions.map((hotspot, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => handleHotspotClick(hotspot)}
                              className="hotspot-card rounded-lg p-3 text-left transition-all duration-200 group"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-start space-x-3">
                                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                    {hotspot.name}
                                  </h4>
                                  <p className="text-xs text-gray-400 mt-1">{hotspot.description}</p>
                                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{hotspot.season}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-3 h-3" />
                                      <span>{hotspot.tips}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'user' ? 'bg-primary order-1' : 'bg-white/10 order-2'
                  }`}>
                    {msg.sender === 'user' ? (
                      <span className="text-sm font-bold">You</span>
                    ) : (
                      <span className="text-lg">🏔️</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                className="flex justify-start mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-white/10 rounded-2xl p-4 mr-4 border border-white/20 message-bubble">
                  <div className="flex items-center space-x-3">
                    <div className="mandala-spinner"></div>
                    <div className="flex flex-col">
                      <span className="text-sm">Thinking about your question...</span>
                      <div className="typing-indicator mt-1">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="px-6 py-3 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-300">Image ready for analysis</p>
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setUploadedImage(null);
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-white/10">
            <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
              {/* Voice Control */}
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`p-3 rounded-full transition-all duration-200 bhutan-button ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 voice-recording status-listening' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Image Upload */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              >
                <Camera className="w-5 h-5" />
              </button>

              {/* Text Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about Bhutan, upload an image, or use voice..."
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary border border-white/20 placeholder-gray-400"
                />
              </div>

              {/* Audio Control */}
              <button
                type="button"
                onClick={isSpeaking ? stopSpeaking : () => {}}
                className={`p-3 rounded-full transition-all duration-200 bhutan-button ${
                  isSpeaking 
                    ? 'bg-primary hover:bg-primary/80 speaking-pulse status-speaking' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-200 mandala-glow"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Status Indicators */}
            <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
              <div className="flex items-center space-x-4">
                {isListening && (
                  <span className="flex items-center space-x-1 text-red-400">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span>Listening...</span>
                  </span>
                )}
                {isSpeaking && (
                  <span className="flex items-center space-x-1 text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Speaking...</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
