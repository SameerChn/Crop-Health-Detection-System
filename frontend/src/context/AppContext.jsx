import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);

  const addResultToHistory = (result) => {
    setHistory((prev) => [result, ...prev]);
  };

  return (
    <AppContext.Provider value={{ history, currentResult, setCurrentResult, addResultToHistory }}>
      {children}
    </AppContext.Provider>
  );
};
