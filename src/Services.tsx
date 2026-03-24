import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, MonitorSmartphone, Network, ShieldCheck, CloudLightning, Cpu, 
  Globe, Search, Palette, Smartphone, Database, Server,
  ArrowRight, CheckCircle2, Headset, LayoutDashboard
} from 'lucide-react';

const services = [
  {
    id: 'software',
    title: 'Software Development',
    icon: <Code2 className="w-8 h-8" />,
    desc: 'Custom software solutions built to scale with your business.',
    items: ['Custom business systems', 'Web applications', 'Mobile applications', 'System integrations', 'API Development']
  },
  {
    id: 'support',
    title: 'IT Support & Maintenance',
    icon: <Headset className="w-8 h-8" />,
    desc: 'Reliable support to keep your business running 24/7.',
    items: ['Computer repair', 'System troubleshooting', 'Software installation', 'Remote support', 'On-site maintenance']
  },
  {
    id: 'network',
    title: 'Network & Infrastructure',
    icon: <Network className="w-8 h-8" />,
    desc: 'Robust and secure networking solutions for your office.',
    items: ['LAN/WAN setup', 'Server installation', 'WiFi deployment', 'Network monitoring', 'Structured cabling']
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    icon: <ShieldCheck className="w-8 h-8" />,
    desc: 'Protect your data and systems from evolving threats.',
    items: ['Firewall setup', 'Security audits', 'Data protection', 'Backup & recovery', 'Threat monitoring']
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    icon: <CloudLightning className="w-8 h-8" />,
    desc: 'Modernize your business with scalable cloud infrastructure.',
    items: ['Cloud hosting', 'Cloud storage', 'Email hosting', 'Cloud migration', 'SaaS implementation']
  },
  {
    id: 'hardware',
    title: 'Hardware Supply',
    icon: <Cpu className="w-8 h-8" />,
    desc: 'Quality hardware and devices from trusted manufacturers.',
    items: ['Computers & laptops', 'Printers & scanners', 'Servers & storage', 'CCTV systems', 'Biometric systems']
  },
  {
    id: 'digital',
    title: 'Digital Services',
    icon: <LayoutDashboard className="w-8 h-8" />,
    desc: 'Boost your online presence and reach more customers.',
    items: ['Website development', 'SEO optimization', 'Branding & Design', 'Domain registration', 'Web hosting']
  }
];

export default function Services() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-indigo-600 py-24 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white font-display mb-6"
          >
            Our Services
          </motion.h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Comprehensive IT solutions tailored to help your business thrive in the digital age.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-12 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                    <p className="text-slate-600 text-lg mb-8">{service.desc}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {service.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="bg-white text-indigo-600 border border-indigo-100 px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
                      Get Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="section-padding bg-slate-900 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-3">Our Process</h2>
            <h3 className="text-4xl font-bold font-display mb-6">How We Deliver Excellence</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We discuss your needs and goals to understand the project scope.' },
              { step: '02', title: 'Planning', desc: 'Our experts create a detailed roadmap and technical architecture.' },
              { step: '03', title: 'Execution', desc: 'We build and implement the solution using the latest technologies.' },
              { step: '04', title: 'Support', desc: 'We provide ongoing maintenance and support to ensure success.' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-white/5 mb-6">{item.step}</div>
                <div className="absolute top-8 left-0">
                  <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-indigo-50 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-slate-900 font-display mb-6">Need a Custom IT Solution?</h2>
              <p className="text-lg text-slate-600">
                Our team is ready to help you build the technology your business needs to succeed. Contact us today for a free consultation.
              </p>
            </div>
            <button className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 shrink-0">
              Request a Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
