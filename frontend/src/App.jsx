import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import History from './pages/History';
import Settings from './pages/Settings';
import ChangePassword from './pages/ChangePassword';
import SecurityPrivacy from './pages/SecurityPrivacy';
import Profile from './pages/Profile';
import Result from './pages/Result';
import Help from './pages/Help';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-[#f3f6f4] font-sans overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(v => !v)} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/result" element={<Result />} />
              <Route path="/history" element={<History />} />
              <Route path="/help" element={<Help />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/password" element={<ChangePassword />} />
              <Route path="/settings/personalization" element={<Settings />} />
              <Route path="/settings/security" element={<SecurityPrivacy />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="border-t border-[#e2ece6] bg-[#f4f9f6] px-8 py-3 flex justify-between items-center text-xs text-[#5a8a72]">
            <span className="font-semibold">&copy; {new Date().getFullYear()} <span className="text-[#0e4e37] font-bold">AgroLens</span> — Crop Health Detection System</span>
            <div className="flex items-center gap-5">
              <a href="/help" className="hover:text-[#0e4e37] transition-colors font-semibold">Help</a>
              <a href="https://github.com/SameerChn/Crop-Health-Detection-System" target="_blank" rel="noopener noreferrer" className="hover:text-[#0e4e37] transition-colors font-semibold">GitHub</a>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
