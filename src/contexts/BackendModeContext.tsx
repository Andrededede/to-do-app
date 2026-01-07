import React, { createContext, useContext, useState } from "react";

type BackendModeContextType = {
  isReactive: boolean;
  toggleMode: () => void;
};

const BackendModeContext = createContext<BackendModeContextType>({} as any);

export const BackendModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReactive, setIsReactive] = useState(false);

  const toggleMode = () => setIsReactive((prev) => !prev);

  return (
    <BackendModeContext.Provider value={{ isReactive, toggleMode }}>
      {children}
    </BackendModeContext.Provider>
  );
};

export const useBackendMode = () => useContext(BackendModeContext);
