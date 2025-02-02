import React, { createContext, useContext, useState } from 'react';


const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  
    const [isMeasuring, setIsMeasuring] = useState(false);
     const [captureCount, setCaptureCount] = useState(0);

  

  return (
    <AppContext.Provider value={{ isMeasuring ,setIsMeasuring, captureCount, setCaptureCount}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
