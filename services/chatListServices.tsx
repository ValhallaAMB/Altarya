import { db } from "@/firebaseConfig";
import { doc, getDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

// (chats: any[]) => void: This is the type signature of the function. It indicates that setChats is a function that takes one parameter named chats and returns void.
export const retrieveChatLists = async (
  user: { uid: string } | null,
  setChats: (chats: any[]) => void
) => {
  try {
    if (!user) return;

    return onSnapshot(doc(db, "userchatrooms", user.uid), async (res) => {
      const items = res.data()?.chats;
      // console.log("items", items);

      const promises = items.map(async (item: any) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        // console.log("user", user);
        // console.log("...item", item);

        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
      // console.log("chatData", chatData);

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });
  } catch (error) {
    console.log("Error retrieving chat lists", error);
  }
};

export const deleteChatRoom = async (
  chatId: string,
  userId: string,
  receiverId: string
) => {
  try {
    const deleteChatFromUser = async (userId: string) => {
      const userChatRoomsRef = doc(db, "userchatrooms", userId);
      // const userChatRoomsSnap = ;
      const userChatRoomsData = (await getDoc(userChatRoomsRef)).data()
      const updatedChats = userChatRoomsData?.chats.filter((chat: any) => chat.chatId !== chatId);
      await updateDoc(userChatRoomsRef, { chats: updatedChats });
    };

    await deleteDoc(doc(db, "chats", chatId));
    await deleteChatFromUser(userId);
    await deleteChatFromUser(receiverId);
    console.log("Chat room deleted successfully");

    return true;
  } catch (error) {
    console.log("Error deleting chat room", error);
    return false;
  }
};
