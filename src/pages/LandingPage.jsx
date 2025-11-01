import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
              XYZ Innovations
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="text-white hover:text-blue-200 transition-colors">Home</a>
              <a href="#services" className="text-white hover:text-blue-200 transition-colors">Services</a>
              <a href="#testimonials" className="text-white hover:text-blue-200 transition-colors">Testimonials</a>
              <a href="#contact" className="text-white hover:text-blue-200 transition-colors">Contact</a>
              <Link to="/admin" className="text-white hover:text-blue-200 transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default LandingPage;