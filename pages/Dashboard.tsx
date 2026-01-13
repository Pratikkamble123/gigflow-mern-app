
import React, { useState, useEffect } from 'react';
import { User, Gig } from '../types.ts';
import * as mockApi from '../services/mockApi.ts';

interface DashboardProps {
  user: User;
  onNavigate: (page: string, params?: { id: string }) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'MY_GIGS' | 'OPEN'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    mockApi.getGigs().then(setGigs);
  }, []);

  const filteredGigs = gigs.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    
    if (filter === 'OPEN') return g.status === 'OPEN';
    if (filter === 'MY_GIGS') {
      return user.role === 'CLIENT' ? g.clientId === user.id : g.hiredFreelancerId === user.id;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
      <header className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1A2F2F] tracking-tighter leading-[0.9] mb-6 italic">
            The Gig Board.
          </h1>
          <p className="text-[#6B705C] text-lg md:text-2xl font-medium leading-relaxed max-w-lg">
            Where local craft meets digital scale. Browse, bid, and build something real.
          </p>
        </div>
        <div className="relative w-full md:w-[450px]">
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-14 pr-8 py-5 md:py-6 rounded-[2.5rem] bg-white border-2 border-[#E8E2D9] focus:border-[#D46B4B] focus:ring-0 transition-all shadow-xl shadow-[#1A2F2F]/5 outline-none text-[#1A2F2F] placeholder:text-[#A8A299] font-bold text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 absolute left-5 top-1/2 -translate-y-1/2 text-[#D46B4B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
        <div className="flex bg-[#E8E2D9]/30 p-2 rounded-[2.5rem] border border-[#E8E2D9] overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setFilter('ALL')}
            className={`whitespace-nowrap px-8 md:px-12 py-3.5 md:py-4 rounded-[2rem] text-sm md:text-base font-black transition-all ${filter === 'ALL' ? 'bg-[#1A2F2F] text-[#FCF9F4] shadow-2xl' : 'text-[#6B705C] hover:text-[#1A2F2F]'}`}
          >
            All Gigs
          </button>
          <button 
            onClick={() => setFilter('OPEN')}
            className={`whitespace-nowrap px-8 md:px-12 py-3.5 md:py-4 rounded-[2rem] text-sm md:text-base font-black transition-all ${filter === 'OPEN' ? 'bg-[#1A2F2F] text-[#FCF9F4] shadow-2xl' : 'text-[#6B705C] hover:text-[#1A2F2F]'}`}
          >
            Available
          </button>
          <button 
            onClick={() => setFilter('MY_GIGS')}
            className={`whitespace-nowrap px-8 md:px-12 py-3.5 md:py-4 rounded-[2rem] text-sm md:text-base font-black transition-all ${filter === 'MY_GIGS' ? 'bg-[#1A2F2F] text-[#FCF9F4] shadow-2xl' : 'text-[#6B705C] hover:text-[#1A2F2F]'}`}
          >
            {user.role === 'CLIENT' ? 'My Posts' : 'My Work'}
          </button>
        </div>
        
        {user.role === 'CLIENT' && (
          <button 
            onClick={() => onNavigate('post-gig')}
            className="bg-[#D46B4B] text-white px-10 py-5 rounded-[2.5rem] font-black text-lg flex items-center justify-center hover:bg-[#C05A3D] transition-all shadow-2xl shadow-[#D46B4B]/30 group w-full lg:w-auto"
          >
            <span className="mr-3 group-hover:rotate-90 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
            Post New Gig
          </button>
        )}
      </div>

      {filteredGigs.length === 0 ? (
        <div className="bg-white rounded-[4rem] border-4 border-dashed border-[#E8E2D9] p-24 md:p-32 text-center">
          <p className="text-[#A8A299] text-3xl font-black mb-6">Nothing matches.</p>
          <button onClick={() => {setSearchTerm(''); setFilter('ALL');}} className="text-[#D46B4B] font-black text-lg border-b-2 border-[#D46B4B] hover:text-[#1A2F2F] hover:border-[#1A2F2F] transition-all pb-1">Reset all filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
          {filteredGigs.map(gig => (
            <div 
              key={gig.id} 
              className="bg-white rounded-[3rem] p-10 shadow-lg border border-[#E8E2D9] hover:shadow-[0_40px_80px_rgba(26,47,47,0.12)] hover:-translate-y-3 transition-all cursor-pointer group flex flex-col h-full"
              onClick={() => onNavigate('gig-details', { id: gig.id })}
            >
              <div className="flex justify-between items-start mb-10">
                <span className={`px-6 py-2 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] ${
                  gig.status === 'OPEN' ? 'bg-[#F0F7E6] text-[#4F772D]' : 'bg-[#E8E2D9]/40 text-[#A8A299]'
                }`}>
                  {gig.status === 'OPEN' ? 'Open for Bids' : 'In Progress'}
                </span>
                <span className="text-[#1A2F2F] font-black text-2xl md:text-3xl">₹{gig.budget.toLocaleString()}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-[#1A2F2F] group-hover:text-[#D46B4B] transition-colors mb-4 line-clamp-1 leading-tight italic">
                {gig.title}
              </h3>
              <p className="text-[#6B705C] text-lg md:text-xl leading-relaxed mb-12 line-clamp-3 flex-grow font-medium">
                {gig.description}
              </p>
              
              <div className="pt-8 border-t border-[#F1EEE9] flex items-center justify-between">
                <div className="flex items-center text-sm md:text-base font-extrabold text-[#1A2F2F]">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#D46B4B]/10 text-[#D46B4B] flex items-center justify-center mr-4 font-black text-sm border border-[#D46B4B]/20">
                    {gig.clientName.charAt(0)}
                  </div>
                  {gig.clientName}
                </div>
                <span className="text-[10px] md:text-[11px] font-black uppercase text-[#A8A299] tracking-widest">
                  {new Date(gig.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
