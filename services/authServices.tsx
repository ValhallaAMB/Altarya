import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

type LoginProps = {
  email: string;
  password: string;
};

type CreateUserProps = {
  loginCredentials: LoginProps;
  username: string;
  profileURL: string;
};

export const createUser = async ({
  username,
  profileURL,
  loginCredentials,
}: CreateUserProps): Promise<void> => {
  await createUserWithEmailAndPassword(
    auth,
    loginCredentials.email,
    loginCredentials.password
  )
    .then(async (userCredential) => {
      // Signed up
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        profileURL,
        userID: userCredential.user.uid,
      }).catch((error) => {
        let msg = error.message;

        if (msg.includes("auth/invalid-email")) msg = "Invalid email";
        else if (msg.includes("auth/email-already-in-use"))
          msg = "Email in use";
        else if (msg.includes("auth/weak-password"))
          msg = "Password should be at least 6 characters";
      });
    })
    .catch((error) => {
      console.log("Error signing up", error.code, error.message);
    });
};

export const logIn = async ({ email, password }: LoginProps): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password)
    // .then(() => ({ success: true }))
    .catch((error) => {
      let msg = error.message;
      if (msg.includes("auth/invalid-credential")) msg = "Invalid credential";

      console.log("Error signing in", error.code, error.message);
    });
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

export const checkAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!user) throw Error;

      
      
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}
