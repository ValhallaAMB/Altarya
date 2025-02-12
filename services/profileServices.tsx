import { auth, db } from "@/firebaseConfig";
import {
  signOut,
  deleteUser,
  updateProfile,
  User,
  updateEmail,
  updatePassword,
  verifyBeforeUpdateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  or,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Alert } from "react-native";

export const updateAccount = async (
  user: User,
  newUsername: string,
  newEmail: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; msg?: any }> => {
  try {
    const userRef = doc(db, "users", user.uid);
    const usersCollectionRef = collection(db, "users");
    const userQuery = query(
      usersCollectionRef,
      or(where("username", "==", newUsername), where("email", "==", newEmail))
    );
    const userQuerySnapshot = await getDocs(userQuery);
    let data: any;
    userQuerySnapshot.forEach((item) => {
      data = item.data();
    });

    if (data?.userId === user.uid) {
      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);

      if (newUsername !== user.displayName) {
        await updateProfile(user, {
          displayName: newUsername,
        });
        await updateDoc(userRef, {
          username: newUsername,
        });
      }

      if (newPassword !== "") await updatePassword(user, newPassword);

      if (newEmail !== user.email) {
        await verifyBeforeUpdateEmail(user, newEmail);
        await updateDoc(userRef, {
          email: newEmail,
        });
        Alert.alert(
          "Confirm your email address.\nBe sure to check your spam box."
        );
        await signOut(auth);
      }
    } else if (!userQuerySnapshot.empty)
      return { success: false, msg: "Username and/or Email already exists" };

    return { success: true };
  } catch (error) {
    console.log("Error updating profile", error);
    let msg = (error as Error).message;

    if (msg.includes("auth/invalid-new-email")) msg = "Invalid email";
    else if (msg.includes("auth/email-already-in-use"))
      msg = "Email already exists";
    else if (msg.includes("auth/weak-password"))
      msg = "Password should be at least 6 characters";

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

export const deleteAccount = async (user: User): Promise<void> => {
  try {
    // Update senderName to "Removed User" in all chat messages
    // const chatsCollectionRef = collection(db, "chats");
    // const chatQuery = query(chatsCollectionRef, where("messages.senderId", "==", user.uid));
    // const chatQuerySnapshot = await getDocs(chatQuery);

    // chatQuerySnapshot.forEach(async (chatDoc) => {
    //   const chatData = chatDoc.data();
    //   const updatedMessages = chatData.messages.map((message: any) => {
    //     if (message.senderId === user.uid) {
    //       return { ...message, senderName: "Removed User" };
    //     }
    //     return message;
    //   });

    //   await updateDoc(chatDoc.ref, { messages: updatedMessages });
    // });

    await deleteUser(user);
    await deleteDoc(doc(db, "users", user?.uid));
    await deleteDoc(doc(db, "userchatrooms", user?.uid));
    await signOut(auth);

    console.log("Account deleted");
  } catch (error) {
    console.log("Error deleting account", error);
  }
};
