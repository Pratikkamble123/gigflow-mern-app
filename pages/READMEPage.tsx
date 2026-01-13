
import React from 'react';

export const READMEPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 prose prose-slate">
      <h1 className="text-4xl font-black mb-8 text-slate-900 tracking-tight">Developer's Notes</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-indigo-600 border-b-2 border-indigo-50 pb-2 mb-4">What is this?</h2>
        <p className="text-lg text-slate-600">I built GigFlow to show how a modern marketplace could actually feel. It's not just a demo—it's a real-feeling app where people can find help and get paid. Everything you see here was built from scratch using React, Tailwind, and a lot of caffeine.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-black mb-4 uppercase tracking-wider text-slate-800">Cool Features</h2>
        <ul className="space-y-4 text-slate-600 list-none pl-0">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-700 font-bold p-1 rounded mr-3 text-xs mt-1">NEW</span>
            <span><strong>Human Touch:</strong> The language used throughout the app feels like a conversation, not a robot.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-emerald-100 text-emerald-700 font-bold p-1 rounded mr-3 text-xs mt-1">TX</span>
            <span><strong>Smart Hiring:</strong> When you hire someone, it automatically tells everyone else the spot is filled.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-700 font-bold p-1 rounded mr-3 text-xs mt-1">UI</span>
            <span><strong>Smooth Transitions:</strong> Mobile-first and fully responsive. Works great on your phone or laptop.</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-black mb-4 uppercase tracking-wider text-slate-800">The Tech Under the Hood</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl">
            <h4 className="font-black mb-2 text-slate-900 uppercase text-xs tracking-widest">Frontend</h4>
            <p className="text-sm">React 19 for the heavy lifting and Tailwind for all the pretty styling. TypeScript keeps things from breaking.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl">
            <h4 className="font-black mb-2 text-slate-900 uppercase text-xs tracking-widest">Backend Logic</h4>
            <p className="text-sm">Mocked API for speed, but designed to be swapped with a real Node/MongoDB backend in minutes.</p>
          </div>
        </div>
      </section>

      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
        >
          Got it, take me back
        </button>
      </div>
    </div>
  );
};
