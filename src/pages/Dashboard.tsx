import React from 'react';
import { Link, useLocation } from 'wouter';
import { LayoutGrid, Watch, Calendar, Heart, Settings, LogOut, ChevronRight, Package, Bell } from 'lucide-react';
import { useGlobalState } from '@/context/GlobalStateContext';
import { GoldButton } from '@/components/common/GoldButton';
import { GhostButton } from '@/components/common/GhostButton';
import { WatchCard } from '@/components/common/WatchCard';
import { WATCHES, formatPrice } from '@/services/data';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const [, navigate] = useLocation();
  const { user, cart, wishlist, notifications, currency, currencyRates, logout } = useGlobalState();

  if (!user.isLoggedIn) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success('You have been signed out.');
    navigate('/');
  };

  const recommended = WATCHES.filter(w => !cart.find(c => c.id === w.id)).slice(0, 3);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const sidebarItems = [
    { icon: <LayoutGrid size={16} />, label: 'Collections', href: '/collections' },
    { icon: <Watch size={16} />, label: 'Bespoke Tracker', href: '/bespoke' },
    { icon: <Calendar size={16} />, label: 'Private Invites', href: '/limited-editions' },
    { icon: <Heart size={16} />, label: 'Wishlist', href: '/wishlist' },
    { icon: <Settings size={16} />, label: 'Account Settings', action: () => toast.info('Account settings coming soon.') },
  ];

  return (
    <div className="min-h-screen flex bg-[#0F2318]">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-20 h-[calc(100vh-80px)] bg-[#0A1A10] border-r border-[rgba(201,168,76,0.15)] flex flex-col z-50">
        <div className="p-8 border-b border-[rgba(201,168,76,0.1)]">
          <div className="w-12 h-12 rounded-full bg-[#C9A84C] flex items-center justify-center mb-4">
            <span className="font-serif text-[20px] text-[#0F2318] font-bold">
              {user.name ? user.name[0].toUpperCase() : 'M'}
            </span>
          </div>
          <p className="font-serif text-[16px] text-[#F5F0E8] mb-1">{user.name || 'Circle Member'}</p>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">Vanguard Member</p>
        </div>

        <nav className="flex-1 p-6 space-y-1">
          {sidebarItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 font-sans text-[12px] tracking-[0.1em] uppercase text-[rgba(245,240,232,0.7)] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.05)] transition-all rounded-sm"
                data-testid={`dashboard-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-4 py-3 font-sans text-[12px] tracking-[0.1em] uppercase text-[rgba(245,240,232,0.7)] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.05)] transition-all rounded-sm"
                data-testid={`dashboard-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.icon}
                {item.label}
              </button>
            )
          )}
        </nav>

        <div className="p-6 border-t border-[rgba(201,168,76,0.1)]">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.2)] flex items-center justify-center">
              <span className="font-serif text-[12px] text-[#C9A84C]">M</span>
            </div>
            <div>
              <p className="font-sans text-[11px] text-[#F5F0E8]">Marie Rousseau</p>
              <p className="font-sans text-[10px] text-[rgba(245,240,232,0.5)]">Personal Director</p>
            </div>
          </div>
          <button
            onClick={() => toast.info('Legacy Registry coming soon.')}
            className="w-full text-left font-sans text-[11px] tracking-[0.1em] uppercase text-[rgba(245,240,232,0.5)] hover:text-[#C9A84C] transition-colors mb-4"
            data-testid="dashboard-legacy-registry"
          >
            Legacy Registry
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-sans text-[11px] tracking-[0.1em] uppercase text-[rgba(245,240,232,0.5)] hover:text-red-400 transition-colors"
            data-testid="dashboard-logout"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-12">
        {/* Header */}
        <div className="mb-12">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">{greeting}</p>
          <h1 className="font-serif text-[52px] font-light text-[#F5F0E8] mb-6">
            Welcome back, {user.name || 'Member'}.
          </h1>
          <div className="flex gap-8">
            {[
              { label: 'Timepieces Owned', value: cart.length, link: '/wishlist' },
              { label: 'Active Commission', value: 1 },
              { label: 'Wishlist Items', value: wishlist.length, link: '/wishlist' },
            ].map((stat) => (
              <div key={stat.label} className="border border-[rgba(201,168,76,0.2)] px-6 py-4">
                {stat.link ? (
                  <Link href={stat.link}>
                    <p className="font-serif text-[36px] text-[#C9A84C]">{stat.value}</p>
                    <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.5)]">{stat.label}</p>
                  </Link>
                ) : (
                  <>
                    <p className="font-serif text-[36px] text-[#C9A84C]">{stat.value}</p>
                    <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.5)]">{stat.label}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Your Timepieces */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-[32px] font-light">Your Timepieces</h2>
            <Link href="/wishlist" className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] hover:opacity-70 transition-opacity flex items-center gap-2">
              View Full Vault <ChevronRight size={14} />
            </Link>
          </div>
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.strap}-${item.size}`} className="flex items-center gap-6 border border-[rgba(201,168,76,0.15)] p-6 bg-[rgba(201,168,76,0.02)]">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover grayscale" />
                  <div className="flex-1">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-1">Acquired</p>
                    <p className="font-serif text-[22px] text-[#F5F0E8]">{item.name}</p>
                    <p className="font-sans text-[12px] text-[rgba(245,240,232,0.5)]">{item.strap} • {item.size}</p>
                  </div>
                  <div className="flex gap-4">
                    <GhostButton href={`/product/${item.id}`}>Details</GhostButton>
                    <GhostButton href="/contact">Service</GhostButton>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-[rgba(201,168,76,0.15)] p-12 text-center">
              <p className="font-serif text-[24px] text-[rgba(245,240,232,0.4)] mb-6">Your collection vault awaits.</p>
              <GoldButton href="/collections">Explore Our Timepieces</GoldButton>
            </div>
          )}
        </section>

        {/* Active Commission */}
        <section className="mb-16">
          <h2 className="font-serif text-[32px] font-light mb-8">Active Commission</h2>
          <div className="border border-[rgba(201,168,76,0.2)] p-8 bg-[rgba(201,168,76,0.02)]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Commission Ref: VH-B-2025-001</p>
                <h3 className="font-serif text-[28px] text-[#F5F0E8]">Forêt Noir Bespoke</h3>
                <p className="font-sans text-[13px] text-[rgba(245,240,232,0.5)]">Calibre 1892 — Custom Hand-Engraving</p>
              </div>
              <GhostButton href="/product/foret-perpetuelle">See Reference</GhostButton>
            </div>
            <div className="flex items-center gap-0">
              {[
                { label: 'Design', done: true },
                { label: 'Case Forge', done: true },
                { label: 'Movement', active: true },
                { label: 'Assembly', done: false },
                { label: 'Ready', done: false },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] ${step.done ? 'bg-[#C9A84C] text-[#0F2318]' : step.active ? 'border-2 border-[#C9A84C] text-[#C9A84C]' : 'border border-[rgba(245,240,232,0.2)] text-[rgba(245,240,232,0.3)]'}`}>
                      {step.done ? '✓' : i + 1}
                    </div>
                    <p className={`font-sans text-[10px] tracking-[0.1em] uppercase mt-2 ${step.done || step.active ? 'text-[#C9A84C]' : 'text-[rgba(245,240,232,0.3)]'}`}>{step.label}</p>
                  </div>
                  {i < 4 && <div className={`flex-1 h-[1px] mx-2 ${step.done ? 'bg-[#C9A84C]' : 'bg-[rgba(245,240,232,0.1)]'}`} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notifications */}
        {notifications.filter(n => !n.read).length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-[32px] font-light mb-8">Attention Required</h2>
            <div className="space-y-4">
              {notifications.filter(n => !n.read).map(n => (
                <Link key={n.id} href={n.link} className="block border-l-2 border-[#C9A84C] pl-6 py-4 bg-[rgba(201,168,76,0.03)] hover:bg-[rgba(201,168,76,0.06)] transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Bell size={12} className="text-[#C9A84C]" />
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]">New</span>
                  </div>
                  <p className="font-sans text-[13px] text-[#F5F0E8]">{n.message}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recommended */}
        <section>
          <h2 className="font-serif text-[32px] font-light mb-8">Selected For You</h2>
          <div className="grid grid-cols-3 gap-6">
            {recommended.map(w => (
              <WatchCard key={w.id} watch={w} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
