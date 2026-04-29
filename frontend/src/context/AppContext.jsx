import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/history`);
        
        const mappedHistory = res.data.map(item => {
           const isHealthy = item.topPrediction.toLowerCase().includes('healthy') || item.topPrediction.toLowerCase().includes('normal');
           const confidence = Math.round(item.probability * 100);
           
           // Calculate dynamic metrics based on confidence
           const moisture = isHealthy ? (75 + Math.floor(confidence / 10)) + '%' : (50 + Math.floor(confidence / 10)) + '%';
           const chlorophyll = isHealthy ? (0.80 + (confidence / 500)).toFixed(2) : (0.35 + (confidence / 500)).toFixed(2);
           const solar = isHealthy ? (85 + Math.floor(confidence / 10)) + '%' : (60 + Math.floor(confidence / 10)) + '%';
           
           return {
              id: item._id,
              date: item.timestamp,
              imageUrl: item.imageUrl || null,
              status: isHealthy ? 'HEALTHY' : 'DISEASED',
              diseaseName: item.topPrediction,
              details: isHealthy 
                ? `Confidence Score: ${confidence}%. No signs of fungal infection or pest damage detected. Leaf turgor and pigmentation optimal for current growth stage.` 
                : `Detected: ${item.topPrediction} (Confidence: ${confidence}%). Recommend immediate localized treatment and monitoring.`,
              confidence: confidence,
              metrics: { 
                 moisture, 
                 chlorophyll, 
                 solar, 
                 transpiration: isHealthy ? 'Optimal' : 'Stressed' 
              },
              advice: isHealthy 
                ? 'Crops are showing peak vitality. We recommend maintaining the current fertigation schedule. Monitor for pests as seasonal temperatures rise.' 
                : `Urgent: Pathogens related to ${item.topPrediction} detected. Isolate affected zone. Apply appropriate treatment within 24 hours.`
           };
        });
        setHistory(mappedHistory);
      } catch (e) {
        console.error("Failed to fetch history:", e);
      }
    };
    fetchHistory();
  }, []);

  const addResultToHistory = (result) => {
    setHistory((prev) => [result, ...prev]);
  };

  return (
    <AppContext.Provider value={{ history, currentResult, setCurrentResult, addResultToHistory }}>
      {children}
    </AppContext.Provider>
  );
};
