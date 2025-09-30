import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import About from '../components/About'
import Contact from '../components/Contact'
import ChatbotPage from './ChatbotPage'
import '../styles/App.css'

function HomePage() {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <Contact />
    </Layout>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatbotPage />} />
      </Routes>
    </Router>
  )
}

export default App
