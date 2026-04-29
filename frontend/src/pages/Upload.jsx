import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const { setCurrentResult, addResultToHistory, history } = useAppContext();

  // Stats derived from real history
  const totalScans = history.length;
  const diseasedCount = history.filter(h => h.status === 'DISEASED').length;
  const detectionRate = totalScans > 0 ? Math.round((diseasedCount / totalScans) * 100) : null;
  const lastConfidence = history.length > 0 ? history[0].confidence : null;

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await axios.post(`${API_URL}/api/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;
      
      let topPrediction = null;
      if (data.predictions && data.predictions.length > 0) {
        topPrediction = [...data.predictions].sort((a, b) => b.probability - a.probability)[0];
      }

      const diseaseName = topPrediction ? topPrediction.tagName : 'Unknown';
      const isHealthy = diseaseName.toLowerCase().includes('healthy') || diseaseName.toLowerCase().includes('normal');
      const confidence = topPrediction ? Math.round(topPrediction.probability * 100) : 0;
      
      const result = {
        id: data.dbId || data.id || Date.now().toString(),
        date: new Date().toISOString(),
        imageUrl: data.imageUrl || preview,
        status: isHealthy ? 'HEALTHY' : 'DISEASED',
        diseaseName: diseaseName,
        allPredictions: data.predictions || [],
        details: isHealthy 
          ? `Confidence: ${confidence}%. The AI found no disease markers in this image. The crop appears healthy.`
          : `Detected: ${diseaseName} with ${confidence}% confidence. Immediate assessment is recommended.`,
        confidence: confidence,
        advice: isHealthy 
          ? 'Crops are showing no signs of disease. Maintain current care schedule and monitor regularly.'
          : `Urgent: ${diseaseName} detected. Isolate the affected zone and consult an agronomist within 24 hours.`
      };

      setCurrentResult(result);
      addResultToHistory(result);
      navigate('/result');

    } catch (err) {
      console.error(err);
      alert('Error analyzing crop: ' + (err.response?.data?.error || err.message));
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
                <h3 className="font-bold text-lg">Azure Custom Vision</h3>
              </div>
              <p className="text-[#8cae9e] text-xs leading-relaxed mb-6">
                Powered by your trained Azure Custom Vision model. Upload a crop image to get an instant disease classification with confidence scores.
              </p>
              
              {lastConfidence !== null ? (
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Last Analysis Confidence</span>
                    <span className="text-[#3fe29f]">{lastConfidence}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1b3b2b] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3fe29f] rounded-full transition-all duration-700" style={{ width: `${lastConfidence}%` }}></div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-3 bg-[#1b3b2b] rounded-xl">
                  <p className="text-[#8cae9e] text-xs">No scans yet — upload your first crop image to begin.</p>
                </div>
              )}
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
        <StatCard
          title="Total Scans"
          value={totalScans > 0 ? totalScans.toLocaleString() : '—'}
          subtitle={totalScans > 0 ? `${diseasedCount} disease${diseasedCount !== 1 ? 's' : ''} detected` : 'No scans yet'}
        />
        <StatCard
          title="Disease Rate"
          value={detectionRate !== null ? `${detectionRate}%` : '—'}
          subtitle={totalScans > 0 ? `Across ${totalScans} scan${totalScans !== 1 ? 's' : ''}` : 'Upload to begin'}
        />
        <StatCard
          title="Last Confidence"
          value={lastConfidence !== null ? `${lastConfidence}%` : '—'}
          subtitle={lastConfidence !== null ? 'Most recent scan' : 'No data yet'}
        />
        <StatCard
          title="Healthy Crops"
          value={totalScans > 0 ? (totalScans - diseasedCount).toString() : '—'}
          subtitle={totalScans > 0 ? `${totalScans - diseasedCount} of ${totalScans} scans` : 'No scans yet'}
        />
      </div>
    </div>
  );
};

export default Upload;
