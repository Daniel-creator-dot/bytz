import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Services from './Services';
import Solutions from './Solutions';
import Portfolio from './Portfolio';
import StudentPortal from './StudentPortal';
import Contact from './Contact';
import Careers from './Careers';
import Academy from './Academy';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [navData, setNavData] = useState<any>(null);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const handleNavigate = (page: string, data?: any) => {
    setActivePage(page);
    setNavData(data);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home onNavigate={handleNavigate} />;
      case 'about': return <About />;
      case 'services': 
      case 'services-software':
      case 'services-support':
      case 'services-network':
      case 'services-cyber':
      case 'services-cloud':
        return <Services />;
      case 'solutions': return <Solutions onNavigate={handleNavigate} />;
      case 'academy': return <Academy onNavigate={handleNavigate} />;
      case 'portfolio': return <Portfolio onNavigate={handleNavigate} />;
      case 'portal': return <StudentPortal navData={navData} />;
      case 'contact': return <Contact />;
      case 'careers': return <Careers onNavigate={handleNavigate} />;
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {activePage !== 'portal' && <Navbar activePage={activePage} onNavigate={handleNavigate} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {activePage !== 'portal' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}
