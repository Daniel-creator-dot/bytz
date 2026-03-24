import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, Code2, Laptop, Users, Star, 
  Clock, Calendar, CheckCircle2, ArrowRight,
  PlayCircle, Award, Globe, Search, GraduationCap,
  Database, Smartphone, ShieldAlert, Sparkles, Headset
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    category: 'Web Development',
    level: 'Beginner to Advanced',
    duration: '12 Weeks',
    rating: 4.9,
    students: 450,
    price: 'GH₵ 2,500',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    instructor: 'Abena Appiah',
    description: 'Master HTML, CSS, JavaScript, React, and Node.js to build modern web applications.'
  },
  {
    id: 2,
    title: 'Python for Data Science',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '8 Weeks',
    rating: 4.8,
    students: 320,
    price: 'GH₵ 1,800',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    instructor: 'Kwame Osei',
    description: 'Learn Python programming and its application in data analysis, visualization, and machine learning.'
  },
  {
    id: 3,
    title: 'Mobile App Development (Flutter)',
    category: 'Mobile Development',
    level: 'Beginner',
    duration: '10 Weeks',
    rating: 4.7,
    students: 210,
    price: 'GH₵ 2,200',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    instructor: 'Akosua Addo',
    description: 'Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.'
  },
  {
    id: 4,
    title: 'Cybersecurity Fundamentals',
    category: 'Security',
    level: 'Beginner',
    duration: '6 Weeks',
    rating: 4.9,
    students: 180,
    price: 'GH₵ 1,500',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    instructor: 'Yaw Boateng',
    description: 'Understand the basics of network security, ethical hacking, and data protection.'
  }
];

export default function Academy() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const categories = ['All', 'Web Development', 'Data Science', 'Mobile Development', 'Security'];
  
  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  const handleRegister = (course: any) => {
    setSelectedCourse(course);
    setShowRegisterModal(true);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2071" 
            alt="Students learning" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block py-2 px-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-bold mb-6 tracking-wider uppercase">
              Bytz Buddiz Academy
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white font-display mb-8">
              Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Programming</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Join Ghana's leading tech academy. Learn from industry experts, build real-world projects, and launch your career in technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                Explore Courses
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2">
                <PlayCircle className="w-6 h-6" /> Watch Intro
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Students', value: '800+', icon: <Users className="w-6 h-6 text-indigo-600" /> },
              { label: 'Courses', value: '12+', icon: <GraduationCap className="w-6 h-6 text-indigo-600" /> },
              { label: 'Expert Mentors', value: '8+', icon: <Sparkles className="w-6 h-6 text-indigo-600" /> },
              { label: 'Success Rate', value: '96%', icon: <Award className="w-6 h-6 text-indigo-600" /> },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Courses</h2>
              <h3 className="text-4xl font-bold text-slate-900 font-display">Choose Your Learning Path</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="text-sm font-bold text-slate-400">{course.rating} ({course.students} students)</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h4>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-2">{course.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <CheckCircle2 className="w-4 h-4" /> {course.level}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-widest">Price</div>
                      <div className="text-2xl font-bold text-indigo-600">{course.price}</div>
                    </div>
                    <button 
                      onClick={() => handleRegister(course)}
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Learning Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-3">Online Classes</h2>
              <h3 className="text-4xl font-bold text-slate-900 font-display mb-8">Learn Anywhere, Anytime</h3>
              <p className="text-lg text-slate-600 mb-10">
                Our online learning platform is designed to provide an immersive classroom experience from the comfort of your home. Get access to live sessions, recorded lectures, and interactive coding environments.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Live Interactive Sessions', desc: 'Join real-time classes and interact with instructors and fellow students.', icon: <Globe className="w-6 h-6 text-indigo-600" /> },
                  { title: 'Recorded Lectures', desc: 'Missed a class? Access all session recordings at any time from your dashboard.', icon: <PlayCircle className="w-6 h-6 text-indigo-600" /> },
                  { title: 'Cloud Coding Environment', desc: 'Code directly in your browser without any complex local setup.', icon: <Code2 className="w-6 h-6 text-indigo-600" /> },
                  { title: '24/7 Mentor Support', desc: 'Get your questions answered by our dedicated mentors via chat or video call.', icon: <Headset className="w-6 h-6 text-indigo-600" /> },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="shrink-0 mt-1 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                      {item.icon}
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
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2070" 
                  alt="Online learning platform" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-indigo-600/10 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                    <PlayCircle className="w-10 h-10 text-indigo-600" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">Certified</div>
                    <div className="text-sm text-slate-500">Industry Recognized</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">Earn a certificate upon completion to boost your professional profile.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal Placeholder */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowRegisterModal(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="bg-indigo-600 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Register for Course</h3>
              <p className="text-indigo-100">{selectedCourse?.title}</p>
            </div>
            <div className="p-8">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Registration successful! We will contact you soon.'); setShowRegisterModal(false); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                    <input type="text" placeholder="Kofi Mensah" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                    <input type="email" placeholder="kofi@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phone Number</label>
                  <input type="tel" placeholder="+233 24 123 4567" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Experience Level</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                    Confirm Registration
                  </button>
                  <button type="button" onClick={() => setShowRegisterModal(false)} className="w-full mt-2 text-slate-400 font-bold py-2 hover:text-slate-600">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-8">Ready to Start Your Tech Journey?</h2>
              <p className="text-xl text-slate-400 mb-10">
                Don't wait for the future, build it. Join our next cohort and become a world-class developer.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                  Apply Now
                </button>
                <button className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                  Contact Admissions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
