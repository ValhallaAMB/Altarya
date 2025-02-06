import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const searchUser = async (username: string) => {
  try {
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("username", "==", username));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      console.log("User found", user);
      return user;
    }
  } catch (error) {
    console.log("Error searching user", error);
    return false;
  }
};

export const createChatRoom = async (
  searchedUserId: string,
  user: { uid: string } | null
): Promise<{ success: boolean; msg?: string }> => {
  try {
    if (!user?.uid) return { success: false, msg: "User ID is undefined" };
    else if (searchedUserId === user?.uid)
      return { success: false, msg: "You cannot chat with yourself" };

    const chatId = [searchedUserId, user?.uid].sort().join("-");
    const userChatRoomsRef = collection(db, "userchatrooms");
    const chatRef = collection(db, "chats");
    const newChatRef = doc(chatRef, chatId);

    const existingChatQuery = query(chatRef, where("chatId", "==", chatId));
    const existingChatSnapshot = await getDocs(existingChatQuery);

    if (!existingChatSnapshot.empty) {
      return { success: false, msg: "Chat room already exists" };
    }

    await setDoc(newChatRef, {
      chatId: chatId,
      createdAt: serverTimestamp(),
      messages: [],
    });

    // console.log("userUID", user?.uid);
    // console.log("searchedUSERID", searchedUserId);

    await updateDoc(doc(userChatRoomsRef, user?.uid), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: searchedUserId,
        updatedAt: Date.now(),
      }),
    });

    await updateDoc(doc(userChatRoomsRef, searchedUserId), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: user?.uid,
        updatedAt: Date.now(),
      }),
    });

    return { success: true };
  } catch (error) {
    let msg = (error as Error).message;
    console.log("Error creating chatroom", error);
    return { success: false, msg };
  }
};
