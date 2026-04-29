import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, History, Settings, HelpCircle, LogOut, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const isSettingsActive = location.pathname.startsWith('/settings');
  const [settingsOpen, setSettingsOpen] = useState(isSettingsActive);

  useEffect(() => {
    if (isSettingsActive) {
      setSettingsOpen(true);
    }
  }, [isSettingsActive]);

  const navLinks = [
    { name: 'HOME', path: '/', icon: Home },
    { name: 'ANALYZE', path: '/upload', icon: Activity },
    { name: 'HISTORY', path: '/history', icon: History },
  ];

  const settingLinks = [
    { name: 'Account Information', path: '/settings' },
    { name: 'Change Password', path: '/settings/password' },
    { name: 'Security & Privacy', path: '/settings/security' },
  ];

  return (
    <aside className="w-64 bg-[#f4f9f6] border-r border-[#e2ece6] flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-8 pb-4">
        <h2 className="text-[#0e4e37] font-bold text-xl leading-tight">AGROLENS</h2>
        <p className="text-[#4b8a6e] text-xs font-semibold tracking-wider mt-1">AGRONOMY PRO</p>
      </div>

      <nav className="flex-grow px-4 mt-2 space-y-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={clsx(
                'flex items-center space-x-4 px-4 py-3 rounded-full text-sm font-bold transition-all',
                isActive
                  ? 'bg-[#008f5d] text-white shadow-md shadow-[#008f5d]/30'
                  : 'text-[#5a8a72] hover:bg-[#e4f0e9] hover:text-[#0e4e37]'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}

        {/* Settings Accordion */}
        <div className="pt-2">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={clsx(
              'flex items-center justify-between w-full px-4 py-3 rounded-full text-sm font-bold transition-all',
              (isSettingsActive && !settingsOpen) 
                ? 'bg-[#008f5d] text-white shadow-md shadow-[#008f5d]/30' 
                : 'text-[#5a8a72] hover:bg-[#e4f0e9] hover:text-[#0e4e37]'
            )}
          >
            <div className="flex items-center space-x-4">
              <Settings className="w-5 h-5" />
              <span>SETTINGS</span>
            </div>
            {settingsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {settingsOpen && (
            <div className="flex flex-col space-y-1 mt-2 pl-12 pr-4 relative">
               {/* Vertical line connecting sub items */}
               <div className="absolute left-6 top-0 bottom-4 w-px bg-[#e2ece6]"></div>
               
              {settingLinks.map((sublink) => {
                const isSubActive = location.pathname === sublink.path;
                return (
                  <Link
                    key={sublink.name}
                    to={sublink.path}
                    className={clsx(
                      'text-sm font-semibold py-2 px-4 rounded-xl transition-all relative',
                      isSubActive
                        ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/20'
                        : 'text-[#5a8a72] hover:text-[#0e4e37] hover:bg-white'
                    )}
                  >
                    {sublink.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="pt-8 pb-4">
          <Link
            to="/upload"
            className="flex items-center justify-center space-x-2 bg-[#008f5d] text-white w-full py-3 rounded-full font-bold shadow-md shadow-[#008f5d]/30 hover:bg-[#007a4f] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Analysis</span>
          </Link>
        </div>
      </nav>

      <div className="p-6 space-y-2">
        <button className="flex items-center space-x-4 px-4 py-2 text-[#5a8a72] hover:text-[#0e4e37] text-sm font-bold w-full transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span>HELP</span>
        </button>
        <button className="flex items-center space-x-4 px-4 py-2 text-[#5a8a72] hover:text-[#0e4e37] text-sm font-bold w-full transition-colors">
          <LogOut className="w-5 h-5" />
          <span>SIGN OUT</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
