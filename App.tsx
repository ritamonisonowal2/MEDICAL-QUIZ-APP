import React, { useState, createContext, useContext, ReactNode } from 'react';
import { 
  Stethoscope, Loader2, LogOut, PhoneCall, Radio, Bell, Info, Sun, Moon, ShieldCheck, Headset
} from 'lucide-react';

const AuthContext = createContext<any>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [announcement, setAnnouncement] = useState("Class is Live! Focus on the board.");

  const login = (name: string, code: string, role: 'teacher' | 'student') => {
    setLoading(true);
    setTimeout(() => {
      setUser({ name, code });
      setProfile({ role });
      setLoading(false);
    }, 800);
  };

  const logout = () => { setUser(null); setProfile(null); };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout, darkMode, setDarkMode, announcement, setAnnouncement }}>
      <div className={darkMode ? 'dark' : ''}>{children}</div>
    </AuthContext.Provider>
  );
}

// --- TEACHER DASHBOARD (Phone Numbers High Visibility) ---
function TeacherDashboard() {
  const { logout, darkMode, setDarkMode, setAnnouncement } = useContext(AuthContext);
  const [activeDoubt, setActiveDoubt] = useState<any>(null);
  const [msgInput, setMsgInput] = useState("");

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* SIDEBAR */}
      <div className="w-80 bg-blue-800 text-white p-6 flex flex-col shadow-2xl z-50">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white p-2 rounded-2xl"><Stethoscope className="text-blue-800" size={28} /></div>
          <span className="text-2xl font-black italic tracking-tighter">EAGLEWISE</span>
        </div>
        
        <div className="flex-1">
          <p className="text-[10px] font-black opacity-50 uppercase mb-4 tracking-widest">Support Contacts</p>
          
          {/* LARGE VISIBLE NUMBERS */}
          <div className="space-y-4 mb-10">
            <div className="bg-white/10 p-5 rounded-3xl border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={16} className="text-blue-300" />
                <span className="text-[10px] font-bold uppercase text-blue-200">Academic Mentor</span>
              </div>
              <p className="text-xl font-black">+91 93159 89571</p>
            </div>

            <div className="bg-green-500/20 p-5 rounded-3xl border border-green-500/30">
              <div className="flex items-center gap-2 mb-1">
                <Headset size={16} className="text-green-300" />
                <span className="text-[10px] font-bold uppercase text-green-300">Technical Support</span>
              </div>
              <p className="text-xl font-black text-green-100">+91 81350 48881</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button className="w-full text-left p-4 bg-blue-700 rounded-2xl font-bold flex items-center gap-3 italic"><Radio size={20}/> Live Classroom</button>
          </nav>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="mt-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center gap-3 font-bold transition-all">
          {darkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20}/>} {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <button onClick={logout} className="mt-4 p-4 text-red-300 font-bold flex items-center gap-3 hover:bg-red-500/10 rounded-2xl"><LogOut size={20}/> Logout</button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col p-8 overflow-hidden">
        <div className="mb-6 flex gap-4 bg-white dark:bg-slate-800 p-5 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-700">
          <Bell className="text-yellow-500" />
          <input className="flex-1 bg-transparent outline-none font-bold" placeholder="Type announcement here..." onChange={(e) => setMsgInput(e.target.value)} />
          <button onClick={() => setAnnouncement(msgInput)} className="bg-blue-600 text-white px-8 py-2 rounded-2xl font-black uppercase text-xs">Send</button>
        </div>

        <div className={`flex-1 rounded-[4rem] border-4 border-dashed flex flex-col items-center justify-center p-12 text-center ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-blue-100 shadow-xl shadow-blue-50/50'}`}>
          {activeDoubt ? (
            <div className="animate-in zoom-in duration-300">
               <span className="bg-blue-600 text-white px-6 py-1 rounded-full text-[10px] font-bold uppercase mb-4 inline-block">Live Explain</span>
               <h2 className="text-6xl font-black mb-10 leading-tight tracking-tighter">{activeDoubt.text}</h2>
               <button onClick={() => setActiveDoubt(null)} className="bg-green-500 text-white px-12 py-5 rounded-3xl font-black uppercase shadow-2xl">Mark Solved</button>
            </div>
          ) : (
            <div className="opacity-10"><Radio size={120} className="mx-auto mb-4 animate-pulse" /><p className="text-3xl font-black uppercase tracking-tighter italic">Classroom is Waiting</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- STUDENT HALL (Numbers Always Visible) ---
function StudentHall({ user }: any) {
  const { darkMode, announcement } = useContext(AuthContext);
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${darkMode ? 'bg-slate-900' : 'bg-blue-600'}`}>
      <div className="fixed top-6 w-full max-w-2xl px-6">
        <div className="bg-yellow-400 p-5 rounded-3xl shadow-2xl flex items-center gap-4 border-4 border-white">
          <Bell size={24} className="text-yellow-900 animate-bounce" />
          <p className="text-sm font-black uppercase text-yellow-900">{announcement}</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[4rem] shadow-2xl w-full max-w-md text-center mt-20">
        <h1 className="text-4xl font-black uppercase italic mb-1 text-blue-600">{user.name}</h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-10 text-center">Student Portal</p>
        
        <button className="w-full bg-blue-600 text-white py-6 rounded-[2.5rem] font-black text-2xl shadow-2xl active:scale-95 transition-all mb-10">START CLASS</button>
        
        {/* BIG NUMBERS FOR STUDENTS */}
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-slate-100">
            <span className="text-[8px] font-black text-slate-400 uppercase">Mentor</span>
            <span className="text-lg font-black text-blue-700">+91 XXXXX XXXXX</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-slate-100">
            <span className="text-[8px] font-black text-slate-400 uppercase">Tech Support</span>
            <span className="text-lg font-black text-green-600">+91 YYYYY YYYYY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- LOGIN PAGE ---
function AuthPage() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('student');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl w-full max-w-md border-b-8 border-blue-600">
        <div className="flex justify-center mb-8">
           <div className="bg-blue-600 p-5 rounded-3xl shadow-xl"><Stethoscope className="text-white" size={40} /></div>
        </div>
        <h1 className="text-4xl font-black text-blue-600 mb-2 uppercase text-center italic tracking-tighter">EagleWise</h1>
        <p className="text-center text-slate-400 mb-10 font-bold text-[10px] uppercase tracking-widest">Medical Entrance Live</p>
        
        <div className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-blue-200" />
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Access Code" type="password" className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-blue-200" />
          
          <div className="flex gap-2 pt-2">
            <button onClick={() => setRole('student')} className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all ${role === 'student' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>STUDENT</button>
            <button onClick={() => setRole('teacher')} className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all ${role === 'teacher' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>TEACHER</button>
          </div>
          
          <button onClick={() => login(name, code, role)} className="w-full bg-blue-700 text-white py-6 rounded-[2.5rem] font-black text-xl shadow-2xl active:scale-95 mt-6 transition-all uppercase tracking-widest">Login</button>
        </div>
      </div>
    </div>
  );
}

export default function App() { return ( <AuthProvider> <AppContent /> </AuthProvider> ); }

function AppContent() {
  const { user, profile, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-blue-600 animate-pulse text-2xl italic">EAGLEWISE...</div>;
  if (!user) return <AuthPage />;
  if (profile.role === 'teacher') return <TeacherDashboard />;
  return <StudentHall user={user} />;
}
