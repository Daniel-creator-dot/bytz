import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, FolderKanban, Ticket, FileText, 
  MessageSquare, LogOut, Bell, User, Search,
  Clock, CheckCircle2, AlertCircle, ChevronRight, Award,
  BookOpen, Plus, Calendar, MapPin, Trash2, Pencil, X,
  BarChart3, Edit3, MoreHorizontal
} from 'lucide-react';

export default function StudentPortal({ navData }: { navData?: any }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [portalType, setPortalType] = useState<'student' | 'instructor' | 'superadmin'>('student');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [user, setUser] = useState<any>(null);
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<any>(null); // State for editing course
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false); // State for instructor modal visibility
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false); // State for student modal visibility
  const [students, setStudents] = useState<any[]>([]); // New student state
  const [dashboardStats, setDashboardStats] = useState<any>(null); // New dashboard stats state
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [subjects, setSubjects] = useState<any[]>([]); // Added for subject management
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<number[]>([]); // For multi-select subjects
  const [exams, setExams] = useState<any[]>([]); // New exams state
  const [activeExam, setActiveExam] = useState<any>(null); // State for taking an exam
  const [studentAnswers, setStudentAnswers] = useState<any>({}); // Student's answers during exam
  const [examResult, setExamResult] = useState<any>(null); // Result after submission
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false); // Modal for new assignment
  const [isExamModalOpen, setIsExamModalOpen] = useState(false); // Modal for new exam
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false); // Modal for new question
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null); // Selected course for assignment/exam
  const [editingExam, setEditingExam] = useState<any>(null); // Exam currently being managed for questions
  const [examResults, setExamResults] = useState<any[]>([]); // Results for instructor view
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [assignments, setAssignments] = useState<any[]>([]); // Added assignments state
  const [examDeadline, setExamDeadline] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [awardedCertificates, setAwardedCertificates] = useState<any[]>([]); // New certificate state
  const [awardedCertificatesInstructor, setAwardedCertificatesInstructor] = useState<any[]>([]);
  const [isAwardCertModalOpen, setIsAwardCertModalOpen] = useState(false);
  const [selectedStudentForCert, setSelectedStudentForCert] = useState<any>(null);
  const [pendingSubscriptions, setPendingSubscriptions] = useState<any[]>([]);
  const [approvedSubscriptions, setApprovedSubscriptions] = useState<any[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<any>(null);
  const [activeStudentInvoice, setActiveStudentInvoice] = useState<any>(null);
  const [openStudentDropdownId, setOpenStudentDropdownId] = useState<number | null>(null);
  const [openInstructorDropdownId, setOpenInstructorDropdownId] = useState<number | null>(null);
  const [isResetInstructorPasswordModalOpen, setIsResetInstructorPasswordModalOpen] = useState(false);
  const [selectedInstructorForReset, setSelectedInstructorForReset] = useState<any>(null);
  const [isCertViewerOpen, setIsCertViewerOpen] = useState(false);
  const [activeCert, setActiveCert] = useState<any>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    subject: '' // Added for instructor creation
  });

  const [instructors, setInstructors] = useState<any[]>([]); // Added for superadmin instructor management
  const [timetables, setTimetables] = useState<any[]>([]); // Added for course scheduling
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchInstructorStudents = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:3001/api/students/instructor/${user.id}`);
      const result = await response.json();
      if (result.success) setStudents(result.data);
    } catch (error) {
      console.error('Error fetching instructor students:', error);
    }
  };

  const fetchExams = async () => {
    try {
      let url = 'http://localhost:3001/api/exams';
      if (portalType === 'student' && user) {
        url += `?studentId=${user.id}`;
      } else if (portalType === 'instructor' && user) {
        url += `?instructorId=${user.id}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      if (result.success) setExams(result.data);
    } catch (err) {
      console.error('Error fetching exams:', err);
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/assignments');
      const result = await res.json();
      if (result.success) setAssignments(result.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  const fetchAwardedCertificates = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:3001/api/certificates/student/${user.id}`);
      const result = await res.json();
      if (result.success) setAwardedCertificates(result.data);
    } catch (err) {
      console.error('Error fetching student certificates:', err);
    }
  };

  const fetchInstructorCertificates = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:3001/api/certificates/instructor/${user.id}`);
      const result = await response.json();
      if (result.success) {
        setAwardedCertificatesInstructor(result.data);
      }
    } catch (error) {
      console.error('Error fetching instructor certificates:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admins/stats');
      const result = await response.json();
      if (result.success) setDashboardStats(result.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/students');
      const result = await response.json();
      if (result.success) setStudents(result.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/subjects');
      const result = await response.json();
      if (result.success) setSubjects(result.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
    };
    try {
      const response = await fetch('http://localhost:3001/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        showNotification('Student created successfully!', 'success');
        setIsStudentModalOpen(false);
        fetchStudents();
        form.reset();
      } else {
        showNotification(result.message || 'Failed to create student', 'error');
      }
    } catch (error) {
      showNotification('Error creating student', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      if (portalType === 'student') {
        fetchStudentSubscriptions();
        fetchTimetable();
      } else if (portalType === 'instructor') {
        fetchInstructorCourses();
        fetchTimetable();
        fetchInstructorStudents();
        fetchExams();
      } else if (portalType === 'superadmin') {
        fetchInstructors();
        fetchTimetable();
        fetchStudents();
        fetchStats();
        fetchSubjects();
      }
      fetchAllCourses();
    }
  }, [isLoggedIn, user, portalType]);

  useEffect(() => {
    if (activeTab === 'CBS Exams') {
      fetchExams();
    }
    if (activeTab === 'Certificates' && portalType === 'student') {
      fetchAwardedCertificates();
    }
    if (activeTab === 'Student Progress' && portalType === 'instructor') {
      fetchInstructorStudents();
      fetchInstructorCertificates();
    }
    if (activeTab === 'Manage Enrollments' && portalType === 'superadmin') {
      fetchPendingSubscriptions();
      fetchApprovedSubscriptions();
    }
  }, [activeTab, portalType]);

  const fetchPendingSubscriptions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/subscriptions/pending');
      const result = await response.json();
      if (result.success) {
        setPendingSubscriptions(result.data);
      }
    } catch (error) {
      console.error('Error fetching pending subscriptions:', error);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this student? All their data will be lost.')) return;
    try {
      const res = await fetch(`http://localhost:3001/api/students/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        showNotification('Student deleted successfully', 'success');
        fetchStudents();
      } else {
        showNotification(result.message || 'Failed to delete student', 'error');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      showNotification('Error deleting student', 'error');
    }
  };

  const handlePrintStudentInvoice = async (student: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/subscriptions/approved');
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      if (result.success) {
        const studentSubs = result.data.filter((s: any) => Number(s.student_id) === Number(student.id));
        const total = studentSubs.reduce((sum: number, sub: any) => sum + parseFloat(sub.price || 0), 0);
        setActiveStudentInvoice({ student, subscriptions: studentSubs, total });
      } else {
        showNotification('Failed to fetch subscriptions data', 'error');
      }
    } catch (error) {
      console.error('Error fetching student invoice:', error);
      showNotification('Failed to generate invoice', 'error');
    }
  };

  const handleResetInstructorPassword = async (newPassword: string) => {
    if (!selectedInstructorForReset) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/instructors/${selectedInstructorForReset.id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      const result = await res.json();
      if (result.success) {
        showNotification('Instructor password reset!', 'success');
        setIsResetInstructorPasswordModalOpen(false);
        setSelectedInstructorForReset(null);
      } else {
        showNotification(result.message || 'Failed to reset password', 'error');
      }
    } catch (error) {
       console.error('Error resetting password:', error);
       showNotification('Failed to reset password', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedSubscriptions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/subscriptions/approved');
      const result = await response.json();
      if (result.success) {
        setApprovedSubscriptions(result.data);
      }
    } catch (error) {
      console.error('Error fetching approved subscriptions:', error);
    }
  };

  const handleApproveSubscription = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/subscriptions/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      });
      const result = await res.json();
      if (result.success) {
        showNotification('Subscription Approved!', 'success');
        fetchPendingSubscriptions();
        fetchApprovedSubscriptions();
      }
    } catch (error) {
      showNotification('Failed to update subscription', 'error');
    }
  };

  useEffect(() => {
    if (activeExam && !examResult && timeLeft !== null && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timerId);
    } else if (activeExam && !examResult && timeLeft === 0) {
      (async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:3001/api/exams/${activeExam.id}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId: user?.id, answers: studentAnswers })
          });
          const result = await response.json();
          if (result.success) {
            setExamResult(result.data);
            showNotification('Time is up! Exam submitted automatically.', 'success');
          }
        } catch (err) {
          showNotification('Failed to auto-submit exam', 'error');
        }
        setLoading(false);
        setTimeLeft(null);
      })();
    }
  }, [activeExam, examResult, timeLeft, studentAnswers, user]);

  const fetchTimetable = async () => {
    try {
      let url = 'http://localhost:3001/api/timetables';
      if (portalType === 'student' && user) url += `?studentId=${user.id}`;
      else if (portalType === 'instructor' && user) url += `?instructorId=${user.id}`;
      
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        setTimetables(result.data);
      }
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/instructors');
      const result = await response.json();
      if (result.success) {
        setInstructors(result.data);
      }
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  useEffect(() => {
    if (navData?.courseId && isLoggedIn) {
      setActiveTab('Browse Courses');
    }
  }, [navData, isLoggedIn]);

  const fetchStudentSubscriptions = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:3001/api/subscriptions/student/${user.id}`);
      const result = await response.json();
      if (result.success) {
        setMyCourses(result.data);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const fetchInstructorCourses = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:3001/api/courses?instructorId=${user.id}`);
      const result = await response.json();
      if (result.success) {
        setMyCourses(result.data);
      }
    } catch (error) {
      console.error('Error fetching instructor courses:', error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/courses');
      const result = await response.json();
      if (result.success) {
        setAllCourses(result.data);
      }
    } catch (error) {
      console.error('Error fetching all courses:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const result = await response.json();
      if (result.success) {
        setUser(result.data);
        setPortalType(result.role);
        setIsLoggedIn(true);
        // Default tabs for different roles
        if (result.role === 'superadmin') setActiveTab('Dashboard');
        else if (result.role === 'instructor') setActiveTab('Teaching Dashboard');
        else setActiveTab('Dashboard');
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await fetch('http://localhost:3001/api/instructors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          subjectIds: selectedSubjectIds,
          bio: ''
        })
      });
      const result = await response.json();
      if (result.success) {
        showNotification('Instructor created successfully!', 'success');
        setFormData({ name: '', email: '', password: '', subject: '' });
        setSelectedSubjectIds([]);
        setIsInstructorModalOpen(false);
        fetchInstructors();
      } else {
        setError(result.message || 'Failed to create instructor.');
      }
    } catch (err) {
      setError('Failed to create instructor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      const result = await response.json();
      if (result.success) {
        setUser(result.data);
        setPortalType('student');
        setActiveTab('Dashboard');
        setIsLoggedIn(true);
      } else {
        setError(result.message || 'Signup failed.');
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (courseId: number) => {
    if (!user) return;
    try {
      const response = await fetch('http://localhost:3001/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: user.id,
          courseId: courseId
        })
      });
      const result = await response.json();
      if (result.success) {
        fetchStudentSubscriptions();
        setActiveTab('My Courses');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-slate-100"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 font-display mb-2">
              BYTZ Academy Portal
            </h1>
            <p className="text-slate-500">
              {isSignUp ? 'Create an account to start learning.' : 'Login to access your dashboard.'}
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={isSignUp ? handleSignUp : handleLogin}>
            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Kofi Mensah"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account (Student only)?"} <button 
                onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                className="text-indigo-600 font-bold hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-700 relative">
      {/* Notification Toast */}
      {notification && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-[100] p-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
            notification.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
            notification.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' :
            'bg-indigo-50 border-indigo-100 text-indigo-800'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
           notification.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-500" /> :
           <Bell className="w-5 h-5 text-indigo-500" />}
          <span className="font-bold text-sm">{notification.message}</span>
        </motion.div>
      )}
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl mb-8">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 truncate max-w-[120px]">{user?.name}</div>
              <div className="text-xs text-slate-500 capitalize">{portalType}</div>
            </div>
          </div>
          
          <nav className="space-y-1">
            {portalType === 'student' ? (
              [
                { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
                { label: 'My Courses', icon: <FolderKanban className="w-5 h-5" /> },
                { label: 'Browse Courses', icon: <BookOpen className="w-5 h-5" /> },
                { label: 'CBS Exams', icon: <BookOpen className="w-5 h-5" /> },
                { label: 'Certificates', icon: <Award className="w-5 h-5" /> },
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.label ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))
            ) : portalType === 'instructor' ? (
              [
                { label: 'Teaching Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
                { label: 'My Courses', icon: <BookOpen className="w-5 h-5" /> },
                { label: 'CBS Exams', icon: <Calendar className="w-5 h-5" /> },
                { label: 'Student Progress', icon: <CheckCircle2 className="w-5 h-5" /> },
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.label ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))
            ) : (
              [
                { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
                { label: 'Manage Students', icon: <User className="w-5 h-5" /> },
                { label: 'Manage Instructors', icon: <Award className="w-5 h-5" /> },
                { label: 'Manage Courses', icon: <BookOpen className="w-5 h-5" /> },
                { label: 'Manage Timetable', icon: <Calendar className="w-5 h-5" /> },
                { label: 'Manage Enrollments', icon: <Ticket className="w-5 h-5" /> },
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.label ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))
            )}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-100">
          <button 
            onClick={() => { 
              setIsLoggedIn(false); 
              setUser(null); 
              setFormData({ name: '', email: '', password: '', subject: '' });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 font-display">{activeTab}</h2>
            <div className="flex items-center gap-4">
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </div>

          {(activeTab === 'Dashboard' || activeTab === 'Teaching Dashboard') && portalType !== 'superadmin' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <FolderKanban className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{portalType === 'instructor' ? 'Courses Teaching' : 'My Courses'}</div>
                    <div className="text-2xl font-bold text-slate-900">
                      {portalType === 'student' 
                        ? myCourses.filter(s => s.status === 'approved').length 
                        : myCourses.length}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{portalType === 'instructor' ? 'Active Students' : 'Completed'}</div>
                    <div className="text-2xl font-bold text-slate-900">{portalType === 'instructor' ? students.length : 0}</div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{portalType === 'instructor' ? 'Pending Reviews' : 'Grade Avg'}</div>
                    <div className="text-2xl font-bold text-slate-900">N/A</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center mb-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Welcome back, {user?.name}!</h3>
                <p className="text-slate-500 mb-8">
                  {portalType === 'instructor' 
                    ? `You are managing ${myCourses.length} courses this semester.`
                    : `You have ${myCourses.filter(s => s.status === 'approved').length} active courses. Continue where you left off.`}
                </p>
                <button 
                  onClick={() => setActiveTab('My Courses')}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  {portalType === 'instructor' ? 'Manage My Courses' : 'Go to My Courses'}
                </button>
              </div>

              {/* Weekly Schedule Section */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    Weekly Schedule
                  </h3>
                </div>
                {timetables.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-slate-900 mb-1">No classes scheduled yet</h4>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                      {portalType === 'instructor' 
                        ? "You don't have any classes scheduled for your assigned courses yet."
                        : "No classes have been scheduled for your enrolled courses yet."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                      const dayClasses = timetables.filter(t => t.day_of_week === day);
                      if (dayClasses.length === 0) return null;
                      return (
                        <div key={day} className="flex flex-col md:flex-row gap-4 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                          <div className="w-24 font-bold text-indigo-600">{day}</div>
                          <div className="flex-1 space-y-3">
                            {dayClasses.map(cls => (
                              <div key={cls.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50/50 transition-all">
                                <div>
                                  <div className="font-bold text-slate-900">{cls.course_title}</div>
                                  <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                                    <Clock className="w-3 h-3" /> {cls.start_time.slice(0, 5)} - {cls.end_time.slice(0, 5)}
                                  </div>
                                </div>
                                <div className="mt-2 sm:mt-0 text-sm font-medium text-slate-400 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {cls.location}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {portalType === 'instructor' && user?.subjects && user.subjects.length > 0 && (
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 font-display">
                    <Award className="w-5 h-5 text-indigo-600" />
                    Professional Expertise
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {user.subjects.map((sub: any) => (
                      <div key={sub.id} className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-2xl flex items-center gap-3 group hover:border-indigo-200 transition-all hover:shadow-md">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                        <span className="font-bold text-slate-700">{sub.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'My Courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.length === 0 ? (
                <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-slate-100">
                  <FolderKanban className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{portalType === 'instructor' ? 'No Courses Assigned' : 'No courses yet'}</h3>
                  <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                    {portalType === 'instructor' 
                      ? "You are not teaching any courses currently. Please contact the administrator to be assigned to a course." 
                      : "You haven't subscribed to any courses yet. Browse our catalog to get started!"}
                  </p>
                  {portalType === 'student' && (
                    <button 
                      onClick={() => setActiveTab('Browse Courses')}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                    >
                      Browse Courses
                    </button>
                  )}
                </div>
              ) : (
                myCourses.map((subscription) => (
                  <div key={subscription.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all">
                    <div className="aspect-video bg-indigo-50 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-indigo-200" />
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-bold text-indigo-600 uppercase mb-2">{subscription.category}</div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4">{subscription.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                        <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {subscription.duration}</div>
                        <div className="flex items-center gap-1"><User className="w-4 h-4" /> {subscription.instructor}</div>
                      </div>
                      {portalType === 'instructor' ? (
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => {
                              setActiveCourseId(subscription.course_id);
                              setActiveTab('CBS Exams');
                            }}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            Start Exams
                          </button>
                        </div>
                      ) : (
                        subscription.status === 'pending' ? (
                          <div className="w-full bg-amber-50 text-amber-600 border border-amber-200 py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                            <Clock className="w-5 h-5 animate-pulse" />
                            Pending Approval
                          </div>
                        ) : (
                          <div className="w-full bg-emerald-50 text-emerald-600 border border-emerald-200 py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-default">
                            <CheckCircle2 className="w-5 h-5" />
                            Approved & Paid
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'Browse Courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course) => {
                const isSubscribed = myCourses.some(s => s.course_id === course.id);
                return (
                  <div key={course.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all">
                    <div className="aspect-video bg-slate-50 flex items-center justify-center relative">
                      <BookOpen className="w-12 h-12 text-slate-200" />
                      {navData?.courseId === course.id && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Selected</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-bold text-slate-400 uppercase mb-2">{course.category}</div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{course.title}</h4>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-xl font-bold text-indigo-600">GH₵ {course.price}</div>
                        <div className="text-xs text-slate-400">{course.duration}</div>
                      </div>
                      <button 
                        onClick={() => !isSubscribed && handleSubscribe(course.id)}
                        disabled={isSubscribed}
                        className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isSubscribed ? 'bg-emerald-50 text-emerald-600 cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                      >
                        {isSubscribed ? (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            Already Subscribed
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5" />
                            Subscribe Now
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'Certificates' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="flex justify-between items-center mb-10 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">My Certificates</h3>
                  <p className="text-slate-500 text-sm">Recognizing your academic achievements</p>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {awardedCertificates.length > 0 ? awardedCertificates.map((cert) => (
                  <div key={cert.id} className="group border border-slate-100 rounded-[2.5rem] p-8 hover:border-indigo-200 bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <Award className="w-10 h-10" />
                    </div>
                    <div className="bg-indigo-50/50 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                      {cert.category}
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">{cert.course_title}</h4>
                    <p className="text-xs text-slate-400 mb-6 italic">Awarded by {cert.instructor_name}</p>
                    
                    <div className="w-full pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>{new Date(cert.issue_date).toLocaleDateString()}</span>
                      <span className="text-indigo-600">Grade: {cert.grade}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveCert(cert);
                        setIsCertViewerOpen(true);
                      }}
                      className="mt-6 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                    >
                      View Digital PDF
                    </button>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Award className="w-10 h-10 text-slate-300" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">No Certificates Yet</h4>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm">Complete your courses and assessments to earn recognized digital certificates from your instructors.</p>
                    <button 
                      onClick={() => setActiveTab('Browse Courses')}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                    >
                      Explore Courses
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}


          {activeTab === 'Student Progress' && portalType === 'instructor' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Enrolled Students</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <th className="px-4 py-4">Student</th>
                        <th className="px-4 py-4">Email</th>
                        <th className="px-4 py-4">Phone</th>
                        <th className="px-4 py-4">Progress Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 transition-all">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <span className="font-bold text-slate-900">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-slate-500">{student.email}</td>
                          <td className="px-4 py-4 text-slate-500">{student.phone || 'N/A'}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-between">
                              <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">Active Learner</span>
                              <div className="flex items-center gap-2">
                                {awardedCertificatesInstructor.filter(c => c.student_id === student.id).length > 0 && (
                                  <button 
                                    onClick={() => {
                                      setActiveCert(awardedCertificatesInstructor.find(c => c.student_id === student.id));
                                      setIsCertViewerOpen(true);
                                    }}
                                    className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-2 rounded-lg transition-all"
                                  >
                                    <Award className="w-3.5 h-3.5" />
                                    View Certificate
                                  </button>
                                )}
                                <button 
                                  onClick={() => {
                                    setSelectedStudentForCert(student);
                                    setIsAwardCertModalOpen(true);
                                  }}
                                  className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-bold text-xs bg-indigo-50 px-3 py-2 rounded-lg transition-all"
                                >
                                  <Award className="w-3.5 h-3.5" />
                                  Award
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-4 py-10 text-center text-slate-400 italic">No students enrolled in your courses yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Assignments' && portalType === 'instructor' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-slate-900 font-display">Manage Assignments</h3>
                  <button 
                    onClick={() => setIsAssignmentModalOpen(true)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    New Assignment
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assignments.length === 0 ? (
                    <div className="col-span-full py-12 text-slate-400 italic">
                      No assignments found. Create one to get started!
                    </div>
                  ) : (
                    assignments.map(assignment => (
                      <div key={assignment.id} className="p-8 border border-slate-100 rounded-[2rem] hover:border-indigo-100 bg-slate-50/30 transition-all group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                            {assignment.course_title}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">{assignment.title}</h4>
                        <p className="text-sm text-slate-500 mb-6 flex-grow">{assignment.description || 'No description provided.'}</p>
                        
                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
                            Due: {new Date(assignment.due_date).toLocaleDateString()}
                          </div>
                          <button 
                            className="text-indigo-600 font-bold text-xs hover:text-indigo-700 transition-colors"
                            onClick={() => {
                              setActiveCourseId(assignment.course_id);
                              setActiveTab('CBS Exams');
                              showNotification('Navigating back to Exams context.', 'info');
                            }}
                          >
                            Edit Questions
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-12 pt-12 border-t border-slate-50">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Course Quick Access</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {myCourses.map(course => (
                      <button 
                        key={course.id} 
                        onClick={() => {
                          setActiveCourseId(course.id);
                          showNotification(`Context set to ${course.title}`, 'success');
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all ${activeCourseId === course.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-100'}`}
                      >
                        <div className="text-[10px] font-black uppercase opacity-60 mb-1">Course</div>
                        <div className="font-bold text-xs truncate">{course.title}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CBS Exams' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10 flex justify-between items-end mb-12">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 font-display tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Computer-Based Exams</h3>
                    <p className="text-slate-500 font-medium max-w-md">Manage and participate in automated evaluations with real-time scoring.</p>
                  </div>
                  {portalType === 'instructor' && (
                    <button 
                      onClick={() => {
                        setActiveCourseId(null);
                        setIsExamModalOpen(true);
                        showNotification('Opening Exam Wizard...', 'info');
                      }}
                      className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl shadow-slate-200"
                    >
                      <Plus className="w-5 h-5" />
                      Configure New Exam
                    </button>
                  )}
                </div>

                {!activeExam ? (
                  <div className="overflow-x-auto -mx-10 px-10">
                    {exams.length === 0 ? (
                      <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h4 className="text-lg font-bold text-slate-900 mb-2">No exams scheduled</h4>
                        <p className="text-slate-500 max-w-xs mx-auto">
                          {portalType === 'instructor' 
                            ? "You haven't created any exams yet for your courses."
                            : "There are no upcoming exams for your enrolled courses."}
                        </p>
                      </div>
                    ) : (
                      <table className="w-full text-left border-separate border-spacing-y-4 -mt-4">
                        <thead>
                          <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <th className="px-6 py-4">Assessment Detail</th>
                            <th className="px-6 py-4 text-center">Duration</th>
                            <th className="px-6 py-4">Schedule (Start - End)</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exams.map((exam) => {
                            const now = new Date();
                            const isExpired = exam.due_date && new Date(exam.due_date) < now;
                            const isUpcoming = exam.start_date && new Date(exam.start_date) > now;
                            
                            return (
                              <tr key={exam.id} className="group bg-white hover:bg-indigo-50/30 transition-all duration-300">
                                <td className="px-6 py-6 rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:border-indigo-100">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                                      {exam.title.charAt(0)}
                                    </div>
                                    <div>
                                      <div className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{exam.title}</div>
                                      <div className="text-[10px] font-bold text-slate-500 mt-0.5">{exam.course_title}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-6 border-y border-slate-100 group-hover:border-indigo-100 text-center">
                                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-xs font-bold text-slate-600">
                                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                                    {exam.duration_minutes}m
                                  </div>
                                </td>
                                <td className="px-6 py-6 border-y border-slate-100 group-hover:border-indigo-100">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                      {exam.start_date ? new Date(exam.start_date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Immediate'}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 pl-3">
                                      {exam.due_date ? `Ends: ${new Date(exam.due_date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}` : 'No deadline'}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-6 border-y border-slate-100 group-hover:border-indigo-100 text-center">
                                  {isExpired ? (
                                    <span className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                      Closed
                                    </span>
                                  ) : isUpcoming ? (
                                    <span className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                      Upcoming
                                    </span>
                                  ) : (
                                    <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                      Active
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-6 rounded-r-[1.5rem] border-y border-r border-slate-100 group-hover:border-indigo-100 text-right">
                                  {portalType === 'student' ? (
                                    <button 
                                      disabled={isExpired || isUpcoming}
                                      onClick={async () => {
                                        if (isUpcoming) return;
                                        try {
                                          const res = await fetch(`http://localhost:3001/api/exams/${exam.id}/questions?studentId=${user?.id}`);
                                          const qResult = await res.json();
                                          if (qResult.success) {
                                            setActiveExam({ ...exam, questions: qResult.data });
                                            setStudentAnswers({});
                                            setExamResult(null);
                                            setTimeLeft(exam.duration_minutes * 60);
                                          } else {
                                            showNotification(qResult.message || 'Cannot start exam', 'error');
                                          }
                                        } catch (err) {
                                          showNotification('Error loading exam questions', 'error');
                                        }
                                      }}
                                      className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all shadow-lg ${
                                        isExpired 
                                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                          : isUpcoming
                                          ? 'bg-amber-100 text-amber-600 cursor-not-allowed border border-amber-200 shadow-none'
                                          : 'bg-indigo-600 text-white hover:bg-slate-900 shadow-indigo-500/20'
                                      }`}
                                    >
                                      {isExpired ? 'CLOSED' : isUpcoming ? 'LOCKED' : 'TAKE EXAM'}
                                    </button>
                                  ) : (
                                    <div className="flex gap-2 justify-end">
                                      <button 
                                        onClick={async () => {
                                          try {
                                            const res = await fetch(`http://localhost:3001/api/exams/${exam.id}/results`);
                                            const rResult = await res.json();
                                            if (rResult.success) {
                                              setExamResults(rResult.data);
                                              setEditingExam(exam);
                                              setIsResultsModalOpen(true);
                                            }
                                          } catch (err) {
                                            showNotification('Error fetching results', 'error');
                                          }
                                        }}
                                        className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-all"
                                        title="View Results"
                                      >
                                        <BarChart3 className="w-5 h-5" />
                                      </button>
                                      <button 
                                        onClick={async () => {
                                          try {
                                            const res = await fetch(`http://localhost:3001/api/exams/${exam.id}/questions`);
                                            const qResult = await res.json();
                                            if (qResult.success) {
                                              setEditingExam({ ...exam, questions: qResult.data });
                                              setIsQuestionModalOpen(true);
                                            }
                                          } catch (err) {
                                            showNotification('Error loading questions', 'error');
                                          }
                                        }}
                                        className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                                        title="Manage Questions"
                                      >
                                        <Edit3 className="w-5 h-5" />
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                ) : (
                  // Exam Taking Interface
                  <div className="max-w-3xl mx-auto py-10">
                    <div className="flex justify-between items-center mb-8 bg-slate-900 text-white p-6 rounded-2xl">
                      <div>
                        <h4 className="text-xl font-bold">{activeExam.title}</h4>
                        <p className="text-slate-400 text-sm">{activeExam.course_title}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold uppercase text-slate-500 mb-1">Time Remaining</div>
                        <div className={`text-2xl font-mono font-bold ${timeLeft && timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
                          {timeLeft !== null ? `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}` : `${Math.floor(activeExam.duration_minutes)}:00`}
                        </div>
                      </div>
                    </div>

                    {!examResult ? (
                      <div className="space-y-8">
                        {activeExam.questions.map((q: any, i: number) => (
                          <div key={q.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex gap-4 mb-6">
                              <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                              <h5 className="text-lg font-bold text-slate-900 leading-tight">{q.question_text}</h5>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-12">
                              {JSON.parse(typeof q.options === 'string' ? q.options : JSON.stringify(q.options)).map((opt: any, idx: number) => (
                                <button
                                  key={idx}
                                  onClick={() => setStudentAnswers({ ...studentAnswers, [q.id]: opt })}
                                  className={`p-4 rounded-xl border-2 text-left transition-all font-bold ${
                                    studentAnswers[q.id] === opt 
                                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                                      : 'border-slate-100 hover:border-indigo-200 text-slate-600'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="flex justify-between items-center py-8 border-t border-slate-100">
                          <button 
                            onClick={() => setActiveExam(null)}
                            className="text-slate-500 font-bold hover:text-slate-700"
                          >
                            Cancel Exam
                          </button>
                          <button 
                            onClick={async () => {
                              if (Object.keys(studentAnswers).length < activeExam.questions.length) {
                                if (!confirm('You have unanswered questions. Are you sure you want to submit?')) return;
                              }
                              setLoading(true);
                              try {
                                const response = await fetch(`http://localhost:3001/api/exams/${activeExam.id}/submit`, {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    studentId: user.id,
                                    answers: studentAnswers
                                  })
                                });
                                const result = await response.json();
                                if (result.success) {
                                  setExamResult(result.data);
                                  showNotification('Exam submitted successfully!', 'success');
                                }
                              } catch (err) {
                                showNotification('Failed to submit exam', 'error');
                              }
                              setLoading(false);
                            }}
                            className="bg-emerald-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20"
                          >
                            Submit Exam
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Exam Results View
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl text-center"
                      >
                        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                          <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h4 className="text-3xl font-black text-slate-900 mb-2">Exam Completed!</h4>
                        <p className="text-slate-500 mb-10">Your score has been calculated automatically.</p>
                        
                        <div className="flex justify-center gap-4 mb-10">
                          <div className="bg-slate-50 p-6 rounded-3xl flex-1">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Your Score</div>
                            <div className="text-4xl font-black text-indigo-600">{examResult.score} / {examResult.totalPoints}</div>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-3xl flex-1">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Percentage</div>
                            <div className="text-4xl font-black text-emerald-600">{Math.round(examResult.percentage)}%</div>
                          </div>
                        </div>

                        <button 
                          onClick={() => setActiveExam(null)}
                          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg"
                        >
                          Back to Exams
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'Dashboard' && portalType === 'superadmin' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Students', value: dashboardStats?.totalStudents || 0, icon: <User className="w-6 h-6" />, color: 'bg-blue-500' },
                  { label: 'Total Instructors', value: dashboardStats?.totalInstructors || 0, icon: <Award className="w-6 h-6" />, color: 'bg-purple-500' },
                  { label: 'Active Courses', value: dashboardStats?.totalCourses || 0, icon: <BookOpen className="w-6 h-6" />, color: 'bg-emerald-500' },
                  { label: 'Total Enrolments', value: dashboardStats?.totalEnrolments || 0, icon: <CheckCircle2 className="w-6 h-6" />, color: 'bg-indigo-500' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg shadow-${stat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                      </div>
                      <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    Recent Activity
                  </h3>
                  <div className="space-y-6">
                    {dashboardStats?.recentActivities?.map((activity: any, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:border-indigo-100 transition-all">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600 font-bold border border-slate-100">
                          {activity.student_name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900 font-bold">
                            <span className="text-indigo-600">{activity.student_name}</span> enrolled in <span className="text-slate-700">{activity.course_title}</span>
                          </p>
                          <p className="text-xs text-slate-400 mt-1">{new Date(activity.created_at).toLocaleString()}</p>
                        </div>
                        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">New Enrolment</div>
                      </div>
                    ))}
                    {(!dashboardStats?.recentActivities || dashboardStats.recentActivities.length === 0) && (
                      <div className="text-center py-12 text-slate-400 font-medium italic">
                        No recent activity recorded.
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <p className="text-indigo-100 text-sm mb-8">Manage your institution efficiently with these tools.</p>
                    <div className="space-y-3">
                      <button onClick={() => setActiveTab('Manage Courses')} className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl text-left font-bold transition-all flex items-center justify-between group">
                        Create Course
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button onClick={() => setActiveTab('Manage Instructors')} className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl text-left font-bold transition-all flex items-center justify-between group">
                        Add Instructor
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button onClick={() => setActiveTab('Manage Timetable')} className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl text-left font-bold transition-all flex items-center justify-between group">
                        Schedule Class
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-400/10 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Manage Students' && portalType === 'superadmin' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Manage Students</h3>
                  <p className="text-slate-500 text-sm">Register and view all enrolled students.</p>
                </div>
                <button 
                  onClick={() => setIsStudentModalOpen(true)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <Plus className="w-5 h-5" />
                  Add New Student
                </button>
              </div>

              {/* Student Modal */}
              <AnimatePresence>
                {isStudentModalOpen && (
                  <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white"
                    >
                      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-indigo-50/30">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          <User className="w-5 h-5 text-indigo-600" />
                          Add New Student
                        </h3>
                        <button 
                          onClick={() => setIsStudentModalOpen(false)}
                          className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <form className="p-8 space-y-6" onSubmit={handleCreateStudent}>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Student Name</label>
                          <input name="name" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Kofi Mensah" required />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                          <input name="email" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="kofi@example.com" required />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                          <input name="phone" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="+233..." />
                        </div>
                        <div className="flex justify-end gap-4 pt-4 border-t border-slate-50">
                          <button type="button" onClick={() => setIsStudentModalOpen(false)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">
                            Cancel
                          </button>
                          <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50">
                            {loading ? 'Creating...' : 'Register Student'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <div className="bg-white rounded-3xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Enrolled Students</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <th className="px-4 py-4">Student</th>
                        <th className="px-4 py-4">Email</th>
                        <th className="px-4 py-4">Phone</th>
                        <th className="px-4 py-4">Joined</th>
                        <th className="px-4 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 transition-all">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <span className="font-bold text-slate-900">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-slate-500">{student.email}</td>
                          <td className="px-4 py-4 text-slate-500">{student.phone || 'N/A'}</td>
                          <td className="px-4 py-4 text-slate-400 text-sm">
                            {new Date(student.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4">
                            <div className="relative flex justify-end">
                              <button onClick={() => setOpenStudentDropdownId(openStudentDropdownId === student.id ? null : student.id)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all" title="Actions">
                                <MoreHorizontal className="w-5 h-5" />
                              </button>
                              
                              <AnimatePresence>
                                {openStudentDropdownId === student.id && (
                                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                                    <button onClick={() => { handlePrintStudentInvoice(student); setOpenStudentDropdownId(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors border-b border-slate-50">
                                      <FileText className="w-4 h-4 text-indigo-500" /> Print Invoice
                                    </button>
                                    <button onClick={() => { handleDeleteStudent(student.id); setOpenStudentDropdownId(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                                      <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Manage Instructors' && portalType === 'superadmin' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Manage Instructors</h3>
                  <p className="text-slate-500 text-sm">Create and manage instructor accounts.</p>
                </div>
                <button 
                  onClick={() => {
                    setFormData({ ...formData, password: 'zxcv123$$' });
                    setIsInstructorModalOpen(true);
                  }}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <Plus className="w-5 h-5" />
                  Add New Instructor
                </button>
              </div>

              {/* Instructor Modal */}
              <AnimatePresence>
                {isInstructorModalOpen && (
                  <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white"
                    >
                      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-indigo-50/30">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          <Plus className="w-5 h-5 text-indigo-600" />
                          Add New Instructor
                        </h3>
                        <button 
                          onClick={() => setIsInstructorModalOpen(false)}
                          className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleCreateInstructor}>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                          <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="Jane Doe"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="jane@bytz.com"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Default Password (Read-Only)</label>
                          <input 
                            type="text" 
                            value={formData.password}
                            readOnly
                            className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-500 cursor-not-allowed"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-3">Assign Subjects / Specialization</label>
                          <div className="flex flex-wrap gap-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl min-h-[100px]">
                            {subjects.map(subject => (
                              <button
                                key={subject.id}
                                type="button"
                                onClick={() => {
                                  if (selectedSubjectIds.includes(subject.id)) {
                                    setSelectedSubjectIds(selectedSubjectIds.filter(id => id !== subject.id));
                                  } else {
                                    setSelectedSubjectIds([...selectedSubjectIds, subject.id]);
                                  }
                                }}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                  selectedSubjectIds.includes(subject.id)
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400'
                                }`}
                              >
                                {subject.name}
                              </button>
                            ))}
                            {subjects.length === 0 && (
                              <div className="text-slate-400 text-sm italic py-4">Loading subjects...</div>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-slate-50">
                          <button type="button" onClick={() => setIsInstructorModalOpen(false)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">
                            Cancel
                          </button>
                          <button 
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                          >
                            {loading ? 'Creating...' : 'Create Instructor Account'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <div className="bg-white rounded-3xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Current Instructors</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <th className="px-4 py-4">Name</th>
                        <th className="px-4 py-4">Email</th>
                        <th className="px-4 py-4">Subject</th>
                        <th className="px-4 py-4">Created Date</th>
                        <th className="px-4 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {instructors.map((inst) => (
                        <tr key={inst.id} className="hover:bg-slate-50 transition-all">
                          <td className="px-4 py-4 font-bold text-slate-900">{inst.name}</td>
                          <td className="px-4 py-4 text-slate-500">{inst.email}</td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              {inst.subjects && inst.subjects.length > 0 ? (
                                inst.subjects.map((sub: any) => (
                                  <span key={sub.id} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold">
                                    {sub.name}
                                  </span>
                                ))
                              ) : (
                                <span className="text-slate-400 text-[10px] italic">No subjects</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-slate-400 text-sm">
                            {new Date(inst.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-right relative">
                            <button 
                              onClick={() => setOpenInstructorDropdownId(openInstructorDropdownId === inst.id ? null : inst.id)}
                              className="p-2 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
                            >
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                            
                            <AnimatePresence>
                              {openInstructorDropdownId === inst.id && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.95, y: -10 }} 
                                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                                  exit={{ opacity: 0, scale: 0.95, y: -10 }} 
                                  className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden"
                                >
                                  <button 
                                    onClick={() => {
                                      setSelectedInstructorForReset(inst);
                                      setIsResetInstructorPasswordModalOpen(true);
                                      setOpenInstructorDropdownId(null);
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3"
                                  >
                                    <Clock className="w-4 h-4 text-amber-500" /> Reset Password
                                  </button>
                                  <button 
                                    onClick={async () => {
                                      if (confirm(`Delete instructor ${inst.name}?`)) {
                                         // Reuse logic or add deleteInstructor backend
                                         showNotification('Delete feature coming soon', 'info');
                                         setOpenInstructorDropdownId(null);
                                      }
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 border-t border-slate-50"
                                  >
                                    <Trash2 className="w-4 h-4" /> Delete
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </td>
                        </tr>
                      ))}
                      {instructors.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-4 py-10 text-center text-slate-500 font-medium">
                            No instructors added yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Manage Courses' && portalType === 'superadmin' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Manage Courses</h3>
                  <p className="text-slate-500 text-sm">Create and organize your course offerings.</p>
                </div>
                <button 
                  onClick={() => { setEditingCourse(null); setIsModalOpen(true); }}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <Plus className="w-5 h-5" />
                  Add New Course
                </button>
              </div>

              {/* Course Modal */}
              <AnimatePresence>
                {isModalOpen && (
                  <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white"
                    >
                      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-indigo-50/30">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          {editingCourse ? <BookOpen className="w-5 h-5 text-indigo-600" /> : <Plus className="w-5 h-5 text-indigo-600" />}
                          {editingCourse ? 'Edit Course' : 'Create New Course'}
                        </h3>
                        <button 
                          onClick={() => { setIsModalOpen(false); setEditingCourse(null); }}
                          className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto" onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const data = {
                          title: (form.elements.namedItem('title') as HTMLInputElement).value,
                          description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
                          duration: (form.elements.namedItem('duration') as HTMLInputElement).value,
                          price: parseFloat((form.elements.namedItem('price') as HTMLInputElement).value),
                          category: (form.elements.namedItem('category') as HTMLSelectElement).value,
                          instructor_id: parseInt((form.elements.namedItem('instructor_id') as HTMLSelectElement).value)
                        };
                        setLoading(true);
                        try {
                          const res = await fetch(editingCourse ? `http://localhost:3001/api/courses/${editingCourse.id}` : 'http://localhost:3001/api/courses', {
                            method: editingCourse ? 'PUT' : 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                          });
                          const result = await res.json();
                          if (result.success) {
                            showNotification(editingCourse ? 'Course updated successfully!' : 'Course created successfully!', 'success');
                            fetchAllCourses();
                            setIsModalOpen(false);
                            setEditingCourse(null);
                            form.reset();
                          } else {
                            showNotification(result.message || 'Failed to save course', 'error');
                          }
                        } catch (err: any) { 
                          showNotification('Failed to save course: ' + err.message, 'error');
                        }
                        setLoading(false);
                      }}>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Course Title</label>
                          <input name="title" type="text" defaultValue={editingCourse?.title} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                          <textarea name="description" defaultValue={editingCourse?.description} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]" required />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                          <select name="category" defaultValue={editingCourse?.category || "Web Development"} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Design">Design</option>
                            <option value="Programming">Programming</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Instructor</label>
                          <select name="instructor_id" defaultValue={editingCourse?.instructor_id} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                            {instructors.map(inst => (
                              <option key={inst.id} value={inst.id}>{inst.name} ({inst.specialization})</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Duration (e.g., 6 weeks)</label>
                          <input name="duration" type="text" defaultValue={editingCourse?.duration} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Price (GH₵)</label>
                          <input name="price" type="number" defaultValue={editingCourse?.price} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-slate-50">
                          <button type="button" onClick={() => { setIsModalOpen(false); setEditingCourse(null); }} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">
                            Cancel
                          </button>
                          <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50">
                            {loading ? 'Processing...' : (editingCourse ? 'Update Course' : 'Create Course')}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <div className="bg-white rounded-3xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Active Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allCourses.map(course => (
                    <div key={course.id} className="p-6 border border-slate-100 rounded-2xl hover:border-indigo-100 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-slate-900">{course.title}</h4>
                        <div className="flex gap-2">
                          <button className="text-indigo-600 hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-lg transition-all" onClick={() => {
                            setEditingCourse(course);
                            setIsModalOpen(true);
                          }}>
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all" onClick={async () => {
                            if (confirm('Are you sure?')) {
                              const res = await fetch(`http://localhost:3001/api/courses/${course.id}`, { method: 'DELETE' });
                              if ((await res.json()).success) fetchAllCourses();
                            }
                          }}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-slate-500 mb-2">Instructor: <span className="font-bold text-slate-700">{course.instructor}</span></div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">{course.category}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-50 text-slate-500 rounded-md">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                          <User className="w-3 h-3" />
                          {course.subscriber_count || 0} Students
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Manage Timetable' && portalType === 'superadmin' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 font-display">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Add New Class Schedule
                </h3>
                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const course_id = parseInt((form.elements.namedItem('course_id') as HTMLSelectElement).value);
                  if (isNaN(course_id)) {
                    showNotification('Please select a course first.', 'error');
                    return;
                  }
                  const data = {
                    course_id,
                    day_of_week: (form.elements.namedItem('day_of_week') as HTMLSelectElement).value,
                    start_time: (form.elements.namedItem('start_time') as HTMLInputElement).value,
                    end_time: (form.elements.namedItem('end_time') as HTMLInputElement).value,
                    location: (form.elements.namedItem('location') as HTMLInputElement).value
                  };
                  setLoading(true);
                  try {
                    const res = await fetch('http://localhost:3001/api/timetables', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    });
                    const result = await res.json();
                    if (result.success) {
                      setSuccessMessage('Schedule added!');
                      fetchTimetable();
                      form.reset();
                      setTimeout(() => setSuccessMessage(null), 3000);
                    } else {
                      setError(result.message || 'Failed to add schedule');
                      showNotification('Error: ' + result.message, 'error');
                    }
                  } catch (err: any) { 
                    setError('Failed to add schedule: ' + err.message);
                    showNotification('Error: ' + err.message, 'error');
                  }
                  setLoading(false);
                }}>
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Course</label>
                    <select name="course_id" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                      {allCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Day</label>
                    <select name="day_of_week" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Location/Link</label>
                    <input name="location" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Room 101 or Zoom Link" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Start Time</label>
                    <input name="start_time" type="time" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">End Time</label>
                    <input name="end_time" type="time" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50">
                      Add to Timetable
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Schedule Overview</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <th className="px-4 py-4">Course</th>
                        <th className="px-4 py-4">Day</th>
                        <th className="px-4 py-4">Time</th>
                        <th className="px-4 py-4">Location</th>
                        <th className="px-4 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {timetables.map((entry) => (
                        <tr key={entry.id} className="hover:bg-slate-50 transition-all">
                          <td className="px-4 py-4 font-bold text-slate-900">{entry.course_title}</td>
                          <td className="px-4 py-4 text-slate-700">{entry.day_of_week}</td>
                          <td className="px-4 py-4 text-slate-500">{entry.start_time.slice(0, 5)} - {entry.end_time.slice(0, 5)}</td>
                          <td className="px-4 py-4 truncate max-w-[200px] text-slate-400">{entry.location}</td>
                          <td className="px-4 py-4">
                            <button className="text-red-500 hover:text-red-600" onClick={async () => {
                              if (confirm('Delete this entry?')) {
                                const res = await fetch(`http://localhost:3001/api/timetables/${entry.id}`, { method: 'DELETE' });
                                if ((await res.json()).success) fetchTimetable();
                              }
                            }}><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Manage Enrollments' && portalType === 'superadmin' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Pending Enrollments</h3>
                </div>
                {pendingSubscriptions.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 font-bold border-2 border-dashed border-slate-200 rounded-2xl">
                    No pending enrollments.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                          <th className="pb-4">Student</th>
                          <th className="pb-4">Course</th>
                          <th className="pb-4">Price</th>
                          <th className="pb-4 whitespace-nowrap text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {pendingSubscriptions.map((sub: any) => (
                          <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-4">
                              <div className="font-bold text-slate-900">{sub.student_name}</div>
                              <div className="text-xs text-slate-500">{sub.student_email}</div>
                            </td>
                            <td className="py-4 font-bold text-slate-900">{sub.course_title}</td>
                            <td className="py-4 font-bold text-indigo-600">${sub.price}</td>
                            <td className="py-4 text-right">
                              <button onClick={() => handleApproveSubscription(sub.id)} className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-200 transition-all">Approve</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Approved Enrollments Table */}
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm print:hidden">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-emerald-600">Approved Enrollments</h3>
                </div>
                {approvedSubscriptions.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 font-bold border-2 border-dashed border-slate-200 rounded-2xl">
                    No approved enrollments.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                          <th className="pb-4">Student</th>
                          <th className="pb-4">Course</th>
                          <th className="pb-4">Date Approved</th>
                          <th className="pb-4 whitespace-nowrap text-right">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {approvedSubscriptions.map((sub: any) => (
                          <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-4">
                              <div className="font-bold text-slate-900">{sub.student_name}</div>
                              <div className="text-xs text-slate-500">{sub.student_email}</div>
                            </td>
                            <td className="py-4 font-bold text-slate-900">{sub.course_title}</td>
                            <td className="py-4 text-slate-500 text-sm">{new Date(sub.subscription_date).toLocaleDateString()}</td>
                            <td className="py-4 text-right">
                              <button onClick={() => setActiveReceipt(sub)} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-2 ml-auto">
                                <FileText className="w-4 h-4" /> Print
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {!['Dashboard', 'Teaching Dashboard', 'My Courses', 'Browse Courses', 'Certificates', 'Assignments', 'CBS Exams', 'Student Progress', 'Manage Instructors', 'Manage Courses', 'Manage Timetable', 'Manage Enrollments'].includes(activeTab) && (
            <div className="bg-white rounded-3xl border border-slate-100 p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{activeTab} Section</h3>
              <p className="text-slate-500">This section is currently under development.</p>
            </div>
          )}

          {/* Printable Receipt Modal */}
          <AnimatePresence>
            {activeReceipt && (
              <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print:p-0 print:bg-white print:block pb-24">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2rem] p-12 max-w-2xl w-full shadow-2xl print:shadow-none print:max-w-none print:w-full print:p-8">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-8 mb-8">
                    <div>
                      <div className="text-3xl font-black text-slate-900 tracking-tight">BYTZ<span className="text-indigo-600"> ACADEMY</span></div>
                      <div className="text-slate-500 mt-1 font-bold">Official Payment Receipt</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Receipt No.</div>
                      <div className="text-xl font-mono font-bold text-slate-900">RC-{activeReceipt.id.toString().padStart(6, '0')}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-12 mb-12">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</div>
                      <div className="text-lg font-bold text-slate-900">{activeReceipt.student_name}</div>
                      <div className="text-slate-500">{activeReceipt.student_email}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Payment Date</div>
                      <div className="text-lg font-bold text-slate-900">{new Date(activeReceipt.subscription_date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <table className="w-full mb-12">
                    <thead>
                      <tr className="border-b border-slate-200 text-left">
                        <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Description</th>
                        <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-6">
                          <div className="font-bold text-slate-900 text-lg">{activeReceipt.course_title}</div>
                          <div className="text-slate-500 text-sm mt-1">Full Course Subscription</div>
                        </td>
                        <td className="py-6 text-right font-bold text-slate-900 text-xl">${activeReceipt.price}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="flex justify-between items-center border-t-4 border-slate-900 pt-6 mb-12">
                    <div className="text-slate-500 font-bold uppercase tracking-wider text-sm">Total Paid</div>
                    <div className="text-4xl font-black text-indigo-600">${activeReceipt.price}</div>
                  </div>
                  
                  <div className="text-center text-slate-400 text-sm font-bold border-t border-slate-100 pt-8">
                    Thank you for learning with Bytz Academy.
                  </div>
                  
                  <div className="mt-8 flex justify-end gap-4 print:hidden">
                    <button onClick={() => setActiveReceipt(null)} className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Close</button>
                    <button onClick={() => window.print()} className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Print Receipt
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Printable Student Invoice Modal */}
          <AnimatePresence>
            {activeStudentInvoice && (
              <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print:p-0 print:bg-white print:block pb-24">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2rem] p-12 max-w-2xl w-full shadow-2xl print:shadow-none print:max-w-none print:w-full print:p-8">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-8 mb-8">
                    <div>
                      <div className="text-3xl font-black text-slate-900 tracking-tight">BYTZ<span className="text-indigo-600"> ACADEMY</span></div>
                      <div className="text-slate-500 mt-1 font-bold">Consolidated Student Invoice</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Invoice Date</div>
                      <div className="text-xl font-mono font-bold text-slate-900">{new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-12 mb-12">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</div>
                      <div className="text-lg font-bold text-slate-900">{activeStudentInvoice.student.name}</div>
                      <div className="text-slate-500">{activeStudentInvoice.student.email}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Student ID</div>
                      <div className="text-lg font-bold text-slate-900">STU-{activeStudentInvoice.student.id.toString().padStart(6, '0')}</div>
                    </div>
                  </div>
                  
                  <table className="w-full mb-12">
                    <thead>
                      <tr className="border-b border-slate-200 text-left">
                        <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Course / Description</th>
                        <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeStudentInvoice.subscriptions.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="py-8 text-center text-slate-500 font-bold">No approved courses found.</td>
                        </tr>
                      ) : (
                        activeStudentInvoice.subscriptions.map((sub: any) => (
                          <tr key={sub.id} className="border-b border-slate-100">
                            <td className="py-4">
                              <div className="font-bold text-slate-900 text-lg">{sub.course_title}</div>
                              <div className="text-slate-500 text-sm mt-1">Paid on {new Date(sub.subscription_date).toLocaleDateString()}</div>
                            </td>
                            <td className="py-4 text-right font-bold text-slate-900 text-xl">${sub.price}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  
                  <div className="flex justify-between items-center border-t-4 border-slate-900 pt-6 mb-12">
                    <div className="text-slate-500 font-bold uppercase tracking-wider text-sm">Total Paid</div>
                    <div className="text-4xl font-black text-indigo-600">${activeStudentInvoice.total.toFixed(2)}</div>
                  </div>
                  
                  <div className="text-center text-slate-400 text-sm font-bold border-t border-slate-100 pt-8">
                    Thank you for learning with Bytz Academy.
                  </div>
                  
                  <div className="mt-8 flex justify-end gap-4 print:hidden">
                    <button onClick={() => setActiveStudentInvoice(null)} className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Close</button>
                    <button onClick={() => window.print()} className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center gap-2" disabled={activeStudentInvoice.subscriptions.length === 0}>
                      <FileText className="w-4 h-4" /> Print Invoice
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* New Assignment Modal */}
          <AnimatePresence>
            {isAssignmentModalOpen && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-indigo-600" />
                    Create New Assignment
                  </h3>
                  <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = {
                      title: (form.elements.namedItem('title') as HTMLInputElement).value,
                      courseId: activeCourseId || parseInt((form.elements.namedItem('courseId') as HTMLSelectElement).value),
                      dueDate: (form.elements.namedItem('dueDate') as HTMLInputElement).value,
                      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value
                    };
                    setLoading(true);
                    try {
                      const res = await fetch('http://localhost:3001/api/assignments', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                      });
                      const result = await res.json();
                      if (result.success) {
                        showNotification('Assignment created successfully!', 'success');
                        fetchAssignments();
                        setIsAssignmentModalOpen(false);
                        form.reset();
                      }
                    } catch (err) {
                      showNotification('Error creating assignment', 'error');
                    }
                    setLoading(false);
                  }}>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Assignment Title</label>
                      <input name="title" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" placeholder="Final Essay or Practical Work" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                      <textarea name="description" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" placeholder="Enter instructions or project details..." rows={3} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Select Course</label>
                        <select name="courseId" defaultValue={activeCourseId || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" required>
                          <option value="" disabled>Choose a course</option>
                          {myCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Due Date</label>
                        <input name="dueDate" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" required />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setIsAssignmentModalOpen(false)} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-slate-600">Cancel</button>
                      <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 py-3 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/20">{loading ? 'Creating...' : 'Create'}</button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* New Exam Modal */}
          <AnimatePresence>
            {isExamModalOpen && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2rem] p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                    Configure New CBS Exam
                  </h3>
                  <form className="space-y-6" onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const courseIdStr = (form.elements.namedItem('courseId') as HTMLSelectElement).value;
                    const data = {
                      courseId: activeCourseId || parseInt(courseIdStr),
                      title: (form.elements.namedItem('title') as HTMLInputElement).value,
                      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
                      duration_minutes: parseInt((form.elements.namedItem('duration') as HTMLInputElement).value),
                      max_attempts: parseInt((form.elements.namedItem('max_attempts') as HTMLInputElement).value) || 1,
                      due_date: (form.elements.namedItem('due_date') as HTMLInputElement).value || null,
                      start_date: (form.elements.namedItem('start_date') as HTMLInputElement).value || null,
                    };
                    
                    console.log('Submitting exam data:', data);
                    if (!data.courseId || isNaN(data.courseId)) {
                      showNotification('Please select a valid course.', 'error');
                      return;
                    }

                    setLoading(true);
                    try {
                      const res = await fetch('http://localhost:3001/api/exams', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                      });
                      const result = await res.json();
                      console.log('Server response:', result);
                      if (result.success) {
                        showNotification('Exam shell created! Now add questions in the Exams tab.', 'success');
                        fetchExams();
                        setIsExamModalOpen(false);
                      } else {
                        showNotification(result.message || 'Failed to create exam shell.', 'error');
                      }
                    } catch (err) {
                      console.error('Fetch error:', err);
                      showNotification('Network error or server unavailable.', 'error');
                    }
                    setLoading(false);
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Exam Title</label>
                        <input name="title" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" placeholder="Mid-Semester Exam" required />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                        <textarea name="description" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" placeholder="Enter instructions for students..." rows={2} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Select Course</label>
                        <select name="courseId" defaultValue={activeCourseId || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" required>
                          <option value="" disabled>Choose a course</option>
                          {myCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Duration (minutes)</label>
                        <input name="duration" type="number" defaultValue={60} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Max Attempts</label>
                        <input name="max_attempts" type="number" defaultValue={1} min={1} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Start Date & Time</label>
                        <input name="start_date" type="datetime-local" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Deadline Date & Time</label>
                        <input name="due_date" type="datetime-local" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setIsExamModalOpen(false)} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-slate-600">Cancel</button>
                      <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 py-3 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/20">Create Exam</button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Instructor Password Reset Modal */}
          <AnimatePresence>
            {isResetInstructorPasswordModalOpen && selectedInstructorForReset && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Reset Password</h3>
                    <button onClick={() => setIsResetInstructorPasswordModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button>
                  </div>
                  <p className="text-slate-500 text-sm mb-6">Enter a new password for <strong>{selectedInstructorForReset.name}</strong>.</p>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const pwd = (e.currentTarget.elements.namedItem('newPassword') as HTMLInputElement).value;
                    if (pwd) handleResetInstructorPassword(pwd);
                  }}>
                    <div className="mb-6">
                      <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                      <input name="newPassword" type="password" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="••••••••" required />
                    </div>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setIsResetInstructorPasswordModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Cancel</button>
                      <button type="submit" disabled={loading} className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">{loading ? 'Resetting...' : 'Reset'}</button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Manage Questions Modal */}
          <AnimatePresence>
            {isQuestionModalOpen && editingExam && (
              <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2.5rem] p-10 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Manage Questions</h3>
                      <p className="text-indigo-600 font-bold text-sm">Exam: {editingExam.title}</p>
                    </div>
                    <button onClick={() => setIsQuestionModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div className="grid grid-cols-1 gap-4">
                      {editingExam.questions && editingExam.questions.length > 0 ? editingExam.questions.map((q: any, i: number) => (
                        <div key={q.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                          <div className="flex gap-4">
                            <span className="font-black text-slate-300">#{i + 1}</span>
                            <div>
                              <p className="font-bold text-slate-800 mb-2">{q.question_text}</p>
                              <div className="flex flex-wrap gap-2">
                                {JSON.parse(typeof q.options === 'string' ? q.options : JSON.stringify(q.options)).map((opt: any, idx: number) => (
                                  <span key={idx} className={`text-[10px] font-bold px-2 py-1 rounded-md ${opt === q.correct_answer ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-white border border-slate-200 text-slate-500'}`}>
                                    {opt}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-8 text-slate-400 italic">No questions added yet.</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100">
                    <h4 className="font-bold text-indigo-900 mb-6 flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add New MCQ Question
                    </h4>
                    <form className="space-y-4" onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const options = [
                        (form.elements.namedItem('opt1') as HTMLInputElement).value,
                        (form.elements.namedItem('opt2') as HTMLInputElement).value,
                        (form.elements.namedItem('opt3') as HTMLInputElement).value,
                        (form.elements.namedItem('opt4') as HTMLInputElement).value,
                      ];
                      const data = {
                        question_text: (form.elements.namedItem('question') as HTMLTextAreaElement).value,
                        options: options,
                        correct_answer: options[parseInt((form.elements.namedItem('correct') as HTMLSelectElement).value)],
                        points: parseInt((form.elements.namedItem('points') as HTMLInputElement).value) || 1,
                      };
                      setLoading(true);
                      try {
                        const res = await fetch(`http://localhost:3001/api/exams/${editingExam.id}/questions`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(data)
                        });
                        const result = await res.json();
                        if (result.success) {
                          showNotification('Question added!', 'success');
                          const qRes = await fetch(`http://localhost:3001/api/exams/${editingExam.id}/questions`);
                          const qData = await qRes.json();
                          if (qData.success) setEditingExam({ ...editingExam, questions: qData.data });
                          form.reset();
                        }
                      } catch (err) {
                        showNotification('Error adding question', 'error');
                      }
                      setLoading(false);
                    }}>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Question Text</label>
                        <textarea name="question" className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 h-24" placeholder="What is the capital of..." required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(n => (
                          <div key={n}>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Option {n}</label>
                            <input name={`opt${n}`} type="text" className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4" required />
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Correct Answer</label>
                          <select name="correct" className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4" required>
                            <option value="0">Option 1</option>
                            <option value="1">Option 2</option>
                            <option value="2">Option 3</option>
                            <option value="3">Option 4</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Points</label>
                          <input name="points" type="number" defaultValue={1} className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4" required />
                        </div>
                      </div>
                      <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg mt-4">
                        {loading ? 'Adding...' : 'Save Question'}
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Exam Results Modal */}
          <AnimatePresence>
            {isResultsModalOpen && editingExam && (
              <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2.5rem] p-10 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Exam Results</h3>
                      <p className="text-indigo-600 font-bold text-sm">{editingExam.title} - {editingExam.course_title}</p>
                    </div>
                    <button onClick={() => setIsResultsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <th className="px-4 py-4">Student</th>
                          <th className="px-4 py-4">Score</th>
                          <th className="px-4 py-4">Percentage</th>
                          <th className="px-4 py-4">Submitted At</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {examResults && examResults.length > 0 ? examResults.map((result: any, i: number) => (
                          <tr key={i} className="hover:bg-slate-50 transition-all">
                            <td className="px-4 py-4 font-bold text-slate-900">{result.student_name}</td>
                            <td className="px-4 py-4 font-mono text-indigo-600 font-bold">{result.score} / {result.total_points || 0}</td>
                            <td className="px-4 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${result.percentage >= 50 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                {Math.round(result.percentage)}%
                              </span>
                            </td>
                            <td className="px-4 py-4 text-slate-400 text-sm">{new Date(result.created_at).toLocaleString()}</td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={4} className="px-4 py-10 text-center text-slate-400 italic">No submissions yet for this exam.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button onClick={() => setIsResultsModalOpen(false)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Award Certificate Modal */}
          <AnimatePresence>
            {isAwardCertModalOpen && selectedStudentForCert && (
              <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
                    <Award className="w-6 h-6 text-indigo-600" />
                    Award Certificate
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 relative z-10">Select a course to award to <strong>{selectedStudentForCert.name}</strong>.</p>
                  
                  <form className="space-y-4 relative z-10" onSubmit={async (e) => {
                    e.preventDefault();
                    if (!user) return;
                    const form = e.target as HTMLFormElement;
                    const courseId = parseInt((form.elements.namedItem('courseId') as HTMLSelectElement).value);
                    const grade = (form.elements.namedItem('grade') as HTMLSelectElement).value;
                    
                    setLoading(true);
                    try {
                      const res = await fetch('http://localhost:3001/api/certificates', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          student_id: selectedStudentForCert.id,
                          course_id: courseId,
                          instructor_id: user.id,
                          grade
                        })
                      });
                      const result = await res.json();
                      if (result.success) {
                        showNotification(`Certificate awarded to ${selectedStudentForCert.name}!`, 'success');
                        setIsAwardCertModalOpen(false);
                        fetchInstructorCertificates();
                      } else {
                        showNotification(result.message || 'Error awarding certificate', 'error');
                      }
                    } catch (err) {
                      showNotification('Server Error', 'error');
                    }
                    setLoading(false);
                  }}>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Select Course</label>
                      <select name="courseId" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" required>
                        <option value="" disabled>Choose a course</option>
                        {myCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Final Grade</label>
                      <select name="grade" defaultValue="A" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4" required>
                        <option value="A+">A+ (Exceptional)</option>
                        <option value="A">A (Excellent)</option>
                        <option value="B">B (Good)</option>
                        <option value="C">C (Pass)</option>
                      </select>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setIsAwardCertModalOpen(false)} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-slate-600">Cancel</button>
                      <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 py-3 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/20">{loading ? 'Awarding...' : 'Award Certificate'}</button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Certificate Viewer Modal (PDF UI) */}
          <AnimatePresence>
            {isCertViewerOpen && activeCert && (
              <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-8 bg-slate-900/60 backdrop-blur-md">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="relative max-w-5xl w-full flex flex-col items-center">
                  
                  {/* Actions Bar */}
                  <div className="w-full flex justify-between tracking-wide items-center mb-4 px-4 bg-slate-900/80 rounded-2xl py-3 border border-slate-700 backdrop-blur-xl">
                    <span className="text-white font-bold text-sm">Authentic Digital Certificate</span>
                    <div className="flex gap-2">
                       <button onClick={() => {
                          const originalTitle = document.title;
                          document.title = `${activeCert.course_title} Certificate - ${user?.name}`;
                          window.print();
                          document.title = originalTitle;
                       }} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                         Download PDF
                       </button>
                       <button onClick={() => setIsCertViewerOpen(false)} className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-xl transition-colors">
                         <X className="w-5 h-5"/>
                       </button>
                    </div>
                  </div>

                  {/* Certificate Print Area */}
                  <div className="w-full bg-white rounded-none shadow-2xl relative overflow-hidden border-8 border-indigo-900 print:shadow-none print:border-none aspect-[1.414/1] flex flex-col items-center justify-center text-center p-12 sm:p-24 selection:bg-indigo-100 selection:text-indigo-900" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #fef8ff 100%)' }}>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full border-[12px] border-double border-indigo-900/10 pointer-events-none rounded-sm m-4" style={{ width: 'calc(100% - 32px)', height: 'calc(100% - 32px)' }}></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    {/* Logo/Seal */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-indigo-900 rounded-full flex items-center justify-center mb-8 sm:mb-12 shadow-2xl relative z-10 border-4 border-amber-200">
                      <Award className="w-12 h-12 sm:w-16 sm:h-16 text-amber-300" />
                      <div className="absolute -bottom-4 bg-amber-400 text-indigo-950 text-[10px] font-black uppercase px-4 py-1 rounded-full shadow-lg whitespace-nowrap border border-amber-200">Official Record</div>
                    </div>

                    <h5 className="text-indigo-900 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4">BYTZ Academy</h5>
                    <h2 className="text-4xl sm:text-6xl text-slate-900 mb-8 sm:mb-12" style={{ fontFamily: 'Georgia, serif' }}>Certificate of Completion</h2>
                    
                    <p className="text-slate-500 text-sm sm:text-lg mb-4">This proudly certifies that</p>
                    <h3 className="text-3xl sm:text-5xl text-indigo-700 mb-8 sm:mb-12 border-b border-slate-200 pb-4 px-12 inline-block font-display" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                      {user?.name}
                    </h3>
                    
                    <p className="text-slate-500 text-sm sm:text-lg mb-2 max-w-2xl">has successfully completed all requirements, assignments, and examinations for the course:</p>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-800 mb-12 sm:mb-20 max-w-3xl">{activeCert.course_title}</h4>

                    <div className="w-full max-w-4xl grid grid-cols-2 gap-8 sm:gap-24 relative z-10">
                      <div className="flex flex-col items-center">
                        <div className="w-full border-b border-slate-400 mb-2 pb-2">
                          <span className="font-bold text-slate-800" style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '1.5rem' }}>{activeCert.instructor_name}</span>
                        </div>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Course Instructor</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-full border-b border-slate-400 mb-2 pb-2">
                          <span className="font-bold text-slate-800 font-mono tracking-wider">{new Date(activeCert.issue_date).toLocaleDateString()}</span>
                        </div>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Date of Issuance</span>
                      </div>
                    </div>

                    {/* Meta Data Footer */}
                    <div className="absolute bottom-8 right-12 text-right">
                       <p className="text-[10px] font-mono text-slate-400 mb-1">ID: {activeCert.certificate_hash.substring(0, 16)}</p>
                       <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">Grade: {activeCert.grade}</p>
                    </div>

                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
