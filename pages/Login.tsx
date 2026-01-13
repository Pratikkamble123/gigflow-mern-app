
import React, { useState } from 'react';
import { User } from '../types.ts';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'CLIENT' | 'FREELANCER'>('CLIENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: email === 'client@test.com' ? 'u1' : 'u2',
      name: email === 'client@test.com' ? 'Alice Johnson' : 'Bob Smith',
      email: email,
      role: role
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-12 md:mt-24 px-4">
      <div className="bg-white p-10 md:p-16 rounded-[3.5rem] border-2 border-[#E8E2D9] shadow-2xl shadow-[#1A2F2F]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D46B4B]/5 rounded-bl-full"></div>
        
        <h1 className="text-5xl md:text-6xl font-black mb-4 text-[#1A2F2F] tracking-tighter italic">Welcome.</h1>
        <p className="text-[#6B705C] mb-12 text-lg md:text-xl font-medium leading-relaxed">
          Log in to manage your gigs and projects.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block text-xs font-black text-[#1A2F2F] uppercase tracking-[0.2em] mb-4">Your Email Address</label>
            <input 
              type="email" required
              className="w-full px-8 py-6 rounded-3xl bg-[#FCF9F4] border-2 border-[#E8E2D9] focus:border-[#D46B4B] outline-none transition-all text-[#1A2F2F] font-bold text-lg"
              placeholder="e.g. name@expert.com"
              value={email} onChange={e => setEmail(e.target.value)}
            />
            <p className="text-[11px] text-[#A8A299] mt-4 font-bold italic">
              Hint: Try <span className="text-[#D46B4B]">client@test.com</span> to test the hirer dashboard.
            </p>
          </div>
          
          <div>
            <label className="block text-xs font-black text-[#1A2F2F] uppercase tracking-[0.2em] mb-5">I am looking to...</label>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <button 
                type="button" 
                onClick={() => setRole('CLIENT')}
                className={`py-5 px-4 rounded-[1.5rem] border-2 font-black text-sm md:text-base transition-all ${role === 'CLIENT' ? 'bg-[#1A2F2F] border-[#1A2F2F] text-[#FCF9F4] shadow-2xl scale-[1.02]' : 'border-[#E8E2D9] text-[#A8A299] hover:border-[#D46B4B] hover:text-[#D46B4B]'}`}
              >
                Hire Help
              </button>
              <button 
                type="button"
                onClick={() => setRole('FREELANCER')}
                className={`py-5 px-4 rounded-[1.5rem] border-2 font-black text-sm md:text-base transition-all ${role === 'FREELANCER' ? 'bg-[#1A2F2F] border-[#1A2F2F] text-[#FCF9F4] shadow-2xl scale-[1.02]' : 'border-[#E8E2D9] text-[#A8A299] hover:border-[#D46B4B] hover:text-[#D46B4B]'}`}
              >
                Work Expertly
              </button>
            </div>
          </div>

          <button className="w-full bg-[#D46B4B] text-white py-6 md:py-8 rounded-[2.5rem] font-black text-xl md:text-2xl hover:bg-[#C05A3D] transition-all shadow-2xl shadow-[#D46B4B]/30 mt-8 active:scale-[0.97]">
            Enter Dashboard
          </button>
        </form>
        
        <p className="mt-14 text-center text-sm md:text-base font-extrabold text-[#6B705C]">
          New to GigFlow? <button onClick={() => onNavigate('register')} className="text-[#D46B4B] border-b-2 border-[#D46B4B] hover:text-[#1A2F2F] hover:border-[#1A2F2F] pb-1 ml-2 transition-all">Create an account</button>
        </p>
      </div>
    </div>
  );
};
