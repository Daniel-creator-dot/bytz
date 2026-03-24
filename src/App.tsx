import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Services from './Services';
import Solutions from './Solutions';
import Portfolio from './Portfolio';
import ClientPortal from './ClientPortal';
import Contact from './Contact';
import Careers from './Careers';
import Academy from './Academy';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home onNavigate={setActivePage} />;
      case 'about': return <About />;
      case 'services': 
      case 'services-software':
      case 'services-support':
      case 'services-network':
      case 'services-cyber':
      case 'services-cloud':
        return <Services />;
      case 'solutions': return <Solutions onNavigate={setActivePage} />;
      case 'academy': return <Academy />;
      case 'portfolio': return <Portfolio onNavigate={setActivePage} />;
      case 'portal': return <ClientPortal />;
      case 'contact': return <Contact />;
      case 'careers': return <Careers onNavigate={setActivePage} />;
      default: return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      {activePage !== 'portal' && <Footer onNavigate={setActivePage} />}
    </div>
  );
}
