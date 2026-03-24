import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { 
    label: 'Services', 
    href: 'services',
    children: [
      { label: 'Software Development', href: 'services-software' },
      { label: 'IT Support', href: 'services-support' },
      { label: 'Network & Infrastructure', href: 'services-network' },
      { label: 'Cybersecurity', href: 'services-cyber' },
      { label: 'Cloud Solutions', href: 'services-cloud' },
    ]
  },
  { label: 'Solutions', href: 'solutions' },
  { label: 'Academy', href: 'academy' },
  { label: 'Portfolio', href: 'portfolio' },
  { label: 'Careers', href: 'careers' },
  { label: 'Contact', href: 'contact' },
];

export default function Navbar({ activePage, onNavigate }: { activePage: string, onNavigate: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = activePage === 'home';
  const isTransparent = isHome && !scrolled && !isOpen;

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isTransparent ? "bg-transparent py-5" : "bg-white/95 backdrop-blur-md shadow-md py-3"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className={cn(
              "text-xl font-bold tracking-tight font-display transition-colors duration-300",
              isTransparent ? "text-white" : "text-slate-900"
            )}>
              Bytz Buddiz
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  onClick={() => onNavigate(item.href)}
                  className={cn(
                    "text-sm font-semibold transition-all duration-300 flex items-center gap-1",
                    activePage === item.href 
                      ? "text-indigo-600" 
                      : (isTransparent ? "text-white/90 hover:text-white" : "text-slate-600 hover:text-indigo-600")
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className={cn("w-4 h-4 transition-transform group-hover:rotate-180", isTransparent ? "text-white/50" : "text-slate-400")} />}
                </button>
                
                {item.children && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-3 grid gap-1">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => onNavigate(child.href)}
                          className="w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <button 
              onClick={() => onNavigate('portal')}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg",
                isTransparent 
                  ? "bg-white text-indigo-600 hover:bg-indigo-50 shadow-white/10" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20"
              )}
            >
              Client Portal
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-xl transition-colors",
                isTransparent ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      onNavigate(item.href);
                      if (!item.children) setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex justify-between items-center"
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-4 h-4" />}
                  </button>
                  {item.children && (
                    <div className="pl-6 space-y-1 bg-slate-50 rounded-lg mb-2">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => {
                            onNavigate(child.href);
                            setIsOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-indigo-600"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => {
                  onNavigate('portal');
                  setIsOpen(false);
                }}
                className="w-full mt-4 bg-indigo-600 text-white px-5 py-3 rounded-xl text-center font-semibold"
              >
                Client Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
