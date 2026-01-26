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
            <a href="https://play.google.com/store/apps/details?id=com.bill_app" target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
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
      <a href="https://play.google.com/store/apps/details?id=com.bill_app" target="_blank" rel="noopener noreferrer" className="bg-secondary text-white px-10 py-4 rounded-lg font-semibold text-xl hover:opacity-90 transition-opacity duration-300 transform hover:scale-105 inline-block">
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
      <FloatingContactButton />
    </>
  );
};

const FloatingContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const whatsappNumber = '919783008107'; // replace with your full number including country code
  const phoneNumber = '919783008107'; // phone number for calling
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello! I need help with GR Billing')}`;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Dropdown Menu */}
        <div
          className={`absolute bottom-0 right-0 pb-20 transition-all duration-300 ease-out ${isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
        >
          <div className="flex flex-col items-stretch space-y-2">
            {/* Call Option */}
            <a
              href={`tel:+${phoneNumber}`}
              className="bg-white hover:bg-gray-50 text-gray-800 px-5 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center space-x-3 transition-all duration-200 transform hover:scale-105 min-w-[160px]"
            >
              <div className="bg-purple-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="font-medium text-sm">Call Us</span>
            </a>

            {/* Email Option */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushii.jain7459@gmail.com&cc=dilip.prajapati0078@gmail.com&su=Inquiry about GR Billing&body=Hello GR Billing Team,%0D%0A%0D%0AI would like to know more about your services.%0D%0A%0D%0AThank you!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 text-gray-800 px-5 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center space-x-3 transition-all duration-200 transform hover:scale-105 min-w-[160px]"
            >
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium text-sm">Email Us</span>
            </a>

            {/* WhatsApp Option */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 text-gray-800 px-5 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center space-x-3 transition-all duration-200 transform hover:scale-105 min-w-[160px]"
            >
              <div className="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="font-medium text-sm">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Main FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contact us"
          className="bg-secondary hover:bg-opacity-90 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-7 w-7 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );

};


export default HomePage;
