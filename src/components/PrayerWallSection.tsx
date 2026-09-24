import React, { useState } from 'react';
import { 
  Heart, 
  Send, 
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { PrayerBlessing } from '../types';

interface PrayerWallSectionProps {
  initialBlessings: PrayerBlessing[];
}

export const PrayerWallSection: React.FC<PrayerWallSectionProps> = ({
  initialBlessings,
}) => {
  const [blessings, setBlessings] = useState<PrayerBlessing[]>(initialBlessings);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [forWhom, setForWhom] = useState('All Struggling Pastors & Widows');
  const [message, setMessage] = useState('');
  const [scriptureRef, setScriptureRef] = useState('');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [justPosted, setJustPosted] = useState(false);

  const handlePostPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !name) {
      alert('Please provide your name and a prayer message.');
      return;
    }

    const newBlessing: PrayerBlessing = {
      id: 'pb-' + Date.now(),
      donorName: name,
      location: location || 'Friend in Christ',
      forWhom: forWhom,
      message: message,
      scriptureRef: scriptureRef || undefined,
      heartsCount: 1,
      createdAt: 'Just now'
    };

    setBlessings([newBlessing, ...blessings]);
    setName('');
    setLocation('');
    setMessage('');
    setScriptureRef('');
    setJustPosted(true);
    setTimeout(() => setJustPosted(false), 3000);
  };

  const toggleHeart = (id: string) => {
    const isLiked = likedIds.has(id);
    const newLiked = new Set(likedIds);
    if (isLiked) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedIds(newLiked);

    setBlessings(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, heartsCount: isLiked ? b.heartsCount - 1 : b.heartsCount + 1 };
      }
      return b;
    }));
  };

  return (
    <section id="prayer-wall" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 block">
            Fellowship & Prayer
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1E37] tracking-tight">
            The Pastoral Prayer Wall
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Financial aid addresses the physical emergency; heartfelt prayer strengthens their spirits. Leave a word of encouragement or scripture for our pastors and widows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Post a Prayer Form */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 space-y-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0B1E37]">
                Leave a Word of Blessing
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Your message is shared with our field coordinators and ministers.
              </p>
            </div>

            {justPosted && (
              <div className="p-3 bg-white border border-[#F6864C] rounded-xl text-xs text-[#0B1E37] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0" />
                <span>Your blessing has been posted on the wall.</span>
              </div>
            )}

            <form onSubmit={handlePostPrayer} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-[#0B1E37] mb-1">
                    Your Name / Family
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. David & Mary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-[#0B1E37] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F6864C]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#0B1E37] mb-1">
                    City / Country
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lagos, Nigeria"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-[#0B1E37] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F6864C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#0B1E37] mb-1">
                  Dedicated To
                </label>
                <select
                  value={forWhom}
                  onChange={(e) => setForWhom(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-[#0B1E37] focus:outline-none focus:ring-1 focus:ring-[#F6864C]"
                >
                  <option value="All Struggling Pastors & Widows">All Struggling Pastors & Widows</option>
                  <option value="Pastor Emmanuel Adebayo (Medical Recovery)">Pastor Emmanuel Adebayo (Medical)</option>
                  <option value="Sister Grace Mthembu (Widow Care)">Sister Grace Mthembu (Widow Care)</option>
                  <option value="Children of Pastor David Okafor (Orphan Tuition)">Children of Pastor David Okafor (Orphans)</option>
                  <option value="Frontier & Rural Evangelists">Frontier & Rural Evangelists</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#0B1E37] mb-1">
                  Prayer or Encouragement
                </label>
                <textarea
                  rows={3}
                  placeholder="Write a message of hope, faith, and unity..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-white border border-slate-200 text-[#0B1E37] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F6864C]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#0B1E37] mb-1">
                  Scripture Reference (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Isaiah 41:10 or Psalm 121:1-2"
                  value={scriptureRef}
                  onChange={(e) => setScriptureRef(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-[#0B1E37] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F6864C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#F6864C] hover:bg-[#0B1E37] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Encouragement</span>
              </button>
            </form>
          </div>

          {/* Right Column: Feed of Prayers */}
          <div className="lg:col-span-7 space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {blessings.map((b) => {
              const isLiked = likedIds.has(b.id);
              return (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#F6864C] transition-colors space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#0B1E37]">
                          {b.donorName}
                        </span>
                        <span className="text-[11px] text-slate-600">
                          &bull; {b.location}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-600 font-mono block mt-0.5">
                        For: {b.forWhom}
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-600/70 font-mono">
                      {b.createdAt}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#0B1E37] leading-relaxed font-light">
                    “{b.message}”
                  </p>

                  {b.scriptureRef && (
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#0B1E37] font-serif italic flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#F6864C] shrink-0" />
                      <span>{b.scriptureRef}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                    <button
                      onClick={() => toggleHeart(b.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                        isLiked
                          ? 'bg-slate-50 text-slate-600 font-bold border border-slate-200'
                          : 'text-slate-600 hover:text-[#0B1E37] hover:bg-slate-50'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#F6864C] text-slate-600' : ''}`} />
                      <span>{b.heartsCount} {b.heartsCount === 1 ? 'Amen' : 'Amens'}</span>
                    </button>

                    <span className="text-[10px] text-slate-600">
                      In Christian Fellowship
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
