import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, Code2, Laptop, Users, Star, 
  Clock, Calendar, CheckCircle2, ArrowRight,
  PlayCircle, Award, Globe, Search, GraduationCap,
  Database, Smartphone, ShieldAlert, Sparkles, Headset
} from 'lucide-react';

export default function Academy({ onNavigate }: { onNavigate: (page: string, data?: any) => void }) {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://bytzapi.onrender.com/api/courses');
      const result = await response.json();
      if (result.success) {
        // Add default UI fields that might not be in the database
        const enrichedCourses = result.data.map((course: any) => ({
          ...course,
          rating: course.rating || 4.8,
          students: course.students || Math.floor(Math.random() * 500) + 100,
          level: course.level || 'Beginner',
          image: course.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
        }));
        setCourses(enrichedCourses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Web Development', 'Programming', 'Data Science', 'Mobile Development', 'Design'];
  
  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  const handleRegister = (course: any) => {
    onNavigate('portal', { courseId: course.id });
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
              <button 
                onClick={() => onNavigate('portal')}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
              >
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
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-full text-center py-20 text-slate-500">
                No courses found for this category.
              </div>
            ) : filteredCourses.map((course) => (
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
                <button 
                  onClick={() => onNavigate('portal')}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
                >
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
