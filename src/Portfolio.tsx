import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Search, Filter } from 'lucide-react';

const projects = [

  {
    title: 'HealthSync ERP',
    category: 'Healthcare',
    client: 'Ridge Medical Centre',
    desc: 'Integrated hospital management system for patient records, billing, and pharmacy.',
    image: 'https://www.shutterstock.com/shutterstock/videos/6645038/thumb/1.jpg'
  },
  {
    title: 'RetailFlow POS',
    category: 'Retail',
    client: 'Melcom Group',
    desc: 'Cloud-based POS system with real-time inventory tracking across 20 locations.',
    image: 'https://img.freepik.com/free-photo/african-american-bellhop-pointing-pos-terminal-asking-payment_482257-115414.jpg?semt=ais_rp_50_assets&w=740&q=80'
  },
  {
    title: 'SecureNet Audit',
    category: 'Cybersecurity',
    client: 'PayGhana Solutions',
    desc: 'Complete security infrastructure overhaul and 24/7 monitoring setup.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'CloudMigrate',
    category: 'Cloud Solutions',
    client: 'Mensah Logistics',
    desc: 'Seamless migration of legacy on-premise servers to a hybrid cloud environment.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Portfolio({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-slate-900 py-24">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white font-display mb-6"
          >
            Our Portfolio
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Explore our successfully completed projects and see how we've helped businesses transform their technology.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['All Projects', 'Software', 'Network', 'Cybersecurity', 'Cloud', 'Education'].map((filter, i) => (
              <button 
                key={filter}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-indigo-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => onNavigate('contact')}
                      className="bg-white text-indigo-600 p-4 rounded-full shadow-xl"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 block">{project.category}</span>
                      <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-6">{project.desc}</p>
                  <div className="pt-6 border-t border-slate-100">
                    <div className="text-sm text-slate-400 mb-1 uppercase tracking-widest font-bold">Client</div>
                    <div className="font-bold text-slate-900">{project.client}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Feedback */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Success Stories</h2>
            <h3 className="text-4xl font-bold text-slate-900 font-display mb-6">What Our Clients Say</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Dr. Kwabena Wilson', role: 'Medical Director', text: 'The hospital system Bytz Buddiz built for us has reduced patient waiting times by 40% and streamlined our entire billing process.' },
              { name: 'Alice Thompson', role: 'Principal, St. Mary\'s', text: 'Our staff and parents love the new school portal. It\'s reliable, secure, and incredibly easy to use.' },
            ].map((feedback) => (
              <div key={feedback.name} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex gap-1 mb-6 text-yellow-400">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-xl text-slate-600 mb-8 italic leading-relaxed">"{feedback.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {feedback.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{feedback.name}</div>
                    <div className="text-sm text-slate-500">{feedback.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
