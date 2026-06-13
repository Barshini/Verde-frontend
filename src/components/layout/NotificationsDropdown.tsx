import React, { useState } from 'react';
import { Link } from 'wouter';
import { Bell } from 'lucide-react';
import { useGlobalState } from '@/context/GlobalStateContext';

export const NotificationsDropdown: React.FC = () => {
  const { notifications, markNotificationRead } = useGlobalState();
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative group" onMouseLeave={() => setIsOpen(false)}>
      <button 
        className="relative p-2 text-[#F5F0E8] hover:text-[#C9A84C] transition-colors"
        onMouseEnter={() => setIsOpen(true)}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C9A84C]"></span>
        )}
      </button>

      <div className={`absolute top-full right-0 w-80 bg-[#0F2318] border border-[rgba(201,168,76,0.2)] shadow-2xl transition-all duration-300 origin-top-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <div className="p-4 border-b border-[rgba(201,168,76,0.2)] flex justify-between items-center bg-[#1B3A2D]/50">
          <h4 className="font-serif text-[16px] text-[#C9A84C]">Notifications</h4>
          <span className="font-sans text-[10px] text-[rgba(245,240,232,0.6)] uppercase tracking-wider">{unreadCount} unread</span>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-6 text-center font-sans text-[12px] text-[rgba(245,240,232,0.5)]">No notifications</p>
          ) : (
            notifications.map(n => (
              <Link 
                key={n.id} 
                href={n.link}
                onClick={() => { markNotificationRead(n.id); setIsOpen(false); }}
                className={`block p-4 border-b border-[rgba(201,168,76,0.1)] hover:bg-[rgba(201,168,76,0.05)] transition-colors ${!n.read ? 'bg-[#1B3A2D]/30' : ''}`}
              >
                <div className="flex items-start gap-3">
                  {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 flex-shrink-0"></div>}
                  <p className={`font-sans text-[13px] leading-relaxed ${!n.read ? 'text-[#F5F0E8]' : 'text-[rgba(245,240,232,0.7)]'}`}>
                    {n.message}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
