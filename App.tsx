import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { 
  Stethoscope, Loader2, PlusCircle, BookOpen, Users, 
  LogOut, PhoneCall, HelpCircle, ArrowLeft, Send, Moon, Sun, 
  MessageSquare, Mic, MicOff, Volume2, Radio, ShieldCheck 
} from 'lucide-react';

// --- 1. AUTH & THEME CONTEXT ---
const AuthContext = createContext<any>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const login = (name: string, code: string, role: 'teacher' | 'student') => {
    if (!name || !code) { alert("Bhai, saari details bhariye!"); return; }
    setLoading(true);
    setTimeout(() => {
      setUser({ name, code });
      setProfile({ role });
      setLoading(false);
    }, 800);
  };

  const logout = () => { setUser(null); setProfile(null); };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout, darkMode, setDarkMode }}>
      <div className={darkMode ? 'dark' : ''}>{children}</div>
    </AuthContext.Provider>
  );
}

// --- 2. TEACHER DASHBOARD ---
function TeacherDashboard() {
  const { logout, darkMode, setDarkMode } = useContext(AuthContext);
  const [activeDoubt, setActiveDoubt] = useState<any>(null);
  const [messages] = useState([
    { id: 1, user: 'Aman', text: 'Sir, Mitochondria ki structure samjha dein?' },
    { id: 2, user: 'Sneha', text: 'How to register for the next test series?' }
  ]);

  return (
    <div className={`min-h-screen flex transition-all duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar */}
      <div className="w-72 bg-blue-700 text-white p-6 hidden md:flex flex-col shadow-2xl z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white p-2 rounded-2xl"><Stethoscope className="w-6 h-6 text-blue-700" /></div>
          <span className="text-2xl font-black uppercase italic tracking-tighter">EagleWise</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <div className="flex items-center gap-3 bg-blue-800 p-4 rounded-2xl cursor-pointer border-l-4 border-white font-bold"><Radio size={20}/> Live Stream</div>
        </nav>

        {/* --- ALAG SE SEPARATE SUPPORT SECTION --- */}
        <div className="space-y-3 mb-6">
          <div className="p-4 bg-blue-800/60 rounded-2xl border border-blue-500/50">
            <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Academic Mentor</p>
            <p className="text-sm font-bold flex items-center gap-2"><PhoneCall size={14}/> +91 XXXXX XXXXX</p>
          </div>
          <div className="p-4 bg-green-800/40 rounded-2xl border border-green-500/30">
            <p className="text-[10px] font-black text-green-300 uppercase tracking-widest mb-1">Technical Support</p>
            <p className="text-sm font-bold flex items-center gap-2 text-green-100"><PhoneCall size={14}/> +91 YYYYY YYYYY</p>
          </div>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-2xl mb-4 transition-all">
          {darkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20}/>}
          <span className="font-bold text-sm">Switch Theme</span>
        </button>

        <button onClick={logout} className="flex items-center gap-3 p-4 text-red-200 hover:text-white font-bold transition-all"><LogOut size={20}/> Logout</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex gap-6">
        <div className="flex-1 flex flex-col">
          <div className={`flex-1 rounded-[3rem] border-4 border-dashed p-10 flex flex-col items-center justify-center text-center ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-blue-100 shadow-xl'}`}>
            {activeDoubt ? (
              <div className="animate-in zoom-in duration-300">
                <p className="text-blue-500 font-black text-xs uppercase mb-4 tracking-widest">Explaining {activeDoubt.user}'s Doubt</p>
                <h2 className="text-5xl font-black mb-10 leading-tight">{activeDoubt.text}</h2>
                <button onClick={() => setActiveDoubt(null)} className="bg-green-500 text-white px-10 py-4 rounded-3xl font-black uppercase shadow-lg active:scale-95 transition-all">Clear Board</button>
              </div>
            ) : (
              <div className="opacity-20 flex flex-col items-center">
                <Radio size={80} className="mb-4 text-slate-400 animate-pulse" />
                <p className="text-2xl font-bold italic tracking-tighter">Waiting for Student Doubts...</p>
              </div>
            )}
          </div>
        </div>

        {/* Doubt Sidebar */}
        <div className={`w-80 rounded-[2.5rem] border flex flex-col shadow-2xl overflow-hidden ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          <div className="p-5 bg-blue-600 text-white font-black text-xs uppercase tracking-widest text-center">Live Doubt Stream</div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map(m => (
              <button key={m.id} onClick={() => setActiveDoubt(m)} className={`w-full text-left p-5 rounded-3xl transition-all ${activeDoubt?.id === m.id ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-700 hover:border-blue-300 border-2 border-transparent'}`}>
                <p className={`text-[10px] font-black uppercase ${activeDoubt?.id === m.id ? 'text-blue-200' : 'text-blue-600'}`}>{m.user}</p>
                <p className="text-sm font-bold leading-tight">{m.text}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. STUDENT HALL ---
function StudentHall({ user }: any) {
  const { darkMode } = useContext(AuthContext);
  const [mic, setMic] = useState(false);

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? 'bg-slate-900' : 'bg-blue-600'}`}>
      <div className={`p-10 rounded-[3.5rem] shadow-2xl max-w-lg w-full border-4 border-white/20 ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}>
        <div className="bg-red-600 text-white text-[10px] py-2 font-black uppercase mb-6 rounded-xl animate-pulse text-center tracking-widest">EagleWise AI Security Active</div>
        
        <h2 className="text-4xl font-black mb-2 text-center tracking-tighter uppercase italic">{user.name}</h2>
        <p className="text-slate-400 text-xs font-bold mb-10 text-center tracking-widest uppercase">Live Portal</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
           <button onClick={() => setMic(!mic)} className={`p-6 rounded-[2rem] flex flex-col items-center gap-2 transition-all active:scale-95 ${mic ? 'bg-green-500 text-white shadow-xl animate-bounce' : 'bg-slate-50 dark:bg-slate-700'}`}>
             {mic ? <Mic size={28}/> : <MicOff size={28}/>}
             <span className="text-[10px] font-black uppercase tracking-tighter">Audio Doubt</span>
           </button>
           <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-[2rem] flex flex-col items-center justify-center">
             <span className="text-2xl font-black text-blue-600">15s</span>
             <span className="text-[10px] font-black uppercase text-slate-400">Next Question</span>
           </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-xl uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Start Session</button>
        
        {/* --- STUDENT SIDE SUPPORT BOXES --- */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 p-3 rounded-xl">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Academic Mentor</span>
             <span className="text-[11px] font-bold text-blue-600">+91 93159 89571</span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 p-3 rounded-xl">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Technical Support</span>
             <span className="text-[11px] font-bold text-green-600">+91 81350 48881</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 4. AUTH PAGE ---
function AuthPage() {
  const { login, darkMode, setDarkMode } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('student');

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className={`w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100'}`}>
        <div className="flex justify-between mb-8 items-center">
          <div className="bg-blue-600 p-4 rounded-2xl shadow-lg"><Stethoscope className="w-8 h-8 text-white" /></div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-2xl transition-all">
             {darkMode ? <Sun size={22} className="text-yellow-400"/> : <Moon size={22} className="text-slate-500"/>}
          </button>
        </div>
        
        <h1 className="text-4xl font-black mb-1 text-center tracking-tighter text-blue-600 uppercase italic">EagleWise</h1>
        <p className="text-center text-slate-400 mb-10 font-bold text-[9px] uppercase tracking-[0.3em]">Medical Live Portal</p>
        
        <div className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" className={`w-full px-6 py-4 rounded-2xl font-bold outline-none border-none shadow-sm ${darkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700'}`} />
          <input value={code} onChange={(e) => setCode(e.target.value)} type="password" placeholder="Unique Access Code" className={`w-full px-6 py-4 rounded-2xl font-bold outline-none border-none shadow-sm ${darkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700'}`} />
          
          <div className="grid grid-cols-2 gap-3 mt-6">
             <button onClick={() => setRole('student')} className={`py-4 rounded-2xl border-4 font-black transition-all ${role === 'student' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>STUDENT</button>
             <button onClick={() => setRole('teacher')} className={`py-4 rounded-2xl border-4 font-black transition-all ${role === 'teacher' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>TEACHER</button>
          </div>
          
          <button onClick={() => login(name, code, role)} className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl mt-6 uppercase hover:bg-blue-700 transition-all active:scale-95">JOIN LIVE HALL</button>
        </div>
      </div>
    </div>
  );
}

export default function App() { return ( <AuthProvider> <AppContent /> </AuthProvider> ); }

function AppContent() {
  const { user, profile, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-blue-600 font-black flex-col gap-4"><Loader2 className="animate-spin" size={50}/> LOADING EAGLEWISE...</div>;
  if (!user) return <AuthPage />;
  if (profile.role === 'teacher') return <TeacherDashboard />;
  return <StudentHall user={user} />;
}
