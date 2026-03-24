import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, Stethoscope, Contact2, UserPlus, 
  Store, Boxes, Building2, ArrowRight,
  CheckCircle2, Layout, Settings, BarChart3, ShieldCheck
} from 'lucide-react';

const solutions = [

  {
    title: 'Hospital Management System',
    icon: <Stethoscope className="w-10 h-10" />,
    category: 'Healthcare',
    desc: 'Streamline patient care, appointments, billing, and medical records.',
    features: ['Patient Records', 'Appointment Scheduling', 'Billing & Insurance', 'Pharmacy Inventory', 'Lab Reports'],
    image: 'https://images.pexels.com/photos/4989132/pexels-photo-4989132.jpeg'
  },
  {
    title: 'HR & Payroll System',
    icon: <Contact2 className="w-10 h-10" />,
    category: 'Enterprise',
    desc: 'Manage your workforce, attendance, and payroll with ease.',
    features: ['Employee Database', 'Payroll Processing', 'Leave Management', 'Performance Reviews', 'Tax Compliance'],
    image: 'https://www.oxbridgeacademy.edu.za/blog/wp-content/uploads/2023/09/pexels-anna-shvets-3727457-1200x640.jpg'
  },
  {
    title: 'POS & Retail System',
    icon: <Store className="w-10 h-10" />,
    category: 'Retail',
    desc: 'Powerful point of sale and inventory management for retail businesses.',
    features: ['Sales Processing', 'Inventory Tracking', 'Customer Loyalty', 'Supplier Management', 'Sales Reports'],
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'ERP Systems',
    icon: <Building2 className="w-10 h-10" />,
    category: 'Enterprise',
    desc: 'Integrated management of core business processes in real-time.',
    features: ['Financial Accounting', 'Supply Chain', 'Manufacturing', 'CRM Integration', 'Business Intelligence'],
    image: 'https://gosolutions.group/wp-content/uploads/2018/05/BEE-help.jpg'
  },
  {
    title: 'Inventory Management',
    icon: <Boxes className="w-10 h-10" />,
    category: 'Logistics',
    desc: 'Track stock levels, orders, sales, and deliveries efficiently.',
    features: ['Stock Alerts', 'Barcode Scanning', 'Warehouse Management', 'Order Fulfillment', 'Audit Logs'],
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQGgATVsp_150A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1715811893978?e=2147483647&v=beta&t=AotkpnsKun9rD0w6vHUAkSE_yLmlHwDN0UIx701jCOk'
  }
];

export default function Solutions({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-slate-50 py-24">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 font-display mb-6"
          >
            Industry Solutions
          </motion.h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ready-to-deploy systems designed to solve specific challenges in your industry.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-16">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row gap-12 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                      <img 
                        src={sol.image} 
                        alt={sol.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                          <BarChart3 className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">Real-time Analytics</div>
                          <div className="text-xs text-slate-500">Built-in reporting</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-indigo-600">{sol.icon}</div>
                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">{sol.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display mb-6">{sol.title}</h2>
                  <p className="text-lg text-slate-600 mb-8">{sol.desc}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {sol.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => onNavigate('contact')}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                    >
                      Request Demo
                    </button>
                    <button 
                      onClick={() => onNavigate('contact')}
                      className="bg-white text-slate-900 border border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all"
                    >
                      View Features
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Core Features</h2>
            <h3 className="text-4xl font-bold text-slate-900 font-display mb-6">Standard in Every Solution</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'User Friendly', desc: 'Intuitive interfaces designed for maximum productivity and minimal training.', icon: <Layout className="w-8 h-8" /> },
              { title: 'Highly Customizable', desc: 'We tailor every system to match your specific business workflows.', icon: <Settings className="w-8 h-8" /> },
              { title: 'Secure & Scalable', desc: 'Built on modern architecture that grows with your organization.', icon: <ShieldCheck className="w-8 h-8" /> },
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h4>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
