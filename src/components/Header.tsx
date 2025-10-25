import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#/" className="text-2xl font-bold text-primary">
            GR Billing
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="text-gray-600 hover:text-primary transition-colors duration-300 font-medium">
                {link.label}
              </a>
            ))}
            <a href="#/contact" className="bg-secondary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity font-semibold">
              Get Started
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-button focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-primary transition-colors duration-300 font-medium text-center py-2">
                  {link.label}
                </a>
              ))}
              <a href="#/contact" onClick={() => setIsMenuOpen(false)} className="bg-secondary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity font-semibold text-center">
                Get Started
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
