import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/Contact';
import HomePage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicy';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (route) {
      case '#/about':
        return <AboutPage />;
      case '#/contact':
        return <ContactPage />;
      case '#/privacy':
        return <PrivacyPolicyPage />;
      case '#/admin':
        return <AdminPage />;
      case '#/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
