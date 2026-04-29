import { User, Mail, MapPin, Building, Edit3 } from 'lucide-react';

const Profile = () => {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#0e4e37] mb-2">User Profile</h1>
        <p className="text-[#5a8a72] text-lg">Manage your personal information and agronomy credentials.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2ece6] p-8 flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="w-full h-full rounded-full bg-[#1b3b2b] flex items-center justify-center overflow-hidden border-4 border-[#e4f0e9]">
                <User className="w-16 h-16 text-[#3fe29f]" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-[#008f5d] rounded-full text-white hover:bg-[#007a4f] transition-colors border-2 border-white shadow-sm">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-[#0e4e37] mb-1">Alex Mercer</h2>
            <p className="text-[#008f5d] font-bold text-sm tracking-wider uppercase mb-4">Chief Agronomist</p>
            
            <div className="w-full h-px bg-[#e2ece6] mb-4"></div>
            
            <div className="w-full space-y-3">
              <div className="flex items-center space-x-3 text-[#5a8a72] text-sm">
                <Mail className="w-4 h-4" />
                <span>alex.mercer@agrolens.io</span>
              </div>
              <div className="flex items-center space-x-3 text-[#5a8a72] text-sm">
                <Building className="w-4 h-4" />
                <span>Digital Greenhouse, Inc.</span>
              </div>
              <div className="flex items-center space-x-3 text-[#5a8a72] text-sm">
                <MapPin className="w-4 h-4" />
                <span>Sector 4, West Valley</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2ece6] p-8">
            <h3 className="text-xl font-bold text-[#0e4e37] mb-6 pb-4 border-b border-[#e2ece6]">Personal Information</h3>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0e4e37] uppercase tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Alex"
                    className="w-full bg-[#f4f9f6] border border-[#e2ece6] rounded-xl px-4 py-3 text-[#0e4e37] font-medium focus:outline-none focus:ring-2 focus:ring-[#008f5d]/50 focus:border-[#008f5d] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0e4e37] uppercase tracking-wider">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Mercer"
                    className="w-full bg-[#f4f9f6] border border-[#e2ece6] rounded-xl px-4 py-3 text-[#0e4e37] font-medium focus:outline-none focus:ring-2 focus:ring-[#008f5d]/50 focus:border-[#008f5d] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0e4e37] uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="alex.mercer@agrolens.io"
                  className="w-full bg-[#f4f9f6] border border-[#e2ece6] rounded-xl px-4 py-3 text-[#0e4e37] font-medium focus:outline-none focus:ring-2 focus:ring-[#008f5d]/50 focus:border-[#008f5d] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0e4e37] uppercase tracking-wider">Bio / Expertise</label>
                <textarea 
                  rows="4"
                  defaultValue="Senior agronomist specializing in multispectral imaging and early-stage pathogen detection in commercial greenhouses."
                  className="w-full bg-[#f4f9f6] border border-[#e2ece6] rounded-xl px-4 py-3 text-[#0e4e37] font-medium focus:outline-none focus:ring-2 focus:ring-[#008f5d]/50 focus:border-[#008f5d] transition-all resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end pt-4">
                <button type="button" className="bg-[#008f5d] text-white px-8 py-3 rounded-full font-bold shadow-md shadow-[#008f5d]/30 hover:bg-[#007a4f] transition-colors">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
