import React, { useState, createContext, useContext, ReactNode } from 'react';
import { 
  Stethoscope, Mail, Lock, UserCircle, Loader2, 
  PlusCircle, BookOpen, Users, LogOut, PhoneCall, HelpCircle, ShieldCheck, ArrowLeft, Send
} from 'lucide-react';

// --- 1. AUTH SYSTEM ---
const AuthContext = createContext<any>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const login = (name: string, code: string, role: 'teacher' | 'student') => {
    setLoading(true);
    setTimeout(() => {
      setUser({ name: name, code: code });
      setProfile({ role: role });
      setLoading(false);
    }, 800);
  };

  const logout = () => { setUser(null); setProfile(null); };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- 2. TEACHER DASHBOARD (With Form Logic) ---
function TeacherDashboard() {
  const { logout } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false); // Button control state

  // Agar button dab gaya hai, toh ye Form dikhao
  if (showForm) {
    return (
      <div className="min-h-screen bg-white p-8">
        <button onClick={() => setShowForm(false)} className="flex items-center gap-2 text-blue-600 font-bold mb-8 hover:underline">
          <ArrowLeft size={20}/> Back to Dashboard
        </button>
        
        <div className="max-w-2xl mx-auto bg-slate-50 p-10 rounded-[2rem] border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-black mb-2 text-slate-800">Create Live Poll</h2>
          <p className="text-slate-500 mb-8 font-medium">EagleWise Real-time Quiz Engine</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-black text-slate-400 uppercase mb-2">Question</label>
              <textarea placeholder="e.g. Which organ is responsible for pumping blood?" className="w-full p-4 border-none rounded-2xl bg-white shadow-inner min-h-[100px] outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Option A (Correct)" className="p-4 border-2 border-green-100 rounded-2xl outline-none focus:border-green-500" />
              <input type="text" placeholder="Option B" className="p-4 border-none bg-white rounded-2xl shadow-inner outline-none" />
              <input type="text" placeholder="Option C" className="p-4 border-none bg-white rounded-2xl shadow-inner outline-none" />
              <input type="text" placeholder="Option D" className="p-4 border-none bg-white rounded-2xl shadow-inner outline-none" />
            </div>
            <button onClick={() => {alert("Poll Launched! Students can now see this question."); setShowForm(false);}} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-700 shadow-xl shadow-blue-100">
              <Send size={24}/> LAUNCH LIVE POLL
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard UI
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="w-64 bg-blue-700 text-white p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white p-1.5 rounded-xl shadow-lg"><Stethoscope className="w-6 h-6 text-blue-700" /></div>
          <span className="text-xl font-black tracking-tighter uppercase">EagleWise</span>
        </div>
        <nav className="flex-1 space-y-2">
          <div className="flex items-center gap-3 bg-blue-800 p-3 rounded-xl cursor-pointer shadow-inner font-semibold"><BookOpen className="w-5 h-5" /> Live Polls</div>
          <div className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-xl cursor-pointer transition-all"><Users className="w-5 h-5" /> Manage Students</div>
        </nav>
        <div className="mt-auto pt-6 border-t border-blue-600 space-y-4 mb-4">
          <div><p className="text-[10px] text-blue-200 font-bold uppercase mb-1">Academic Mentor</p><p className="text-xs font-medium">+91 93159 89571</p></div>
          <div><p className="text-[10px] text-blue-200 font-bold uppercase mb-1">Technical Support</p><p className="text-xs font-medium text-green-300">+91 8135048881</p></div>
        </div>
        <button onClick={logout} className="flex items-center gap-3 p-3 text-red-200 hover:text-white hover:bg-red-500/20 rounded-xl transition-all font-bold"><LogOut className="w-5 h-5" /> Logout</button>
      </div>

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-slate-800">Teacher Dashboard</h1>
          {/* Working Button: Now sets showForm to true */}
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all font-bold">
            <PlusCircle className="w-5 h-5" /> Create New Quiz
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center"><h3 className="text-slate-400 font-bold uppercase text-xs mb-2">Total Quizzes</h3><p className="text-5xl font-black text-blue-600">12</p></div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center"><h3 className="text-slate-400 font-bold uppercase text-xs mb-2">Active Students</h3><p className="text-5xl font-black text-green-500">45</p></div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center"><h3 className="text-slate-400 font-bold uppercase text-xs mb-2">Avg. Score</h3><p className="text-5xl font-black text-purple-600">82%</p></div>
        </div>
      </div>
    </div>
  );
}

// --- 3. AUTH PAGE (Branded + Support) ---
function AuthPage() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('student');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-12 border border-slate-100">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-600 p-5 rounded-3xl shadow-2xl rotate-3 transition-all"><Stethoscope className="w-10 h-10 text-white" /></div>
        </div>
        <h1 className="text-4xl font-black text-center text-slate-900 mb-1 tracking-tighter uppercase">EagleWise</h1>
        <p className="text-center text-slate-400 mb-10 font-bold text-xs uppercase tracking-widest">Live Medical Entrance Polls</p>
        
        <div className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Full Name" className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700 shadow-inner" />
          <input value={code} onChange={(e) => setCode(e.target.value)} type="password" placeholder="Unique Access Code" className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700 shadow-inner" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button onClick={() => setRole('student')} className={`py-4 rounded-2xl border-2 font-black transition-all ${role === 'student' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-50 text-slate-400'}`}>STUDENT</button>
            <button onClick={() => setRole('teacher')} className={`py-4 rounded-2xl border-2 font-black transition-all ${role === 'teacher' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-50 text-slate-400'}`}>TEACHER</button>
          </div>
          <button onClick={() => login(name, code, role)} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 shadow-xl transition-all mt-4 uppercase">JOIN NOW</button>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-50 grid grid-cols-2 gap-6">
          <div className="text-left"><p className="text-[10px] text-slate-400 font-black uppercase mb-1">Academic Mentor</p><p className="text-xs font-bold text-blue-600">+91 XXXXX XXXXX</p></div>
          <div className="text-right"><p className="text-[10px] text-slate-400 font-black uppercase mb-1">Tech Support</p><p className="text-xs font-bold text-green-600">+91 YYYYY YYYYY</p></div>
        </div>
      </div>
    </div>
  );
}

// --- 4. MAIN APP ---
export default function App() { return ( <AuthProvider> <AppContent /> </AuthProvider> ); }

function AppContent() {
  const { user, profile, loading } = useContext(AuthContext);
  if (loading) return (<div className="min-h-screen flex items-center justify-center bg-white"><div className="text-center"><Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" /><p className="text-blue-900 font-black text-2xl tracking-[0.3em] uppercase">EagleWise</p></div></div>);
  if (!user) return <AuthPage />;
  if (profile.role === 'teacher') return <TeacherDashboard />;
  
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6 text-center">
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-lg border-b-8 border-blue-800">
        <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"><Stethoscope className="w-10 h-10 text-blue-600" /></div>
        <h2 className="text-3xl font-black mb-4">Welcome, {user.name}!</h2>
        <p className="text-slate-500 mb-8 font-bold">Waiting for Mentor to start the Poll. Correct answers will show instantly on wrong attempts.</p>
        <button onClick={() => alert("Joining Live Poll Room...")} className="w-full bg-green-500 text-white py-6 rounded-3xl font-black text-2xl hover:bg-green-600 transition-all uppercase tracking-widest">ENTER LIVE HALL</button>
      </div>
    </div>
  );
}
