import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db, usersCollection } from "@/firebaseConfig";
import { doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

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
    const userDoc = await getDocs(query(usersCollection, where("username", "==", username)));
    if (userDoc)
      return { success: false, msg: "Username already exists" };

    console.log("User DOCS", userDoc);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed up
    await setDoc(doc(db, "users", userCredential.user.uid), {
      username,
      // profileURL,
      userID: userCredential.user.uid,
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

export const logIn = async ({ email, password }: LoginProps): Promise<{ success: boolean; msg?: string }> => {
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

// export const checkAuthState = (): Promise<DocumentData | null> => {
//   return new Promise((resolve, reject) => {
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userDoc = await getDoc(doc(db, "users", user.uid));
//           if (userDoc.exists()) {
//             const userData = userDoc.data() as DocumentData;
//             resolve({
//               profileURL: userData.profileURL,
//               userID: userData.userID,
//               username: userData.username,
//             });
//           } else {
//             resolve(null);
//           }
//         } catch (error) {
//           reject(error);
//         }
//       } else {
//         resolve(null);
//       }
//     });
//   });
// };
