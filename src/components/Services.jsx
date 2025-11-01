import React from 'react';
import { useApp } from '../context/AppContext';

function Services() {
  const { state } = useApp();

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
            We provide comprehensive digital solutions to help your business thrive in the modern world
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {state.services.map((service, index) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-xl shadow-lg hover-scale hover:shadow-xl transition-all duration-300 animate-slide-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
              <button className="mt-6 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;