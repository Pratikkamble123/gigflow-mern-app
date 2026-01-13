
import React, { useState, useEffect } from 'react';
import { User, Gig, Bid } from '../types.ts';
import * as mockApi from '../services/mockApi.ts';

interface GigDetailsProps {
  gigId: string;
  user: User;
  onNavigate: (page: string, params?: { id: string }) => void;
}

export const GigDetails: React.FC<GigDetailsProps> = ({ gigId, user, onNavigate }) => {
  const [gig, setGig] = useState<Gig | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const g = await mockApi.getGigById(gigId);
      if (g) {
        setGig(g);
        const b = await mockApi.getBidsForGig(gigId);
        setBids(b);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [gigId]);

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gig) return;
    
    setIsSubmitting(true);
    try {
      const newBid = await mockApi.placeBid({
        gigId: gig.id,
        freelancerId: user.id,
        freelancerName: user.name,
        amount: Number(bidAmount),
        message: bidMessage,
      });
      setBids([...bids, newBid]);
      setShowBidForm(false);
      setBidAmount('');
      setBidMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHire = async (bidId: string) => {
    if (!confirm('Are you ready? This will officially start the job.')) return;
    
    try {
      const result = await mockApi.hireFreelancer(bidId);
      setGig(result.gig);
      setBids(result.bids);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isLoading) return <div className="text-center py-40 font-black text-[#A8A299] text-2xl italic animate-pulse">Pulling files...</div>;
  if (!gig) return <div className="text-center py-40 text-[#D46B4B] font-black text-3xl">Gig missing.</div>;

  const userHasBid = bids.some(b => b.freelancerId === user.id);
  const isOwner = gig.clientId === user.id;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-[#1A2F2F]/5 border border-[#E8E2D9] overflow-hidden mb-16">
        <div className="p-10 md:p-16 border-b border-[#F1EEE9] bg-[#FCF9F4]/40">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
            <div>
              <span className={`inline-block px-6 py-2 rounded-full text-[10px] md:text-[12px] font-black uppercase tracking-[0.25em] mb-6 ${
                gig.status === 'OPEN' ? 'bg-[#F0F7E6] text-[#4F772D]' : 'bg-[#E8E2D9] text-[#A8A299]'
              }`}>
                {gig.status === 'OPEN' ? 'Accepting Bids' : 'Work Assigned'}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#1A2F2F] tracking-tighter leading-[0.95] italic">
                {gig.title}
              </h1>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-[#E8E2D9] shadow-sm text-center md:text-right min-w-[200px]">
              <p className="text-[10px] font-black text-[#A8A299] uppercase tracking-widest mb-2">Maximum Budget</p>
              <p className="text-4xl md:text-5xl font-black text-[#D46B4B]">₹{gig.budget.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 md:gap-12 items-center text-sm md:text-base font-extrabold text-[#6B705C]">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-[#1A2F2F] text-[#FCF9F4] mr-4 flex items-center justify-center text-xs font-black">
                {gig.clientName.charAt(0)}
              </div>
              <span className="text-[#1A2F2F]">Posted by {gig.clientName}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#D46B4B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(gig.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="p-10 md:p-16">
          <h2 className="text-3xl font-black text-[#1A2F2F] mb-8 italic">The Brief.</h2>
          <p className="text-[#6B705C] text-xl md:text-2xl leading-relaxed font-medium whitespace-pre-wrap">
            {gig.description}
          </p>
          
          {!isOwner && gig.status === 'OPEN' && !userHasBid && user.role === 'FREELANCER' && (
            <div className="mt-16 pt-16 border-t border-[#F1EEE9]">
              {!showBidForm ? (
                <button 
                  onClick={() => setShowBidForm(true)}
                  className="w-full bg-[#D46B4B] text-white py-6 md:py-8 rounded-[3rem] font-black text-2xl md:text-3xl hover:bg-[#C05A3D] transition-all shadow-2xl shadow-[#D46B4B]/30 active:scale-[0.98]"
                >
                  I can do this!
                </button>
              ) : (
                <form onSubmit={handlePlaceBid} className="space-y-10 bg-[#FCF9F4] p-10 md:p-14 rounded-[3.5rem] border-2 border-[#E8E2D9]">
                  <h3 className="text-4xl font-black text-[#1A2F2F] tracking-tighter italic">Your Proposal.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label className="block text-xs font-black text-[#1A2F2F] uppercase tracking-widest mb-4">Your Charge (₹)</label>
                      <input 
                        type="number" required placeholder="Enter amount"
                        className="w-full px-8 py-6 rounded-3xl border-2 border-[#E8E2D9] font-black text-2xl text-[#D46B4B] outline-none focus:border-[#D46B4B] transition-all"
                        value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-[#1A2F2F] uppercase tracking-widest mb-4">Why are you the best fit?</label>
                    <textarea 
                      required rows={5} placeholder="Talk about your experience or approach..."
                      className="w-full px-8 py-6 rounded-3xl border-2 border-[#E8E2D9] resize-none font-bold text-lg md:text-xl placeholder:italic outline-none focus:border-[#D46B4B] transition-all"
                      value={bidMessage} onChange={(e) => setBidMessage(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <button 
                      type="button" onClick={() => setShowBidForm(false)}
                      className="flex-1 px-8 py-6 rounded-3xl font-black text-[#A8A299] bg-white border border-[#E8E2D9] hover:text-[#1A2F2F] transition-all"
                    >
                      Wait, cancel
                    </button>
                    <button 
                      type="submit" disabled={isSubmitting}
                      className="flex-[2] bg-[#D46B4B] text-white px-12 py-6 rounded-3xl font-black text-xl md:text-2xl hover:bg-[#C05A3D] shadow-xl shadow-[#D46B4B]/20"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Proposal'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-12">
        <h2 className="text-4xl md:text-5xl font-black text-[#1A2F2F] tracking-tighter italic">Experts Interested ({bids.length})</h2>
        
        {bids.length === 0 ? (
          <div className="text-[#A8A299] bg-white p-20 md:p-32 rounded-[4rem] border-4 border-dotted border-[#E8E2D9] text-center font-black text-2xl">
            No offers yet. Be the first!
          </div>
        ) : (
          <div className="grid gap-10">
            {bids.map(bid => (
              <div key={bid.id} className={`bg-white rounded-[3rem] border p-10 md:p-14 shadow-lg transition-all relative group ${bid.status === 'HIRED' ? 'ring-4 ring-[#4F772D] bg-[#F0F7E6]/10' : 'border-[#E8E2D9]'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-10">
                  <div className="flex items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-[#1A2F2F] text-[#FCF9F4] flex items-center justify-center font-black text-xl md:text-2xl border-4 border-white shadow-xl">
                      {bid.freelancerName.charAt(0)}
                    </div>
                    <div className="ml-6">
                      <h4 className="font-black text-2xl md:text-3xl text-[#1A2F2F]">{bid.freelancerName}</h4>
                      <p className="text-[10px] md:text-[12px] font-black text-[#A8A299] uppercase tracking-[0.2em] mt-1">Proposal sent {new Date(bid.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right w-full sm:w-auto">
                    <span className="text-3xl md:text-4xl font-black text-[#D46B4B] block">₹{bid.amount.toLocaleString()}</span>
                    <span className={`inline-block px-5 py-2 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-4 ${
                      bid.status === 'HIRED' ? 'bg-[#F0F7E6] text-[#4F772D]' : 
                      bid.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' : 'bg-[#E8E2D9]/40 text-[#A8A299]'
                    }`}>
                      {bid.status === 'PENDING' ? 'Awaiting Review' : bid.status}
                    </span>
                  </div>
                </div>
                <div className="bg-[#FCF9F4] p-8 md:p-12 rounded-[2.5rem] border border-[#E8E2D9] relative overflow-hidden">
                  <svg className="absolute top-6 left-6 h-8 w-8 text-[#E8E2D9]/40" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8v8h6v8h-10v-16h4zm12 0v8h6v8h-10v-16h4z"/></svg>
                  <p className="text-[#6B705C] text-lg md:text-2xl italic leading-relaxed font-bold relative z-10 pl-4">
                    {bid.message}
                  </p>
                </div>
                
                {isOwner && gig.status === 'OPEN' && (
                  <button 
                    onClick={() => handleHire(bid.id)}
                    className="w-full bg-[#1A2F2F] text-[#FCF9F4] py-6 rounded-[2rem] font-black text-xl md:text-2xl mt-10 hover:bg-[#D46B4B] transition-all shadow-2xl active:scale-[0.98]"
                  >
                    Hire {bid.freelancerName.split(' ')[0]}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
