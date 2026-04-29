import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#f3f6f4] font-sans overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/result" element={<Result />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/password" element={<ChangePassword />} />
              <Route path="/settings/personalization" element={<Settings />} />
              <Route path="/settings/security" element={<SecurityPrivacy />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          <footer className="bg-[#0b3c2a] text-[#8cae9e] text-xs py-4 px-8 flex justify-between items-center mt-auto">
            <div>
              <p className="font-bold text-white text-sm mb-1">AgroLens</p>
              <p>&copy; 2024 DIGITAL GREENHOUSE. NATURE-INSPIRED PRECISION.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors uppercase">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors uppercase">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors uppercase">Contact Support</a>
              <a href="#" className="hover:text-white transition-colors uppercase">API Documentation</a>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
