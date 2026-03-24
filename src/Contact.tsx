import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-indigo-600 py-24 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white font-display mb-6"
          >
            Get in Touch
          </motion.h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Have a question or ready to start your project? We're here to help you navigate your technology journey.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 font-display mb-8">Contact Information</h2>
                <p className="text-slate-600 mb-10">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <Phone className="w-6 h-6" />, label: 'Call Us', value: '+233247904675', sub: 'Mon-Fri from 8am to 6pm' },
                  { icon: <Mail className="w-6 h-6" />, label: 'Email Us', value: 'info@bytzbuddiz.com', sub: 'Online support 24/7' },
                  { icon: <MapPin className="w-6 h-6" />, label: 'Visit Us', value: 'Mataheko-prime med care', sub: 'Accra, Ghana' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 shrink-0 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
                      <div className="text-lg font-bold text-slate-900 mb-1">{item.value}</div>
                      <div className="text-sm text-slate-500">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {['FB', 'TW', 'LI', 'IG'].map((social) => (
                    <button key={social} className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold hover:bg-indigo-600 transition-colors">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-indigo-500/10 border border-slate-100">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="John" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+233501602793" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none">
                      <option>Software Development</option>
                      <option>IT Support</option>
                      <option>Cybersecurity</option>
                      <option>Cloud Solutions</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                    <textarea 
                      rows={6} 
                      placeholder="Tell us about your project..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3">
                      Send Message <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] bg-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Interactive Map</h3>
            <p className="text-slate-600">Our office location in Accra Digital Centre</p>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1523213139764-4152559ed1bf?auto=format&fit=crop&q=80&w=2066" 
          alt="Map" 
          className="w-full h-full object-cover opacity-50 grayscale"
          referrerPolicy="no-referrer"
        />
      </section>
    </div>
  );
}
