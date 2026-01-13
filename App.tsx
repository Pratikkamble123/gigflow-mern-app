
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { PostGig } from './pages/PostGig.tsx';
import { GigDetails } from './pages/GigDetails.tsx';
import { Login } from './pages/Login.tsx';
import { Register } from './pages/Register.tsx';
import { READMEPage } from './pages/READMEPage.tsx';
import { LoomScriptPage } from './pages/LoomScriptPage.tsx';
import { User } from './types.ts';
import * as mockApi from './services/mockApi.ts';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [selectedGigId, setSelectedGigId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gigflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('gigflow_user', JSON.stringify(u));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gigflow_user');
    setCurrentPage('login');
  };

  const navigateTo = (page: string, params?: { id: string }) => {
    if (params?.id) setSelectedGigId(params.id);
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const renderPage = () => {
    if (!user && !['login', 'register', 'readme'].includes(currentPage)) {
      return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user!} onNavigate={navigateTo} />;
      case 'post-gig':
        return <PostGig user={user!} onNavigate={navigateTo} />;
      case 'gig-details':
        return <GigDetails gigId={selectedGigId!} user={user!} onNavigate={navigateTo} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'register':
        return <Register onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'readme':
        return <READMEPage onNavigate={navigateTo} />;
      case 'loom':
        return <LoomScriptPage onNavigate={navigateTo} />;
      default:
        return <Dashboard user={user!} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} onNavigate={navigateTo} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <footer className="bg-white border-t py-8 text-center text-slate-500 text-sm">
        <div className="flex justify-center space-x-8 mb-4">
          <button onClick={() => navigateTo('readme')} className="hover:text-indigo-600 transition-colors">How this works</button>
          <button onClick={() => navigateTo('loom')} className="hover:text-indigo-600 transition-colors">Watch Demo</button>
        </div>
        <p className="font-medium">GigFlow - Handcrafted by a developer for the community.</p>
        <p className="mt-1">Built with ❤️ for the ServiceHive Assignment.</p>
      </footer>
    </div>
  );
};

export default App;
