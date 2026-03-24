import React from 'react';
import { motion } from 'motion/react';
import { Rocket, MapPin, CalendarDays, ArrowRight, Search, Filter, GraduationCap, Banknote } from 'lucide-react';

const jobs = [
  {
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Accra',
    type: 'Full-time',
  },
  {
    title: 'Cybersecurity Analyst',
    department: 'Security',
    location: 'Accra',
    type: 'Full-time',
  },
  {
    title: 'IT Support Specialist',
    department: 'Support',
    location: 'Accra',
    type: 'Full-time',
  },
  {
    title: 'Cloud Infrastructure Engineer',
    department: 'DevOps',
    location: 'Accra',
    type: 'Full-time',
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Accra',
    type: 'Contract',
  },
  {
    title: 'Software Engineering Intern',
    department: 'Engineering',
    location: 'Accra',
    type: 'Internship',
  }
];

export default function Careers({ onNavigate }: { onNavigate: (page: string) => void }) {
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
            Join the Bytz Buddiz Team
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We're looking for passionate individuals to help us build the future of technology. Explore our open positions and find your next challenge.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Innovative Projects', desc: 'Work on cutting-edge technology for diverse industries around the globe.', icon: <Rocket className="w-8 h-8" /> },
              { title: 'Flexible Work', desc: 'We offer remote-first and hybrid work options to support your work-life balance.', icon: <CalendarDays className="w-8 h-8" /> },
              { title: 'Growth & Learning', desc: 'Generous budget for certifications, courses, and professional development.', icon: <GraduationCap className="w-8 h-8" /> },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl font-bold text-slate-900 font-display">Open Positions</h2>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button className="bg-white border border-slate-200 p-3 rounded-xl text-slate-500 hover:text-indigo-600">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md">{job.department}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{job.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</div>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Placeholder */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white">
            <h2 className="text-4xl font-bold font-display mb-6">Don't see a perfect fit?</h2>
            <p className="text-xl text-slate-400 mb-10">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
            >
              Submit General Application
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
