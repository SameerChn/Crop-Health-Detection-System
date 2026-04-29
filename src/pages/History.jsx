import { useAppContext } from '../context/AppContext';
import { Eye, Download } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/images/photo-1592841200221-a6898f307baa.avif';
import img2 from '../assets/images/cucumber-hanging-vine-lo.webp';
import img3 from '../assets/images/photo-1563514227147-6d2ff665a6a0.avif';

const History = () => {
  const { history, setCurrentResult } = useAppContext();
  const navigate = useNavigate();

  // Mock initial history if empty to match screenshot
  const displayHistory = history.length > 0 ? history : [
    {
      id: '1',
      date: new Date('2024-05-14T09:42:00').toISOString(),
      imageUrl: img1,
      status: 'HEALTHY',
      diseaseName: 'Tomato Crop - West Block',
      details: 'Confidence Score: 98.4%. No signs of fungal infection or pest damage detected.',
      confidence: 98,
      metrics: { moisture: '84%', chlorophyll: '0.89', solar: '95%', transpiration: 'Optimal' },
      advice: 'The tomato crops are in a high-growth phase. Ensure nitrogen levels remain consistent through the next week.'
    },
    {
      id: '2',
      date: new Date('2024-05-12T14:15:00').toISOString(),
      imageUrl: img2,
      status: 'DISEASED',
      diseaseName: 'Cucumber Vineyard - South Row 4',
      details: 'Detected: Downy Mildew (Pseudoperonospora cubensis).',
      confidence: 92,
      metrics: { moisture: '62%', chlorophyll: '0.45', solar: '71%', transpiration: 'Stressed' },
      recommendation: 'Immediate localized fungicide treatment and humidity control adjustments required.'
    },
    {
      id: '3',
      date: new Date('2024-05-11T11:30:00').toISOString(),
      imageUrl: img3,
      status: 'HEALTHY',
      diseaseName: 'Bell Pepper - Experimental Bay B',
      details: 'Confidence Score: 99.1%. Fruit development proceeding as expected.',
      confidence: 99,
      metrics: { moisture: '79%', chlorophyll: '0.82', solar: '90%', transpiration: 'Optimal' },
      advice: 'Experimental nutrient mix B is showing superior results compared to the control group. No adjustments needed.'
    }
  ];

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} • ${time}`;
  };

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto">
      <div className="space-y-6 mb-8">
        {displayHistory.map((item) => {
          const isHealthy = item.status === 'HEALTHY';
          return (
            <div key={item.id} className="bg-white rounded-[2rem] shadow-sm border border-[#e2ece6] flex items-center p-3 relative group hover:shadow-md transition-shadow">

              {/* Image */}
              <div className="w-64 h-36 bg-black rounded-3xl overflow-hidden flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.diseaseName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 px-8 py-2 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[#0e4e37] font-extrabold text-xl">{item.diseaseName}</h3>
                  <div className={clsx(
                    "px-3 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1.5",
                    isHealthy ? "bg-[#cff3e0] text-[#008f5d]" : "bg-[#fde8e8] text-[#c81e1e]"
                  )}>
                    <span className={clsx(
                      "w-1.5 h-1.5 rounded-full",
                      isHealthy ? "bg-[#008f5d]" : "bg-[#c81e1e]"
                    )}></span>
                    <span>{item.status}</span>
                  </div>
                </div>
                <p className="text-[#5a8a72] text-[11px] font-bold tracking-wider uppercase mb-3">
                  {formatDate(item.date)}
                </p>
                <p className="text-[#5a8a72] text-sm leading-relaxed max-w-3xl">
                  {item.details}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 pr-6">
                <button 
                  onClick={() => {
                    setCurrentResult(item);
                    navigate('/result');
                  }}
                  className="w-10 h-10 rounded-full bg-[#f4f9f6] flex items-center justify-center text-[#0e4e37] hover:bg-[#e4f0e9] transition-colors border border-[#e2ece6]"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#f4f9f6] flex items-center justify-center text-[#0e4e37] hover:bg-[#e4f0e9] transition-colors border border-[#e2ece6]">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-4">
        <button className="bg-[#063322] hover:bg-[#0a4a32] text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg">
          Load Older Records
        </button>
      </div>
    </div>
  );
};

export default History;
