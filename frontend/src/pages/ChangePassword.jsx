import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto pb-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Change Password</h1>

      <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2ece6] p-8 md:p-12">
        <div className="flex items-center space-x-4 mb-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <div className="p-3 bg-blue-100 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Secure Your Account</h3>
            <p className="text-sm text-slate-600 mt-1">Make sure your new password is at least 8 characters long and includes a mix of letters, numbers, and symbols.</p>
          </div>
        </div>

        <form className="space-y-6 max-w-2xl">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500">Current Password</label>
            <div className="relative">
              <input 
                type={showCurrent ? "text" : "password"} 
                placeholder="Enter current password"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 pl-12 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <button 
                type="button" 
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500">New Password</label>
            <div className="relative">
              <input 
                type={showNew ? "text" : "password"} 
                placeholder="Enter new password"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 pl-12 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <button 
                type="button" 
                onClick={() => setShowNew(!showNew)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500">Confirm New Password</label>
            <div className="relative">
              <input 
                type={showConfirm ? "text" : "password"} 
                placeholder="Confirm new password"
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 pl-12 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-6">
            <button type="button" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-md shadow-blue-600/30 hover:bg-blue-700 transition-colors w-full md:w-auto">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
