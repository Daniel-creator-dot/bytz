import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Heart, History, Award, Users, Zap, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2070" 
            alt="Office" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white font-display mb-6"
          >
            About Bytz Buddiz
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We are a team of passionate technology enthusiasts dedicated to solving complex business problems through innovative IT solutions.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://plus.unsplash.com/premium_photo-1707155465527-c5a2935b21cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBwZW9wbGUlMjBhdCUyMHdvcmt8ZW58MHx8MHx8fDA%3D" 
                alt="Our Team" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-indigo-600 text-white p-8 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold mb-1">14+</div>
                <div className="text-sm font-medium uppercase tracking-wider">Years of Excellence</div>
              </div>
            </div>
            <div>
              <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Story</h2>
              <h3 className="text-4xl font-bold text-slate-900 font-display mb-6">Empowering Digital Transformation Since 2012</h3>
              <p className="text-lg text-slate-600 mb-6">
                Founded in 2012, Bytz Buddiz started with a simple mission: to make enterprise-grade technology accessible to businesses of all sizes. What began as a small team of three developers has grown into a full-service IT solution center with over 50 experts.
              </p>
              <p className="text-lg text-slate-600">
                Today, we serve hundreds of clients across various industries, including education, healthcare, retail, and manufacturing. Our commitment to innovation and customer success remains at the heart of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                To provide innovative, reliable, and scalable IT solutions that empower organizations to achieve their full potential in an ever-evolving digital landscape.
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-8">
                <Eye className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                To be the global leader in digital transformation, recognized for our technical excellence, creative problem-solving, and unwavering commitment to client success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Values</h2>
            <h3 className="text-4xl font-bold text-slate-900 font-display mb-6">The Principles That Guide Us</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Innovation', desc: 'We constantly explore new technologies and creative approaches to solve problems.', icon: <Zap className="w-6 h-6" /> },
              { title: 'Integrity', desc: 'We build trust through transparency, honesty, and ethical business practices.', icon: <Shield className="w-6 h-6" /> },
              { title: 'Excellence', desc: 'We strive for perfection in every line of code and every support ticket we handle.', icon: <Award className="w-6 h-6" /> },
              { title: 'Collaboration', desc: 'We work closely with our clients as partners to achieve shared goals.', icon: <Users className="w-6 h-6" /> },
              { title: 'Reliability', desc: 'Our clients can count on us to be there when they need us most, 24/7.', icon: <History className="w-6 h-6" /> },
              { title: 'Passion', desc: 'We love what we do, and that passion reflects in the quality of our work.', icon: <Heart className="w-6 h-6" /> },
            ].map((value) => (
              <div key={value.title} className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-indigo-600">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h4>
                <p className="text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Team</h2>
            <h3 className="text-4xl font-bold text-slate-900 font-display mb-6">Meet the Experts Behind Bytz Buddiz</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Kwame Osei', role: 'CEO & Founder', image: '' },
              { name: 'Abena Appiah', role: 'CTO', image: '' },
              { name: 'Yaw Boateng', role: 'Head of Cybersecurity', image: '' },
              { name: 'Akosua Addo', role: 'Lead Software Architect', image: '' },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h4 className="text-xl font-bold text-slate-900">{member.name}</h4>
                <p className="text-slate-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
