
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface RegisterProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ onLogin, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('FREELANCER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: `u${Date.now()}`,
      name,
      email,
      role
    });
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white p-8 rounded-2xl border shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Create Account</h1>
        <p className="text-slate-500 mb-8 text-sm">Join the marketplace and start working today.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" required
              className="w-full px-4 py-3 rounded-xl border outline-none"
              placeholder="John Doe"
              value={name} onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" required
              className="w-full px-4 py-3 rounded-xl border outline-none"
              placeholder="john@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Account Type</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border outline-none"
              value={role} onChange={e => setRole(e.target.value as UserRole)}
            >
              <option value="FREELANCER">I want to work</option>
              <option value="CLIENT">I want to hire</option>
            </select>
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold mt-4">
            Create Account
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account? <button onClick={() => onNavigate('login')} className="text-indigo-600 font-bold">Login</button>
        </p>
      </div>
    </div>
  );
};
