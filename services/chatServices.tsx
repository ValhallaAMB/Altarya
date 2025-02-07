import { arrayUnion, doc, DocumentData, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const listenToMessages = (
  chatId: string,
  setChat: (messages: any) => void
) => {
  try {
    return onSnapshot(doc(db, "chats", chatId), async (res) => {
      setChat(res.data());
      console.log("res", res.data());
    });
  } catch (error) {
    console.log("Error listening to messages", error);
  }
};

export const sendMessage = async (chatId: string, userId: string, receiverId: string, text: string) => {
  try {
    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        senderId: userId,
        text,
        createdAt: Date.now(),
      }),
    });

    const userIds = [userId, receiverId];

    userIds.forEach(async (id) => {
      const userChatsRef = doc(db, "userchatrooms", id);
      const userChatsSnapshot = await getDoc(userChatsRef);

      if (userChatsSnapshot.exists()) {
        const userChatsData = userChatsSnapshot.data();
        const chatIndex = userChatsData.chats.findIndex(
          (chat: any) => chat.chatId === chatId
        );

        userChatsData.chats[chatIndex].lastMessage = text;
        // userChatsData.chats[chatIndex].isSeen =
        //   id === userId ? true : false;
        userChatsData.chats[chatIndex].updatedAt = Date.now();

        await updateDoc(userChatsRef, {
          chats: userChatsData.chats,
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};
