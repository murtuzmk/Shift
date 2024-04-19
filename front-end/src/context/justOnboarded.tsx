import { PropsWithChildren, createContext, useContext, useState } from "react";

type OnboardContext = {
  justOnboarded: boolean;
  setJustOnboarded: React.Dispatch<React.SetStateAction<boolean>>;
};

const OnboardContext = createContext<OnboardContext | null>(null);

export function OnboardContextProvider({ children }: PropsWithChildren) {
  const [justOnboarded, setJustOnboarded] = useState(false);
  return (
    <OnboardContext.Provider value={{ justOnboarded, setJustOnboarded }}>
      {children}
    </OnboardContext.Provider>
  );
}

export function useOnboardContext() {
  const context = useContext(OnboardContext);
  if (!context) {
    throw new Error(
      "useOnboardContext must be used within a OnboardContextProvider"
    );
  }
  return context;
}
