import { ShieldAlert, CheckCircle, Activity, Download, Droplets, Sun, Wind, Beaker } from 'lucide-react';
import clsx from 'clsx';

const ReportMetric = ({ icon: Icon, label, value, status }) => (
  <div className="flex items-center justify-between p-4 bg-[#f4f9f6] rounded-2xl border border-[#e2ece6]">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Icon className="w-4 h-4 text-[#008f5d]" />
      </div>
      <span className="text-sm font-bold text-[#5a8a72]">{label}</span>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-[#0e4e37]">{value}</p>
      <p className={clsx(
        "text-[10px] font-bold uppercase tracking-wider",
        status === 'Optimal' ? "text-[#008f5d]" : "text-amber-600"
      )}>{status}</p>
    </div>
  </div>
);

const ResultCard = ({ result }) => {
  const isHealthy = result.status.toUpperCase() === 'HEALTHY';

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2ece6] overflow-hidden flex flex-col lg:flex-row h-full">
      {/* Image Section */}
      <div className="lg:w-1/3 bg-[#0e4e37] relative min-h-[300px]">
        <img 
          src={result.imageUrl} 
          alt="Analysis target" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e4e37]/80 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center justify-between mb-3">
             <span className={clsx(
                "px-4 py-1.5 rounded-full text-xs font-bold flex items-center space-x-2 shadow-lg",
                isHealthy ? "bg-[#cff3e0] text-[#008f5d]" : "bg-[#fde8e8] text-[#c81e1e]"
             )}>
                <span className={clsx(
                   "w-2 h-2 rounded-full animate-pulse",
                   isHealthy ? "bg-[#008f5d]" : "bg-[#c81e1e]"
                )}></span>
                <span>{result.status}</span>
             </span>
          </div>
          <h2 className="text-white text-3xl font-bold leading-tight drop-shadow-md">{result.diseaseName}</h2>
        </div>
      </div>

      {/* Details Section */}
      <div className="lg:w-2/3 p-8 lg:p-12 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#e2ece6]">
           <div>
              <p className="text-[#5a8a72] text-[10px] font-bold tracking-widest uppercase mb-1">Generated Report ID: #{result.id.slice(-6)}</p>
              <p className="text-[#0e4e37] font-extrabold text-lg">{new Date(result.date).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
           </div>
           <button className="flex items-center space-x-2 text-[#008f5d] bg-[#e4f0e9] hover:bg-[#cff3e0] px-6 py-3 rounded-2xl transition-all font-bold shadow-sm active:scale-95">
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
           </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Column: Health Metrics */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5 text-[#008f5d]" />
                <h3 className="text-lg font-bold text-[#0e4e37]">Health Indicators</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <ReportMetric icon={Droplets} label="Leaf Moisture" value={result.metrics?.moisture || "78%"} status="Optimal" />
                <ReportMetric icon={Beaker} label="Chlorophyll Index" value={result.metrics?.chlorophyll || "0.84"} status="Optimal" />
                <ReportMetric icon={Sun} label="Solar Absorption" value={result.metrics?.solar || "92%"} status="Optimal" />
                <ReportMetric icon={Wind} label="Surface Transpiration" value={result.metrics?.transpiration || "Normal"} status="Optimal" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-[#008f5d]" />
                <h3 className="text-lg font-bold text-[#0e4e37]">Health Report Summary</h3>
              </div>
              <div className="p-6 bg-[#f4f9f6] border border-[#e2ece6] rounded-[2rem] text-sm text-[#5a8a72] leading-relaxed italic">
                "{result.details || "The AI model has processed the multispectral imagery and found no significant deviations from baseline healthy crop profiles."}"
              </div>
            </div>
          </div>

          {/* Right Column: Confidence & Advice */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-[#0e4e37] mb-4">Detection Confidence</h3>
              <div className="bg-white rounded-[2rem] p-8 border border-[#e2ece6] shadow-inner">
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[#e4f0e9]" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * result.confidence) / 100} className={clsx("transition-all duration-1000", isHealthy ? "text-[#008f5d]" : "text-[#c81e1e]")} strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-2xl font-black text-[#0e4e37]">{result.confidence}%</span>
                  </div>
                </div>
                <p className="text-center text-xs font-bold text-[#5a8a72] uppercase tracking-widest">Neural Precision Score</p>
              </div>
            </div>

            <div className="flex-1">
               <div className="flex items-center space-x-2 mb-4">
                  <ShieldAlert className={clsx("w-5 h-5", isHealthy ? "text-[#008f5d]" : "text-[#c81e1e]")} />
                  <h3 className="text-lg font-bold text-[#0e4e37]">Agronomist Advice</h3>
               </div>
               <div className={clsx(
                 "p-8 rounded-[2rem] border transition-colors h-full",
                 isHealthy ? "bg-white border-[#e2ece6]" : "bg-[#fde8e8] border-[#fbd5d5]"
               )}>
                  <p className={clsx(
                    "text-sm leading-relaxed font-medium",
                    isHealthy ? "text-[#5a8a72]" : "text-[#9b1c1c]"
                  )}>
                    {isHealthy 
                      ? (result.advice || "Your crops are in excellent condition. Maintain current irrigation and nutrient cycles. No immediate intervention required.")
                      : (result.recommendation || result.advice || "Immediate intervention recommended. Apply targeted fungicides and reduce ambient humidity to prevent spread.")
                    }
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
