import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import uuid from "react-native-uuid";
import { User } from "firebase/auth";

export const listenToMessages = (
  chatId: string,
  setChat: (messages: any) => void
) => {
  try {
    return onSnapshot(doc(db, "chats", chatId), async (res) => {
      setChat(res.data());
      // console.log("res", res.data());
    });
  } catch (error) {
    console.log("Error listening to messages", error);
  }
};

export const sendMessage = async (
  chatId: string,
  user: User,
  receiverId: string,
  text: string
) => {
  try {
    const _id = uuid.v4();

    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        _id,
        senderId: user?.uid,
        senderName: user?.displayName,
        text,
        createdAt: Date.now(),
        isMessageDeleted: false,
      }),
    });

    const userIds = [user?.uid, receiverId];

    userIds.forEach(async (id) => {
      const userChatsRef = doc(db, "userchatrooms", id);
      const userChatsSnapshot = await getDoc(userChatsRef);

      if (userChatsSnapshot.exists()) {
        const userChatsData = userChatsSnapshot.data();
        const chatIndex = userChatsData.chats.findIndex(
          (chat: any) => chat.chatId === chatId
        );

        userChatsData.chats[chatIndex].lastMessage = text;
        userChatsData.chats[chatIndex].messageId = _id;
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

export const deleteMessage = async (
  chatId: string,
  userId: string,
  receiverId: string,
  messageId: string
) => {
  let isUserValid = false;

  try {
    const chatRef = doc(db, "chats", chatId);
    const chatSnapshot = await getDoc(chatRef);

    const lastMessageCheck = async (userId: string) => {
      const userChatsRef = doc(db, "userchatrooms", userId);
      const userChatsSnapshot = await getDoc(userChatsRef);

      if (userChatsSnapshot.exists()) {
        const userChatsData = userChatsSnapshot.data();
        const chatIndex = userChatsData.chats.findIndex(
          (chat: any) => chat.chatId === chatId
        );

        if (userChatsData.chats[chatIndex].messageId === messageId)
          userChatsData.chats[chatIndex].lastMessage =
            "This message has been deleted";

        await updateDoc(userChatsRef, {
          chats: userChatsData.chats,
        });
      }
    };

    if (chatSnapshot.exists()) {
      const chatData = chatSnapshot.data();
      const updatedMessages = chatData.messages.map((message: any) => {
        if (message._id === messageId && message.senderId === userId) {
          isUserValid = true;
          return {
            ...message,
            text: "This message has been deleted",
            isMessageDeleted: true,
          };
        }
        return message;
      });

      await updateDoc(chatRef, {
        messages: updatedMessages,
      });
    }
    if (!isUserValid) return (isUserValid = false);

    await lastMessageCheck(userId);
    await lastMessageCheck(receiverId);

    return isUserValid;
  } catch (error) {
    console.error(error);
    return isUserValid;
  }
};

// export const editMessage = async (
//   chatId: string,
//   messageId: string,
//   userId: string,
//   newText: string
// ) => {
//   try {
//     const chatRef = doc(db, "chats", chatId);
//     const chatSnapshot = await getDoc(chatRef);

//     if (chatSnapshot.exists()) {
//       const chatData = chatSnapshot.data();
//       const updatedMessages = chatData.messages.map((message: any) =>
//         message._id === messageId && message.senderId === userId
//           ? { ...message, text: newText }
//           : message
//       );

//       await updateDoc(chatRef, {
//         messages: updatedMessages,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
