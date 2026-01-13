
import React from 'react';

export const LoomScriptPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto bg-slate-900 text-white p-10 rounded-3xl shadow-2xl">
      <div className="inline-block bg-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full mb-4 uppercase tracking-widest animate-pulse">Recording Mode</div>
      <h1 className="text-3xl font-black mb-8">Loom Demo Script (2 mins)</h1>
      
      <div className="space-y-8">
        <div className="border-l-4 border-indigo-500 pl-4">
          <h3 className="text-indigo-400 font-bold text-sm uppercase mb-1">00:00 - Intro (15s)</h3>
          <p className="italic text-slate-300">"Hi everyone, I'm Pratik Kamble. Today I'm demoing GigFlow, a mini freelance marketplace where transparency meets efficiency. I'll walk you through the full lifecycle: from job posting to hiring."</p>
        </div>

        <div className="border-l-4 border-slate-700 pl-4">
          <h3 className="text-slate-500 font-bold text-sm uppercase mb-1">00:15 - Posting a Job (30s)</h3>
          <p className="italic text-slate-300">"I'm logged in as a Client. I'll click 'Post a Gig'. Let's say I need a 'React Specialist'. I'll set a budget of $500, add a description, and hit post. Notice how the Marketplace updates instantly with my new listing."</p>
        </div>

        <div className="border-l-4 border-slate-700 pl-4">
          <h3 className="text-slate-500 font-bold text-sm uppercase mb-1">00:45 - Freelancer Bidding (30s)</h3>
          <p className="italic text-slate-300">"Now, switching roles to a Freelancer. I can see the new React gig. I'll click in, check the details, and place a bid for $450 with a quick proposal. My bid is now visible to the client in real-time."</p>
        </div>

        <div className="border-l-4 border-slate-700 pl-4">
          <h3 className="text-slate-500 font-bold text-sm uppercase mb-1">01:15 - The Hiring Transaction (30s)</h3>
          <p className="italic text-slate-300">"Back to the Client view. I see two bids. I'll hire Bob. This triggers a transactional update: Bob's status changes to 'HIRED', the gig is marked 'ASSIGNED', and other bids are automatically 'REJECTED' to keep our data clean."</p>
        </div>

        <div className="border-l-4 border-indigo-500 pl-4">
          <h3 className="text-indigo-400 font-bold text-sm uppercase mb-1">01:45 - Outro (15s)</h3>
          <p className="italic text-slate-300">"That's a wrap! A secure, responsive, and transactional marketplace built with React and Tailwind. Thanks for watching!"</p>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all"
        >
          Close Script
        </button>
      </div>
    </div>
  );
};
