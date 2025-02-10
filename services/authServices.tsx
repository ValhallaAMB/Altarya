import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

type LoginProps = {
  email: string;
  password: string;
};

type CreateUserProps = {
  email: string;
  password: string;
  username: string;
  // profileURL: string;
};

export const createUser = async ({
  username,
  email,
  password,
}: // profileURL,

CreateUserProps): Promise<{ success: boolean; msg?: any }> => {
  try {
    const usersCollectionRef = collection(db, "users");
    const usersCollectionSnapshot = await getDocs(usersCollectionRef);

    const userQuery = query(
      usersCollectionRef,
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(userQuery);

    // Check if the "users" collection exists, if not create it
    if (usersCollectionSnapshot.empty) {
      await setDoc(doc(db, "users", "defaultUser"), {});
      await setDoc(doc(db, "userchatrooms", "defaultUserChatRooms"), {});
    } else if (!querySnapshot.empty)
      return { success: false, msg: "User already exists" };

    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredentials.user, {
      displayName: username,
      // photoURL: "",
    });

    // Signed up
    await setDoc(doc(db, "users", userCredentials.user.uid), {
      userId: userCredentials.user.uid,
      username,
      email,
      // profileURL,
    });

    await setDoc(doc(db, "userchatrooms", userCredentials.user.uid), {
      chats: [],
    });

    return { success: true };
  } catch (error) {
    let msg = (error as Error).message;

    if (msg.includes("auth/invalid-email")) msg = "Invalid email";
    else if (msg.includes("auth/email-already-in-use"))
      msg = "Email already exists";
    else if (msg.includes("auth/weak-password"))
      msg = "Password should be at least 6 characters";

    return { success: false, msg };
  }
};

export const logIn = async ({
  email,
  password,
}: LoginProps): Promise<{ success: boolean; msg?: string }> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    let msg = (error as Error).message;
    if (msg.includes("auth/invalid-credential")) msg = "Invalid credential";

    // console.log("Error signing in", error.code, error.message);
    return { success: false, msg };
  }
};

export const logOut = async (): Promise<void> => {
  await signOut(auth)
    .then(() => {
      // Signed out
      console.log("Signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log("Error signing out", error.code, error.message);
    });
};
