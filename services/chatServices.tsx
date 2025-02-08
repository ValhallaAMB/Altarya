import { arrayUnion, doc, DocumentData, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { IMessage } from "react-native-gifted-chat";

export const listenToMessages = (
  chatId: string,
  setChat: (messages: any) => void
  // setMessages: (messages: IMessage[]) => void
) => {
  try {
    return onSnapshot(doc(db, "chats", chatId), async (res) => {
      setChat(res.data());
      // console.log("res", res.data());
    });

    // return onSnapshot(doc(db, "chats", chatId), async (res) => {
    //   const data = res.data();
    //   if (data && data.messages) {
    //     const formattedMessages = data.messages.map((msg: any) => ({
    //       _id: msg.createdAt,
    //       text: msg.text,
    //       createdAt: new Date(msg.createdAt),
    //       user: {
    //         _id: msg.senderId,
    //         name: msg.senderName || "User",
    //         // avatar: msg.senderAvatar || "https://placeimg.com/140/140/any",
    //       },
    //     }));
    //     setMessages(formattedMessages);
    //   }
    // });
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
  // try {
  //   await updateDoc(doc(db, "chats", chatId), {
  //     messages: arrayUnion({
  //       _id: message._id,
  //       senderId: userId,
  //       text: message.text,
  //       createdAt:  Date.now(),
  //       senderName: message.user.name,
  //       // senderAvatar: message.user.avatar,
  //     }),
  //   });

  //   const userIds = [userId, receiverId];

  //   userIds.forEach(async (id) => {
  //     const userChatsRef = doc(db, "userchatrooms", id);
  //     const userChatsSnapshot = await getDoc(userChatsRef);

  //     if (userChatsSnapshot.exists()) {
  //       const userChatsData = userChatsSnapshot.data();
  //       const chatIndex = userChatsData.chats.findIndex(
  //         (chat: any) => chat.chatId === chatId
  //       );

  //       userChatsData.chats[chatIndex].lastMessage = message.text;
  //       userChatsData.chats[chatIndex].updatedAt = Date.now();

  //       await updateDoc(userChatsRef, {
  //         chats: userChatsData.chats,
  //       });
  //     }
  //   });
  } catch (error) {
    console.error(error);
  }
};
