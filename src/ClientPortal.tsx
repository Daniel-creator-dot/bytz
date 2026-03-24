import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, FolderKanban, Ticket, FileText, 
  MessageSquare, LogOut, Bell, User, Search,
  Clock, CheckCircle2, AlertCircle, ChevronRight
} from 'lucide-react';

export default function ClientPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showAddClient, setShowAddClient] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-slate-100"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 font-display mb-2">Client Portal</h1>
            <p className="text-slate-500">Login to manage your projects and support.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-indigo-600" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-indigo-600 font-bold hover:underline">Forgot password?</button>
            </div>
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account? <button className="text-indigo-600 font-bold hover:underline">Contact your account manager</button>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl mb-8">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">KM</div>
            <div>
              <div className="text-sm font-bold text-slate-900">Kofi Mensah</div>
              <div className="text-xs text-slate-500">Mensah Logistics CEO</div>
            </div>
          </div>
          
          <nav className="space-y-1">
            {[
              { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
              { label: 'My Projects', icon: <FolderKanban className="w-5 h-5" /> },
              { label: 'Add New Client', icon: <User className="w-5 h-5" /> },
              { label: 'Support Tickets', icon: <Ticket className="w-5 h-5" /> },
              { label: 'Invoices', icon: <FileText className="w-5 h-5" /> },
              { label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
            ].map((item) => (
              <button 
                key={item.label}
                onClick={() => {
                  setActiveTab(item.label);
                  if (item.label === 'Add New Client') {
                    setShowAddClient(true);
                  } else {
                    setShowAddClient(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.label ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-100">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 font-display">{activeTab} Overview</h2>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </div>

          {showAddClient ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 max-w-2xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Register New Client</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowAddClient(false); setActiveTab('Dashboard'); }}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" placeholder="Client Co." required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Contact Person</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" placeholder="Full Name" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" placeholder="email@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Service Package</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4">
                    <option>Standard Support</option>
                    <option>Premium Enterprise</option>
                    <option>Custom Solution</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                    Add Client
                  </button>
                  <button type="button" onClick={() => { setShowAddClient(false); setActiveTab('Dashboard'); }} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Active Projects', value: '3', icon: <FolderKanban className="w-6 h-6" />, color: 'indigo' },
              { label: 'Open Tickets', value: '1', icon: <Ticket className="w-6 h-6" />, color: 'amber' },
              { label: 'Pending Invoices', value: '$1,299', icon: <FileText className="w-6 h-6" />, color: 'emerald' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                <div className={`w-14 h-14 rounded-xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Projects */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Active Projects</h3>
                <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { name: 'Logistics Tracker Update', status: 'In Progress', progress: 75, date: 'Mar 20, 2024' },
                  { name: 'Security Audit', status: 'Review', progress: 90, date: 'Mar 15, 2024' },
                  { name: 'Cloud Migration', status: 'Planning', progress: 20, date: 'Apr 05, 2024' },
                ].map((project) => (
                  <div key={project.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-slate-900">{project.name}</div>
                      <div className="text-xs font-bold text-slate-500">{project.progress}%</div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> Due {project.date}</div>
                      <div className="font-bold text-indigo-600 uppercase tracking-wider">{project.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Support Tickets */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Support Tickets</h3>
                <button className="text-indigo-600 text-sm font-bold hover:underline">New Ticket</button>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { id: '#TK-892', subject: 'Email access issue', status: 'Open', priority: 'High', date: '2h ago' },
                  { id: '#TK-885', subject: 'New user setup', status: 'Resolved', priority: 'Medium', date: '1d ago' },
                  { id: '#TK-880', subject: 'Software license renewal', status: 'Resolved', priority: 'Low', date: '3d ago' },
                ].map((ticket) => (
                  <div key={ticket.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${ticket.status === 'Open' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {ticket.status === 'Open' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{ticket.subject}</div>
                        <div className="text-xs text-slate-500">{ticket.id} • {ticket.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${ticket.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                        {ticket.priority}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </>
          )}
        </div>
      </main>
    </div>
  );
}
