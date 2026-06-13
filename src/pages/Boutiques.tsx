import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { BOUTIQUES } from '../services/data';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { Link } from 'wouter';
import { SEOHead } from '../components/common/SEOHead';

const Boutiques: React.FC = () => {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [activeBoutique, setActiveBoutique] = useState<string | null>(null);

  const filteredBoutiques = BOUTIQUES.filter(b => {
    const matchesSearch = b.city.toLowerCase().includes(search.toLowerCase()) ||
                          b.country.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = regionFilter === 'All' || b.region === regionFilter.toLowerCase().replace(' ', '-');
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="w-full flex flex-col bg-[#0F2318]">
      <SEOHead
        title="Our Boutiques | VÉRDE Horology"
        description="Eight boutiques across four continents — Geneva, Paris, London, Milan, New York, Dubai, Tokyo, Singapore. Private viewings by appointment."
        url="/boutiques"
      />

      {/* Main Split Layout */}
      <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row">
        {/* Left List */}
        <div className="w-full md:w-[45%] h-full flex flex-col border-r border-[rgba(201,168,76,0.2)]">
          <div className="p-8 pb-4">
            <h1 className="font-serif text-[36px] text-[#C9A84C] mb-6">Find Us Where Excellence Lives</h1>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(245,240,232,0.4)]" size={18} />
              <input
                type="text"
                placeholder="Search city or country..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#1B3A2D] border border-[rgba(201,168,76,0.3)] pl-12 pr-4 py-3 text-[13px] font-sans text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {['All', 'Europe', 'Americas', 'Asia', 'Middle East'].map(region => (
                <button
                  key={region}
                  onClick={() => setRegionFilter(region)}
                  className={`font-sans text-[9px] tracking-widest uppercase px-4 py-2 border transition-colors ${
                    regionFilter === region ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0F2318]' : 'border-[rgba(201,168,76,0.3)] text-[rgba(245,240,232,0.6)] hover:border-[#C9A84C]'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar p-8 pt-0 space-y-6">
            {filteredBoutiques.map(b => (
              <div
                key={b.id}
                id={`boutique-${b.id}`}
                onClick={() => setActiveBoutique(b.id)}
                className={`p-6 border transition-all cursor-pointer ${
                  activeBoutique === b.id ? 'border-[#C9A84C] bg-[rgba(201,168,76,0.05)]' : 'border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.3)] bg-[#1B3A2D]/30'
                }`}
              >
                <h3 className="font-serif text-[24px] text-[#F5F0E8] mb-1">{b.city}</h3>
                <p className="font-sans text-[11px] tracking-widest uppercase text-[#C9A84C] mb-4">{b.country}</p>

                <div className="space-y-2 font-sans text-[13px] text-[rgba(245,240,232,0.7)] mb-6">
                  <p>{b.address}</p>
                  <p>{b.phone}</p>
                  <p>{b.hours}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <Link href="/contact" className="inline-flex items-center justify-center font-sans text-[11px] font-medium tracking-[0.3em] uppercase text-[#0F2318] bg-[#C9A84C] px-6 py-3 hover:opacity-90 transition-opacity">
                    Book Appointment
                  </Link>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`} target="_blank" rel="noreferrer"
                     className="font-sans text-[11px] tracking-[0.1em] text-[#C9A84C] underline decoration-[rgba(201,168,76,0.3)] underline-offset-4 text-center">
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Map */}
        <div className="hidden md:flex w-[55%] h-full relative items-center justify-center bg-[#1B3A2D] overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-[120%] h-auto opacity-10 absolute pointer-events-none fill-current text-[#C9A84C]">
            <path d="M 20 20 Q 25 10 30 25 T 40 15 T 45 35 T 35 45 Z" />
            <path d="M 50 30 Q 55 20 60 30 T 70 20 T 75 40 T 60 50 Z" />
            <path d="M 25 45 Q 35 40 40 55 T 30 75 T 20 60 Z" />
            <path d="M 65 50 Q 75 45 80 60 T 70 80 T 60 65 Z" />
          </svg>

          <div className="absolute inset-0 w-full h-full p-20">
            <div className="relative w-full h-full">
              {BOUTIQUES.map(b => (
                <div
                  key={b.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${b.mapPin.x}%`, top: `${b.mapPin.y}%` }}
                  onClick={() => {
                    setActiveBoutique(b.id);
                    document.getElementById(`boutique-${b.id}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className={`w-3 h-3 rounded-full transition-all ${activeBoutique === b.id ? 'bg-[#C9A84C] scale-150' : 'bg-[#F5F0E8] group-hover:bg-[#C9A84C]'}`}></div>
                  {activeBoutique === b.id && (
                    <div className="absolute inset-0 w-full h-full border border-[#C9A84C] rounded-full animate-ping opacity-75"></div>
                  )}
                  <div className={`absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap bg-[#0F2318] border border-[rgba(201,168,76,0.3)] px-3 py-1 font-sans text-[10px] tracking-widest text-[#C9A84C] uppercase transition-opacity ${activeBoutique === b.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {b.city}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-12 right-12 flex flex-col gap-4">
            <GoldButton href="/contact">Book a Geneva Experience</GoldButton>
            <GhostButton href="/private-viewing">Schedule Virtual Appointment</GhostButton>
          </div>
        </div>
      </div>

      {/* Directors Section */}
      <section className="bg-[#0F2318] border-t border-[rgba(201,168,76,0.15)] py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] block mb-4">Our People</span>
            <h2 className="font-serif text-[48px] font-light text-[#F5F0E8]">The Faces Behind Each Door</h2>
            <p className="font-sans text-[14px] text-[rgba(245,240,232,0.5)] mt-4 max-w-xl mx-auto">
              Every boutique is led by a director whose sole purpose is to make your experience unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {BOUTIQUES.map(b => (
              <div key={b.id} className="group text-center">
                {/* Portrait with b&w → colour hover — same mechanic as WatchCard */}
                <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-[#1B3A2D]">
                  <img
                    src={b.directorImage}
                    alt={b.director}
                    className="w-full h-full object-cover object-top transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/boutique-interior.png'; }}
                  />
                  {/* Hover label overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2318]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                    <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">{b.city}</span>
                  </div>
                </div>
                <p className="font-serif text-[20px] text-[#F5F0E8] mb-1 group-hover:text-[#C9A84C] transition-colors duration-300">{b.director}</p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1">{b.directorTitle}</p>
                <p className="font-sans text-[12px] text-[rgba(245,240,232,0.4)]">{b.city}, {b.country}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <GhostButton href="/contact">Write to a Director</GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Boutiques;
