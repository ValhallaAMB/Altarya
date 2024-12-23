import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
// import { checkAuthState } from "@/services/authServices";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export const GlobalContext = createContext<{
  isAuthenticated: boolean;
  user: User | null;
}>({
  isAuthenticated: false,
  user: null,
});

export const useGlobalContext = () => {
  const value = useContext(GlobalContext);

  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return value;
};

const GlobalContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // checkAuthState()
    //   .then((res) => {
    //     setIsAuthenticated(true);
    //     setUser(res);
    //   })
    //   .catch((error) => {
    //     setIsAuthenticated(false);
    //     setUser(null);
    //     console.error("Error checking auth state", error);
    //   });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setIsAuthenticated(true);
        setUser(user);
        // ...
      } else {
        // User is signed out
        setIsAuthenticated(false);
        setUser(null);
        // ...
      }
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
