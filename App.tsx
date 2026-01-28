import React, { useState, createContext, useContext, ReactNode } from 'react';
import { 
  Stethoscope, Mail, Lock, UserCircle, Loader2, 
  PlusCircle, BookOpen, Users, LogOut, PhoneCall, HelpCircle, ShieldCheck
} from 'lucide-react';

// --- 1. AUTH SYSTEM (Unique Code & Name Entry) ---
const AuthContext = createContext<any>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const login = (name: string, code: string, role: 'teacher' | 'student') => {
    if (!name || !code) {
      alert("Please enter both Name and Access Code");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setUser({ name: name, code: code });
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

// --- 2. TEACHER DASHBOARD (Branded: EagleWise) ---
function TeacherDashboard() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Updated with Dual Support */}
      <div className="w-64 bg-blue-700 text-white p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white p-1.5 rounded-xl shadow-lg">
            <Stethoscope className="w-6 h-6 text-blue-700" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">EagleWise</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <div className="flex items-center gap-3 bg-blue-800 p-3 rounded-xl cursor-pointer shadow-inner font-semibold">
            <BookOpen className="w-5 h-5" /> Live Polls
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-xl cursor-pointer transition-all">
            <Users className="w-5 h-5" /> Manage Students
          </div>
        </nav>

        {/* Dual Support Section for Dashboard */}
        <div className="mt-auto pt-6 border-t border-blue-600 space-y-4 mb-4">
          <div>
            <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">Academic Mentor</p>
            <p className="text-xs font-medium">+91 93159 89571</p>
          </div>
          <div>
            <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">Technical Support</p>
            <p className="text-xs font-medium text-green-300">+91 8135048881</p>
          </div>
        </div>
        
        <button onClick={logout} className="flex items-center gap-3 p-3 text-red-200 hover:text-white hover:bg-red-500/20 rounded-xl transition-all font-bold">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-800">Teacher Dashboard</h1>
            <p className="text-slate-500 font-medium">Manage your Live Medical Polls</p>
          </div>
          <button onClick={() => alert("Redirecting to Live Poll Creator...")} className="bg-blue-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all font-bold">
            <PlusCircle className="w-5 h-5" /> Create New Quiz
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Total Quizzes</h3>
            <p className="text-5xl font-black text-blue-600">12</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Active Students</h3>
            <p className="text-5xl font-black text-green-500">45</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Avg. Performance</h3>
            <p className="text-5xl font-black text-purple-600">82%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. AUTH PAGE (EagleWise Branding + Student Code + Dual Support) ---
function AuthPage() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('student');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.1)] p-12 border border-slate-100">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-600 p-5 rounded-3xl shadow-2xl rotate-3 transform hover:rotate-0 transition-all">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-center text-slate-900 mb-1 tracking-tighter uppercase">EagleWise</h1>
        <p className="text-center text-slate-400 mb-10 font-bold tracking-widest text-xs uppercase">Live Medical Entrance Polls</p>
        
        <div className="space-y-4">
          <div className="relative">
            <UserCircle className="absolute left-4 top-4.5 w-5 h-5 text-slate-400" />
            <input 
              value={name} onChange={(e) => setName(e.target.value)}
              type="text" placeholder="Your Full Name" 
              className="w-full pl-12 pr-6 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700 transition-all shadow-inner" 
            />
          </div>
          <div className="relative">
            <ShieldCheck className="absolute left-4 top-4.5 w-5 h-5 text-slate-400" />
            <input 
              value={code} onChange={(e) => setCode(e.target.value)}
              type="password" placeholder="Access Code (Bhaiya Code)" 
              className="w-full pl-12 pr-6 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700 transition-all shadow-inner" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button onClick={() => setRole('student')} className={`py-4 rounded-2xl border-2 font-black transition-all ${role === 'student' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-50 text-slate-400'}`}>STUDENT</button>
            <button onClick={() => setRole('teacher')} className={`py-4 rounded-2xl border-2 font-black transition-all ${role === 'teacher' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-50 text-slate-400'}`}>
