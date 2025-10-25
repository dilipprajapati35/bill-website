import React from 'react';
import { FEATURES } from '../constants';

const HeroSection: React.FC = () => (
  <section className="bg-white">
    <div className="container mx-auto px-6 py-16 sm:py-24 lg:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-button leading-tight">
            Manage Your Business,
            <span className="text-primary block">Smarter & Faster.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            GR Billing is the all-in-one solution for small businesses. From billing and inventory to printing and analytics, we've got you covered. Focus on growing your business, we'll handle the rest.
          </p>
          <div className="mt-8 flex justify-center md:justify-start space-x-4">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
              Download App
            </a>
            <a href="#/contact" className="bg-gray-200 text-button px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-all duration-300">
              Contact Sales
            </a>
          </div>
        </div>
        <div>
          <img src="https://picsum.photos/seed/businessApp/600/500" alt="GR Billing App Screenshot" className="rounded-lg shadow-2xl" />
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection: React.FC = () => (
  <section className="py-16 sm:py-24">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-button mb-4">Everything You Need to Succeed</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
        Our powerful features are designed to simplify your daily operations and boost your productivity.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-button mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CtaSection: React.FC = () => (
    <section className="bg-primary">
        <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
                Join thousands of satisfied business owners who trust GR Billing.
                Download the app today and experience the difference.
            </p>
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="bg-secondary text-white px-10 py-4 rounded-lg font-semibold text-xl hover:opacity-90 transition-opacity duration-300 transform hover:scale-105 inline-block">
                Get GR Billing Now
            </a>
        </div>
    </section>
);


const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </>
  );
};

export default HomePage;
