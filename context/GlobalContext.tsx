import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export const GlobalContext = createContext<any>(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
  }, []);

  return (
    <GlobalContext.Provider value={{ isAuthenticated }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
