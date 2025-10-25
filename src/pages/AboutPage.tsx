import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary">About GR Billing</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We are a team of passionate innovators dedicated to empowering small businesses with cutting-edge technology.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-button mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our mission is to provide an affordable, intuitive, and powerful billing and inventory management solution that helps entrepreneurs and small business owners streamline their operations. We believe that by simplifying complex tasks, we can free up your valuable time to focus on what truly matters: growing your business and serving your customers.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We strive to continuously improve GR Billing by listening to our users and integrating features that solve real-world problems. Your success is our success.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img src="https://picsum.photos/seed/teamwork/600/400" alt="Our Team" className="rounded-lg shadow-xl"/>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://picsum.photos/seed/vision/600/400" alt="Our Vision" className="rounded-lg shadow-xl"/>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-button mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We envision a world where every small business has access to the same level of technology and tools as large corporations. GR Billing is our first step towards leveling the playing field, making sophisticated business management accessible to everyone, everywhere.
            </p>
             <p className="text-gray-600 leading-relaxed">
              We are committed to building a comprehensive ecosystem of tools that support your business journey from day one to market leader.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
