import { Camera, User, Mail, Phone, Calendar, ChevronDown, Edit2, CheckCircle2 } from 'lucide-react';

const Settings = () => {
  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto pb-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Account Information</h1>

      <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2ece6] p-8 md:p-12">
        
        {/* Profile Picture Section */}
        <div className="mb-10">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors shadow-sm border-2 border-white">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* First Name */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-500">First Name</label>
                <button type="button" className="text-sm font-medium text-slate-400 hover:text-slate-600 flex items-center space-x-1">
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="Jane"
                  className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-12"
                />
                <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-500">Last Name</label>
                <button type="button" className="text-sm font-medium text-slate-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-slate-400" />
                  <span>Save</span>
                </button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="Coop"
                  className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-12"
                />
                <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-500">Email</label>
                <div className="text-sm font-bold text-green-500 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 fill-green-500 text-white" />
                  <span>Verified</span>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="email" 
                  defaultValue="jane234@example.com"
                  className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-12"
                />
                <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-500">Phone Number</label>
                <div className="text-sm font-bold text-green-500 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 fill-green-500 text-white" />
                  <span>Verified</span>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="tel" 
                  defaultValue="(209) 555-0104"
                  className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-12"
                />
                <Phone className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-500">Date of Birth</label>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="17 nov, 1996"
                  className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-12"
                />
                <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-500">Country</label>
              </div>
              <div className="relative cursor-pointer">
                <select 
                  className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  defaultValue="Bangladesh"
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="India">India</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-500">Bio</label>
              <button type="button" className="text-sm font-medium text-slate-400 hover:text-slate-600 flex items-center space-x-1">
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>
            <textarea 
              rows="4"
              defaultValue="Passionate about connecting businesses with the goodness of nature! 🌱 I'm on a mission to make organic food, medicine, fruits, and FMCG products easily accessible to B2B partners. 🍏 Health and sustainability drive my business ethos. ✨ I love working closely with businesses that share our values. Let's grow together! 🌱"
              className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none leading-relaxed"
            ></textarea>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Settings;
