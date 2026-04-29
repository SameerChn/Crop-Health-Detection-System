import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ResultCard from '../components/ResultCard';

const Result = () => {
  const { currentResult } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentResult) {
      navigate('/upload');
    }
  }, [currentResult, navigate]);

  if (!currentResult) return null;

  return (
    <div className="py-8 max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-[#0e4e37] mb-2">Analysis Result</h1>
          <p className="text-[#5a8a72]">Detailed breakdown of your crop's health status.</p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/history')}
            className="flex items-center space-x-2 text-[#0e4e37] bg-white border border-[#e2ece6] px-4 py-2 rounded-xl hover:bg-[#f4f9f6] transition-colors font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to History</span>
          </button>
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center space-x-2 bg-[#008f5d] text-white px-4 py-2 rounded-xl hover:bg-[#007a4f] transition-colors font-bold text-sm shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>New Scan</span>
          </button>
        </div>
      </div>

      <div className="flex-1">
        <ResultCard result={currentResult} />
      </div>
    </div>
  );
};

export default Result;
