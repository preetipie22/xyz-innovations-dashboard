import React from 'react';
import { useApp } from '../context/AppContext';

function Testimonials() {
  const { state } = useApp();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="testimonials" className="py-20 gradient-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            What Our Clients Say
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {state.testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="glass-effect p-8 rounded-xl animate-slide-up"
              style={{animationDelay: `${index * 0.3}s`}}
            >
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-white text-lg mb-6 leading-relaxed">
                "{testimonial.message}"
              </p>
              <div className="border-t border-white/20 pt-4">
                <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                <p className="text-blue-200">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;