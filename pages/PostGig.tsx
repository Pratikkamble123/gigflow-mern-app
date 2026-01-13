
import React, { useState } from 'react';
import { User } from '../types.ts';
import * as mockApi from '../services/mockApi.ts';

interface PostGigProps {
  user: User;
  onNavigate: (page: string) => void;
}

export const PostGig: React.FC<PostGigProps> = ({ user, onNavigate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.role !== 'CLIENT') return;
    
    setIsSubmitting(true);
    try {
      await mockApi.createGig({
        title: formData.title,
        description: formData.description,
        budget: Number(formData.budget),
        clientId: user.id,
        clientName: user.name,
      });
      onNavigate('dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2">What do you need?</h1>
        <p className="text-slate-500 mb-10 text-lg">Just tell us what you're looking for and we'll help you find the right expert.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Give it a title</label>
            <input 
              type="text"
              required
              placeholder="e.g. Need help fixing my website's checkout page"
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-900 placeholder:text-slate-300"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Explain the job in detail</label>
            <textarea 
              required
              rows={6}
              placeholder="Be honest and clear about what you need done..."
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none text-slate-900 placeholder:text-slate-300"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">How much are you paying? (₹)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input 
                type="number"
                required
                min="50"
                placeholder="0"
                className="w-full pl-10 pr-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-900"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <button 
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Nevermind
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Posting...' : 'Post it now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
