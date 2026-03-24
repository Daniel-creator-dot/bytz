import React from 'react';
import { Cpu, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

export default function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight font-display text-white">
                Bytz Buddiz
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Empowering businesses with cutting-edge IT solutions. From software development to cybersecurity, we are your complete technology partner.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Solutions', 'Academy', 'Portfolio', 'Careers'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => {
                      const page = link === 'About Us' ? 'about' : link.toLowerCase().replace(' ', '-');
                      onNavigate(page);
                    }}
                    className="hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Our Services</h3>
            <ul className="space-y-4">
              {[
                'Software Development',
                'IT Support & Maintenance',
                'Network & Infrastructure',
                'Cybersecurity',
                'Cloud Solutions',
                'Hardware Supply',
                'Digital Services'
              ].map((service) => (
                <li key={service}>
                  <button 
                    onClick={() => onNavigate('services')}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-1" />
                <span>No. 45 Tech Street, Accra Digital Centre, Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>+233 24 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>info@bytzbuddiz.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Bytz Buddiz IT Solution Center. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
