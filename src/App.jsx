import React from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Contact from './components/Contact'
import Chatbot from './components/Chatbot'
import './App.css'

function App() {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <Contact />
      <Chatbot />
    </Layout>
  )
}

export default App
