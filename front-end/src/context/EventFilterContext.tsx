import React,{ createContext, useContext, useState } from "react";


interface EventFilterContextType {
    showShifts: boolean;
    setShowShifts: (show : boolean) => void;
    showConflicts: boolean;
    setShowConflicts: (show : boolean) => void;
    /* Show Conflciting later */
}

const EventFilterContext = createContext<EventFilterContextType | undefined>(undefined);

export const EventFilterProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [showShifts, setShowShifts] = useState(false);
    const [showConflicts, setShowConflicts] = useState(false);

    return (
      <EventFilterContext.Provider value={{ showShifts, setShowShifts, showConflicts,setShowConflicts }}>
        {children}
      </EventFilterContext.Provider>
    );
  };
  
// This is the hook
export const useEventFilter = () => { 
    const context = useContext(EventFilterContext);
    if (context === undefined) {
      throw new Error("useEventFilter must be used within a EventFilterProvider");
    }
    return context;
  }