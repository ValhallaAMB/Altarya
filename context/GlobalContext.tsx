import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export const GlobalContext = createContext<{
  isAuthenticated: boolean;
  user: User | null;
  receiverId: string | null;
  receiverUsername: string | null;
  setChatroomParams: (receiverId: string, receiverUsername: string) => void;
}>({
  isAuthenticated: false,
  user: null,
  receiverId: null,
  receiverUsername: null,
  setChatroomParams: () => {},
});

const GlobalContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [receiverUsername, setReceiverUsername] = useState<string | null>(null);

  const setChatroomParams = (receiverId: string, receiverUsername: string) => {
    setReceiverId(receiverId);
    setReceiverUsername(receiverUsername);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        setIsAuthenticated(true);
        setUser(user);
      } else {
        // User is signed out
        setIsAuthenticated(false);
        setUser(null);
      }

    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        user,
        receiverId,
        receiverUsername,
        setChatroomParams,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => {
  const value = useContext(GlobalContext);

  if (!value) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }

  return value;
};
