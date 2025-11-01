import React from 'react';

function Hero() {
  return (
    <section id="home" className="min-h-screen gradient-bg flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white rounded-full animate-bounce-slow" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 text-center text-white relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Welcome to <span className="text-yellow-300">XYZ Innovations</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.3s'}}>
            We transform your ideas into digital reality with cutting-edge technology solutions
          </p>
          <div className="space-x-4 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <a 
              href="#services" 
              className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover-scale hover:bg-yellow-300 transition-all duration-300"
            >
              Our Services
            </a>
            <a 
              href="#contact" 
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;