import { Link, useLocation } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import clsx from 'clsx';

const Topbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analyze', path: '/upload' },
    { name: 'History', path: '/history' },
  ];

  return (
    <header className="bg-[#486b58] text-white py-3 px-8 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center space-x-12">
        <Link to="/" className="text-xl font-bold tracking-tight">
          AgroLens
        </Link>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'text-sm font-semibold pb-1 border-b-2 transition-colors',
                  isActive ? 'border-[#3fe29f] text-[#3fe29f]' : 'border-transparent text-gray-300 hover:text-white'
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-300 hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 rounded-full bg-[#1b3b2b] flex items-center justify-center overflow-hidden border border-[#3fe29f]/50">
          <User className="w-5 h-5 text-[#3fe29f]" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
