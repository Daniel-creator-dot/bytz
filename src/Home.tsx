import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, CheckCircle2, Users, ShieldCheck, Zap, 
  CloudLightning, Award, Cpu, PlayCircle, Code2, 
  Headset, Network, Workflow, Rocket, Fingerprint,
  Trophy, Medal, Star
} from 'lucide-react';

export default function Home({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <motion.div 
          style={{ y: y1, scale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2069" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[1px]"></div>
        </motion.div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ opacity }}
            >
              <span className="inline-block py-2 px-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-bold mb-8 tracking-wider uppercase">
                Complete IT Solution Center
              </span>
              <h1 className="text-6xl md:text-8xl font-bold text-white font-display leading-[1.1] mb-8">
                The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Technology</span> is Here
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl">
                Empowering your digital journey with expert software development, robust cybersecurity, and seamless cloud infrastructure.
              </p>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/40 flex items-center gap-3 group"
                >
                  Get a Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => onNavigate('services')}
                  className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3"
                >
                  Explore Services
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-0 right-0 hidden lg:block">
          <div className="container-custom">
            <div className="grid grid-cols-4 gap-8">
              {[
                { label: 'Projects Completed', value: '150+' },
                { label: 'Happy Clients', value: '80+' },
                { label: 'Expert Engineers', value: '25+' },
                { label: 'Years Experience', value: '14+' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl"
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Highlights */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Expertise</h2>
            <h3 className="text-4xl font-bold text-slate-900 font-display mb-6">Core Technology Services</h3>
            <p className="text-lg text-slate-600">We provide a comprehensive suite of IT services designed to help your organization thrive in the digital age.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Software Development', 
                desc: 'Custom business systems, web and mobile applications tailored to your specific needs.',
                icon: <Code2 className="w-8 h-8" />
              },
              { 
                title: 'Cybersecurity', 
                desc: 'Protect your digital assets with our advanced security audits, firewalls, and data protection.',
                icon: <ShieldCheck className="w-8 h-8" />
              },
              { 
                title: 'Cloud Solutions', 
                desc: 'Scalable cloud hosting, storage, and migration services for modern enterprises.',
                icon: <CloudLightning className="w-8 h-8" />
              },
              { 
                title: 'IT Support', 
                desc: '24/7 remote and on-site support to keep your systems running smoothly.',
                icon: <Headset className="w-8 h-8" />
              },
              { 
                title: 'Network Infrastructure', 
                desc: 'Robust LAN/WAN setup, server installation, and network monitoring solutions.',
                icon: <Network className="w-8 h-8" />
              },
              { 
                title: 'Digital Transformation', 
                desc: 'Strategic consulting to modernize your business processes and boost efficiency.',
                icon: <Workflow className="w-8 h-8" />
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
                <p className="text-slate-600 mb-6">{service.desc}</p>
                <button 
                  onClick={() => onNavigate('services')}
                  className="text-indigo-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Why Bytz Buddiz</h2>
              <h3 className="text-4xl font-bold text-slate-900 font-display mb-8">Your Trusted Partner for Digital Excellence</h3>
              <p className="text-lg text-slate-600 mb-10">
                We don't just provide services; we build long-term partnerships. Our team of certified experts is dedicated to delivering innovative solutions that solve real business challenges.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Certified Experts', desc: 'Our team holds top industry certifications from Microsoft, Cisco, and AWS.' },
                  { title: 'Customer-Centric Approach', desc: 'We tailor our solutions to fit your unique business requirements and goals.' },
                  { title: '24/7 Proactive Support', desc: 'Our support team is always available to ensure your business never stops.' },
                  { title: 'Proven Track Record', desc: 'Over a decade of experience delivering successful IT projects globally.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://www.shutterstock.com/image-photo/corporate-spirit-diverse-team-young-600nw-2412728581.jpg" 
                  alt="Team working" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">98%</div>
                    <div className="text-sm text-slate-500">Client Satisfaction</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic">"Bytz Buddiz transformed our legacy systems into a modern cloud infrastructure in record time."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Solutions */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Industry Solutions</h2>
              <h3 className="text-4xl font-bold text-slate-900 font-display">Packaged Systems for Your Industry</h3>
            </div>
            <button 
              onClick={() => onNavigate('solutions')}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              View All Solutions <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
            { title: 'Hospital Management', category: 'Healthcare', image: 'https://images.pexels.com/photos/4989132/pexels-photo-4989132.jpeg' },
              { title: 'ERP Systems', category: 'Enterprise', image: 'https://gosolutions.group/wp-content/uploads/2018/05/BEE-help.jpg' },
            ].map((solution) => (
              <div key={solution.title} className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={solution.image} 
                    alt={solution.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 bg-white">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 block">{solution.category}</span>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">{solution.title}</h4>
                  <button 
                    onClick={() => onNavigate('solutions')}
                    className="text-slate-900 font-semibold flex items-center gap-2 group-hover:text-indigo-600 transition-colors"
                  >
                    Request Demo <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Teaser Section */}
      <section className="section-padding bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2070" 
            alt="Academy Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block py-2 px-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-bold mb-6 tracking-wider uppercase">
                Bytz Buddiz Academy
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-tight">
                Learn Programming from <span className="text-indigo-400">Industry Experts</span>
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                We don't just build software; we build developers. Join our academy to learn Web Development, Python, Mobile Apps, and more. Online and on-site classes available.
              </p>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => onNavigate('academy')}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/40 flex items-center gap-2"
                >
                  Explore Courses <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4 text-indigo-300">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                        {i === 4 ? '+2k' : <Users className="w-4 h-4" />}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium">Joined by 2,500+ students</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2071" 
                  alt="Students coding" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                      <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Next Cohort Starts Soon</div>
                      <div className="text-sm text-slate-300">Register now to secure your spot</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-indigo-600 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-200 font-semibold tracking-wide uppercase text-sm mb-3">Testimonials</h2>
            <h3 className="text-4xl font-bold font-display">What Our Clients Say</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Kofi Mensah', role: 'CEO, Mensah Logistics', text: 'Bytz Buddiz delivered our custom tracking system ahead of schedule and it has completely transformed our operations.' },
              { name: 'Ama Serwaa', role: 'Principal, Legacy International', text: 'The school management system they built for us is intuitive, powerful, and has saved us hundreds of hours in admin work.' },
              { name: 'Kwame Boateng', role: 'Founder, PayGhana', text: 'Their cybersecurity audit was eye-opening. We now feel much more secure knowing our data is protected by the best.' },
            ].map((t) => (
              <div key={t.name} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-lg mb-8 italic">"{t.text}"</p>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-indigo-200 text-sm">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-8">Ready to Transform Your Business Technology?</h2>
              <p className="text-xl text-slate-400 mb-10">
                Contact us today for a free consultation and let's discuss how our IT solutions can help your organization grow.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
                >
                  Contact Us Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
