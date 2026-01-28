import React, { useState, createContext, useContext } from 'react';
import { Stethoscope, LogOut, PhoneCall, Radio, Bell, Sun, Moon, ShieldCheck, Headset } from 'lucide-react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [announcement, setAnnouncement] = useState("EagleWise Live: Bhaiya is here!");

  const login = (name, role) => {
    setUser({ name, role });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, darkMode, setDarkMode, announcement, setAnnouncement }}>
      <div className={darkMode ? 'dark' : ''}>{children}</div>
    </AuthContext.Provider>
  );
}

function TeacherDashboard() {
  const { logout, darkMode, setDarkMode, setAnnouncement } = useContext(AuthContext);
  const [activeDoubt, setActiveDoubt] = useState(null);
  const [msgInput, setMsgInput] = useState("");

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="w-72 bg-blue-700 text-white p-6 flex flex-col shadow-2xl z-50">
        <div className="flex items-center gap-3 mb-12">
          <Stethoscope size={24} />
          <span className="text-xl font-black italic">EAGLEWISE</span>
        </div>
        
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Support Contacts</p>
            <div className="bg-blue-800 p-4 rounded-2xl border border-blue-500">
              <p className="text-[9px] font-black uppercase text-blue-300">Academic Mentor</p>
              <p className="text-base font-black">+91 XXXXX XXXXX</p>
            </div>
            <div className="bg-green-600/30 p-4 rounded-2xl border border-green-500/30">
              <p className="text-[9px] font-black uppercase text-green-300">Tech Support</p>
              <p className="text-base font-black text-green-100">+91 YYYYY YYYYY</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 p-4 bg-blue-800/80 rounded-2xl font-bold text-sm italic border-l-4 border-white"><Radio size={20}/> Live Stream</button>
        </div>

        <div className="pt-6 border-t border-blue-600 space-y-2">
          <button onClick={() => setDarkMode(!darkMode)} className="w-full p-4 bg-white/10 rounded-2xl flex items-center gap-3 font-bold text-sm">
            {darkMode ? <Sun size={18}/> : <Moon size={18}/>} Theme
          </button>
          <button onClick={logout} className="w-full p-4 text-red-200 font-black flex items-center gap-3 text-sm"><LogOut size={18}/> Logout</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-8">
        <div className="mb-8 flex gap-4 bg-white dark:bg-slate-800 p-4 rounded-[2rem] shadow-sm border-2 border-slate-100 dark:border-slate-700">
          <input className="flex-1 bg-transparent outline-none font-bold text-sm" placeholder="Announce to students..." onChange={(e) => setMsgInput(e.target.value)} />
          <button onClick={() => setAnnouncement(msgInput)} className="bg-blue-600 text-white px-8 py-2 rounded-2xl font-black uppercase text-[10px]">Send</button>
        </div>

        <div className="flex flex-1 gap-8 min-h-0">
          <div className={`flex-[2.5] rounded-[3.5rem] border-4 border-dashed flex flex-col items-center justify-center p-10 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-blue-100 shadow-xl'}`}>
            {activeDoubt ? (
              <div className="text-center">
                <h2 className="text-5xl font-black mb-10 tracking-tighter">{activeDoubt.text}</h2>
                <button onClick={() => setActiveDoubt(null)} className="bg-green-500 text-white px-10 py-4 rounded-3xl font-black uppercase">Solved</button>
              </div>
            ) : (
              <div className="opacity-10 text-center"><Radio size={100} className="mx-auto mb-4 animate-pulse"/><p className="text-2xl font-black italic">Waiting...</p></div>
            )}
          </div>
          <div className={`flex-1 rounded-[2.5rem] border-2 flex flex-col shadow-2xl overflow-hidden ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <div className="p-4 bg-blue-600 text-white font-black text-[10px] uppercase text-center">Live Doubts</div>
            <div className="p-4"><button onClick={() => setActiveDoubt({text: 'Structure of Nephron?'})} className="w-full text-left p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl font-bold text-sm">Structure of Nephron?</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentHall({ user }) {
  const { darkMode, announcement } = useContext(AuthContext);
  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? 'bg-slate-900' : 'bg-blue-600'}`}>
      <div className="fixed top-6 w-full max-w-xl px-6">
        <div className="bg-yellow-400 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white">
          <p className="text-xs font-black uppercase text-yellow-900">{announcement}</p>
        </div>
      </div>
      <div className="bg-white p-10 rounded-[4rem] shadow-2xl w-full max-w-sm text-center">
        <h2 className="text-3xl font-black italic uppercase text-blue-600 mb-8">{user.name}</h2>
        <button className="w-full bg-blue-600 text-white py-5 rounded-[2.5rem] font-black text-xl shadow-xl">JOIN CLASS</button>
      </div>
    </div>
  );
}

function AuthPage() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl w-full max-w-md border-b-8 border-blue-600 text-center">
        <h1 className="text-4xl font-black text-blue-600 mb-8 uppercase italic">EagleWise</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-2xl font-bold mb-4 outline-none" />
        <div className="flex gap-2 mb-6">
          <button onClick={() => setRole('student')} className={`flex-1 py-4 rounded-2xl font-black text-xs ${role === 'student' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>STUDENT</button>
          <button onClick={() => setRole('teacher')} className={`flex-1 py-4 rounded-2xl font-black text-xs ${role === 'teacher' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>TEACHER</button>
        </div>
        <button onClick={() => login(name, role)} className="w-full bg-blue-700 text-white py-5 rounded-[2rem] font-black text-xl shadow-lg uppercase">Login</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useContext(AuthContext);
  if (!user) return <AuthPage />;
  return user.role === 'teacher' ? <TeacherDashboard /> : <StudentHall user={user} />;
}
