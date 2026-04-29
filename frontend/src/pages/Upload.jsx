import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import { useAppContext } from '../context/AppContext';
import { Activity, Target } from 'lucide-react';

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e2ece6] flex-1">
    <p className="text-[10px] font-bold text-[#5a8a72] uppercase tracking-wider mb-2">{title}</p>
    <p className="text-3xl font-extrabold text-[#0e4e37] leading-none mb-1">{value}</p>
    <p className="text-xs text-[#5a8a72] font-semibold">{subtitle}</p>
  </div>
);

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentResult, addResultToHistory } = useAppContext();

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const isHealthy = Math.random() > 0.4;
      const mockResult = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        imageUrl: preview,
        status: isHealthy ? 'HEALTHY' : 'DISEASED',
        diseaseName: isHealthy ? 'Tomato Crop - West Block' : 'Cucumber Vineyard - South Row 4',
        details: isHealthy 
          ? 'Confidence Score: 98.4%. No signs of fungal infection or pest damage detected. Leaf turgor and pigmentation optimal for current growth stage.'
          : 'Detected: Downy Mildew (Pseudoperonospora cubensis). Recommend immediate localized fungicide treatment and humidity control adjustments.',
        confidence: Math.floor(Math.random() * 10) + 90,
        metrics: {
          moisture: isHealthy ? '82%' : '64%',
          chlorophyll: isHealthy ? '0.88' : '0.42',
          solar: isHealthy ? '94%' : '72%',
          transpiration: isHealthy ? 'Optimal' : 'Stressed'
        },
        advice: isHealthy 
          ? 'Crops are showing peak vitality. We recommend maintaining the current fertigation schedule. Monitor for aphids as seasonal temperatures rise.'
          : 'Urgent: Fungal pathogens detected. Isolate affected zone 4. Apply systemic fungicide within 24 hours. Reduce overnight humidity to below 60%.'
      };

      setCurrentResult(mockResult);
      addResultToHistory(mockResult);
      navigate('/result');

    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#0e4e37] mb-4">Precision Health Analysis</h1>
        <p className="text-[#5a8a72] text-lg max-w-3xl leading-relaxed">
          Upload high-resolution imagery of your crops. Our neural engine identifies over 200+ types of pathogens, nutrient deficiencies, and hydration stress points.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 mb-8">
        {/* Left Side: Upload Area */}
        <div className="flex-1 min-h-[400px]">
          <ImageUploader onFileSelect={handleFileSelect} />
        </div>

        {/* Right Side: Preview & Action */}
        <div className="w-full lg:w-[350px] flex flex-col gap-6">
          {/* Live Preview Card */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#5a8a72] tracking-wider uppercase">Live Preview</span>
              <span className="flex items-center space-x-1 bg-[#cff3e0] text-[#008f5d] px-3 py-1 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#008f5d]"></span>
                <span>Ready</span>
              </span>
            </div>
            <div className="bg-[#5e6660] rounded-[2rem] aspect-video w-full overflow-hidden flex items-center justify-center shadow-md relative">
              {preview ? (
                <img src={preview} alt="Crop preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white/40 font-semibold text-sm">No image selected</span>
              )}
            </div>
          </div>

          {/* Health Engine Card */}
          <div className="bg-[#063322] rounded-[2rem] p-6 text-white shadow-lg flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5 text-[#3fe29f]" />
                <h3 className="font-bold text-lg">Health Engine v4.2</h3>
              </div>
              <p className="text-[#8cae9e] text-xs leading-relaxed mb-6">
                Analysis includes leaf surface mapping, soil moisture estimation, and chlorophyll density mapping.
              </p>
              
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Optimization</span>
                  <span className="text-[#3fe29f]">88%</span>
                </div>
                <div className="h-1.5 bg-[#1b3b2b] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3fe29f] w-[88%] rounded-full"></div>
                </div>
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!file || isUploading}
              className="w-full bg-[#008f5d] hover:bg-[#00a36a] disabled:bg-[#1b3b2b] disabled:text-[#8cae9e] text-white py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors"
            >
              <Target className="w-5 h-5" />
              <span>{isUploading ? 'ANALYZING...' : 'ANALYZE CROP'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Analysis History" value="1,284" subtitle="↑ 12% this month" />
        <StatCard title="Detection Rate" value="99.8%" subtitle="Enterprise Precision" />
        <StatCard title="Processing Time" value="< 1.2s" subtitle="Real-time edge computing" />
        <StatCard title="Active Sensors" value="42" subtitle="Syncing via Satellite" />
      </div>
    </div>
  );
};

export default Upload;
