import { Smartphone, Shield, Key, AlertTriangle } from 'lucide-react';

const Toggle = ({ label, description, defaultChecked }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="font-semibold text-slate-800">{label}</p>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
    </label>
  </div>
);

const SecurityPrivacy = () => {
  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto pb-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Security & Privacy</h1>

      <div className="space-y-6">
        
        {/* Authentication Section */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2ece6] p-8 md:p-10">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Authentication</h2>
          </div>
          
          <div className="space-y-6">
            <Toggle 
              label="Two-Factor Authentication (2FA)" 
              description="Add an extra layer of security to your account by requiring a verification code."
              defaultChecked={true}
            />
            <div className="w-full h-px bg-slate-100"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800">Hardware Security Keys</p>
                <p className="text-sm text-slate-500 mt-1">Use a physical security key (like YubiKey) to sign in.</p>
              </div>
              <button className="text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors">
                Setup Key
              </button>
            </div>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2ece6] p-8 md:p-10">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-2 bg-green-50 rounded-xl">
              <Smartphone className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Active Sessions</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-green-100 bg-green-50/50 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Smartphone className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">MacBook Pro (Chrome)</p>
                  <p className="text-xs text-slate-500 mt-0.5">San Francisco, CA • Active now</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">Current</span>
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Smartphone className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">iPhone 13 Pro (Safari)</p>
                  <p className="text-xs text-slate-500 mt-0.5">San Francisco, CA • Last active 2 hours ago</p>
                </div>
              </div>
              <button className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
                Revoke
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-red-100 p-8 md:p-10">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-red-50">
            <div className="p-2 bg-red-50 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">Delete Account</p>
              <p className="text-sm text-slate-500 mt-1">Permanently delete your account and all associated data. This action cannot be undone.</p>
            </div>
            <button className="text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition-colors shadow-sm shadow-red-600/20">
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SecurityPrivacy;
