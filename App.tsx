import React, { useState, createContext, useContext, ReactNode } from 'react';
import { 
  Stethoscope, Mail, Lock, UserCircle, Loader2, 
  PlusCircle, BookOpen, Users, LogOut, ChevronRight 
} from 'lucide-react';

// --- 1. MOCK AUTH SYSTEM (Database bypass karne ke liye) ---
const AuthContext = createContext<any>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const login = (role: 'teacher' | 'student') => {
    setLoading(true);
    setTimeout(() => {
      setUser({ email: 'user@example.com' });
      setProfile({ role: role });
      setLoading(false);
    }, 1000);
  };

  const logout = () => { setUser(null); setProfile(null); };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- 2. TEACHER DASHBOARD COMPONENT ---
function TeacherDashboard() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <Stethoscope className="w-8 h-8" />
          <span className="text-xl font-bold">MedQuiz Pro</span>
        </div>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 bg-blue-800 p-3 rounded-lg"><BookOpen className="w-5 h-5" /> Quizzes</div>
          <div className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-lg cursor-pointer"><Users className="w-5 h-5" /> Students</div>
          <button onClick={logout} className="flex items-center gap-3 p-3 text-red-200 hover:text-white w-full"><LogOut className="w-5 h-5" /> Logout</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <PlusCircle className="w-5 h-5" /> Create New Quiz
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium">Total Quizzes</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium">Active Students</h3>
            <p className="text-3xl font-bold text-green-600">45</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium">Avg. Score</h3>
            <p className="text-3xl font-bold text-purple-600">82%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. AUTH PAGE (Login/Signup) ---
function AuthPage() {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'teacher' | 'student'>('student');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-3 rounded-full shadow-lg"><Stethoscope className="w-8 h-8 text-white" /></div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Medical Quiz</h1>
        <p className="text-center text-gray-500 mb-8">{isLogin ? 'Sign in to your account' : 'Create a new account'}</p>
        
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>

          {!isLogin && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button onClick={() => setRole('student')} className={`p-3 rounded-xl border-2 transition-all ${role === 'student' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100'}`}>Student</button>
              <button onClick={() => setRole('teacher')} className={`p-3 rounded-xl border-2 transition-all ${role === 'teacher' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100'}`}>Teacher</button>
            </div>
          )}

          <button onClick={() => login(role)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all mt-6">
            {isLogin ? 'Sign In' : 'Get Started'}
          </button>
        </div>

        <button onClick={() => setIsLogin(!isLogin)} className="w-full text-center mt-6 text-gray-600 font-medium hover:text-blue-600 transition-colors">
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}

// --- 4. MAIN APP ENTRY ---
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, profile, loading } = useContext(AuthContext);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center"><Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" /><p className="text-gray-600 font-medium">Syncing Data...</p></div>
    </div>
  );

  if (!user) return <AuthPage />;
  if (profile.role === 'teacher') return <TeacherDashboard />;
  
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg">
        <UserCircle className="w-20 h-20 text-blue-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Welcome, Future Doctor!</h2>
        <p className="text-gray-600 mb-8 text-lg">Enter your class code to start the medical entrance quiz or review your last attempts.</p>
        <div className="flex gap-4">
          <input type="text" placeholder="Enter Code" className="flex-1 px-6 py-4 border-2 border-gray-100 rounded-2xl focus:border-blue-500 outline-none text-xl font-mono" />
          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">Join</button>
        </div>
      </div>
    </div>
  );
}
