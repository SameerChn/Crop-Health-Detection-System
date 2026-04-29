import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, History, HelpCircle, Plus, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/', icon: Home },
    { name: 'ANALYZE', path: '/upload', icon: Activity },
    { name: 'HISTORY', path: '/history', icon: History },
    { name: 'HELP', path: '/help', icon: HelpCircle },
  ];

  return (
    <aside className={clsx(
      'bg-[#f4f9f6] border-r border-[#e2ece6] flex flex-col h-screen sticky top-0 overflow-y-auto transition-all duration-300',
      collapsed ? 'w-[72px]' : 'w-64'
    )}>
      {/* Logo + Toggle */}
      <div className="p-4 flex items-center justify-between border-b border-[#e2ece6] min-h-[64px]">
        {!collapsed && (
          <div>
            <h2 className="text-[#0e4e37] font-bold text-xl leading-tight">AGROLENS</h2>
            <p className="text-[#4b8a6e] text-xs font-semibold tracking-wider mt-0.5">AGRONOMY PRO</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-xl text-[#5a8a72] hover:bg-[#e4f0e9] hover:text-[#0e4e37] transition-colors ml-auto"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-grow px-2 mt-3 space-y-1">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              to={link.path}
              title={collapsed ? link.name : undefined}
              className={clsx(
                'flex items-center px-3 py-3 rounded-full text-sm font-bold transition-all',
                collapsed ? 'justify-center' : 'space-x-4',
                isActive
                  ? 'bg-[#008f5d] text-white shadow-md shadow-[#008f5d]/30'
                  : 'text-[#5a8a72] hover:bg-[#e4f0e9] hover:text-[#0e4e37]'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{link.name}</span>}
            </Link>
          );
        })}

        {/* New Analysis CTA */}
        <div className={clsx('pt-6 pb-4', !collapsed && 'px-2')}>
          {collapsed ? (
            <Link
              to="/upload"
              title="New Analysis"
              className="flex items-center justify-center bg-[#008f5d] text-white w-full p-3 rounded-full shadow-md shadow-[#008f5d]/30 hover:bg-[#007a4f] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              to="/upload"
              className="flex items-center justify-center space-x-2 bg-[#008f5d] text-white w-full py-3 rounded-full font-bold shadow-md shadow-[#008f5d]/30 hover:bg-[#007a4f] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Analysis</span>
            </Link>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
