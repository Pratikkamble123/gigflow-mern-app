
import React from 'react';
import { User } from '../types.ts';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <nav className="bg-[#FCF9F4]/80 backdrop-blur-md border-b border-[#E8E2D9] sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onNavigate('dashboard')}
        >
          <div className="bg-[#D46B4B] text-white p-2 rounded-xl rotate-3 group-hover:rotate-0 transition-transform shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl md:text-2xl font-black text-[#1A2F2F] tracking-tighter">GigFlow.</span>
        </div>

        <div className="flex items-center space-x-4 md:space-x-8">
          <button onClick={() => onNavigate('dashboard')} className="text-[#1A2F2F] hover:text-[#D46B4B] font-bold text-sm md:text-base transition-colors hidden sm:block">Explore</button>
          
          {user ? (
            <div className="flex items-center space-x-4 md:space-x-6">
              {user.role === 'CLIENT' && (
                <button 
                  onClick={() => onNavigate('post-gig')}
                  className="bg-[#1A2F2F] text-[#FCF9F4] px-4 md:px-7 py-2.5 md:py-3 rounded-full font-bold text-xs md:text-sm hover:bg-[#2D4A4A] transition-all shadow-md active:scale-95"
                >
                  Post a Gig
                </button>
              )}
              <div className="flex items-center space-x-3 border-l border-[#E8E2D9] pl-4 md:pl-6">
                <div className="text-right hidden sm:block">
                  <p className="text-xs md:text-sm font-black text-[#1A2F2F] leading-none">{user.name}</p>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#D46B4B] mt-1">{user.role === 'CLIENT' ? 'Hirer' : 'Expert'}</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-[#A8A299] hover:text-[#D46B4B] transition-colors p-2"
                  title="Logout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4 md:space-x-6">
              <button onClick={() => onNavigate('login')} className="text-[#1A2F2F] font-bold text-sm md:text-base hover:text-[#D46B4B]">Log In</button>
              <button 
                onClick={() => onNavigate('register')}
                className="bg-[#D46B4B] text-white px-5 md:px-8 py-2.5 md:py-3.5 rounded-full font-black text-xs md:text-sm hover:bg-[#C05A3D] transition-all shadow-lg active:scale-95"
              >
                Join Now
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
