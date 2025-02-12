To get the GiftedChat component to work correctly with your Firestore data

### chatroom.tsx

```bash
import {
KeyboardAvoidingView,
Platform,
SafeAreaView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { listenToMessages, sendMessage } from "@/services/chatServices";
import { useGlobalContext } from "@/context/GlobalContext";
import { createChatRoomId } from "@/utils/common";

const Chatroom = () => {
const [messages, setMessages] = useState<IMessage[]>([]);
const { user, receiverId } = useGlobalContext();
const chatId =
user?.uid && receiverId ? createChatRoomId(user.uid, receiverId) : "";

useEffect(() => {
let unSub: (() => void) | undefined;

    const fetchData = async () => {
      unSub = listenToMessages(chatId, setMessages);
    };

    fetchData();

    return () => {
      if (unSub) unSub();
    };

}, [chatId]);

const onSend = useCallback((newMessages: IMessage[] = []) => {
setMessages((previousMessages) =>
GiftedChat.append(previousMessages, newMessages)
);
newMessages.forEach((message) => {
sendMessage(chatId, user?.uid || "", receiverId || "", message);
});
}, [chatId, user?.uid, receiverId]);

return (
<SafeAreaView className="bg-[#001220] flex-1">
<GiftedChat
messages={messages}
onSend={(messages) => onSend(messages)}
user={{
          _id: user?.uid || "",
          name: user?.displayName || "User",
          avatar: user?.photoURL || "https:placeimg.com/140/140/any",
        }}
/>
</SafeAreaView>
);
};

export default Chatroom;
```

### chatServices.tsx

```bash
import { arrayUnion, doc, DocumentData, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { IMessage } from "react-native-gifted-chat";

export const listenToMessages = (
chatId: string,
setMessages: (messages: IMessage[]) => void
) => {
try {
return onSnapshot(doc(db, "chats", chatId), async (res) => {
const data = res.data();
if (data && data.messages) {
const formattedMessages = data.messages.map((msg: any) => ({
\_id: msg.createdAt,
text: msg.text,
createdAt: new Date(msg.createdAt),
user: {
\_id: msg.senderId,
name: msg.senderName || "User",
avatar: msg.senderAvatar || "https:placeimg.com/140/140/any",
},
}));
setMessages(formattedMessages);
}
});
} catch (error) {
console.log("Error listening to messages", error);
}
};
```

```bash
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { IMessage } from "react-native-gifted-chat";

export const sendMessage = async (chatId: string, userId: string, receiverId: string, message: IMessage) => {
try {
await updateDoc(doc(db, "chats", chatId), {
messages: arrayUnion({
\_id: message.\_id,
senderId: userId,
text: message.text,
createdAt: Date.now(),
senderName: message.user.name,
senderAvatar: message.user.avatar,
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

        userChatsData.chats[chatIndex].lastMessage = message.text;
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
```

## ATTEMPT 2

### chatServices.tsx

```bash
 export const listenToMessages = (
   chatId: string,
   setMessages: (messages: IMessage[]) => void
 ) => {
   try {
     return onSnapshot(doc(db, "chats", chatId), async (res) => {
       const data = res.data();
       if (data && data.messages) {
         const formattedMessages = data.messages
           .map((msg: any) => ({
             _id: msg._id,
             text: msg.text,
             createdAt: new Date(msg.createdAt),
             user: {
               _id: msg.senderId,
               name: msg.senderName || "User",
                avatar: msg.senderAvatar || "https:placeimg.com/140/140/any",
             },
           }))
           .reverse();
         setMessages(formattedMessages);
       }
     });
   } catch (error) {
     console.log("Error listening to messages", error);
   }
 };
```

```bash
 export const sendMessage = async (
   chatId: string,
   user: User,
   receiverId: string,
   message: IMessage
 ) => {
   try {
     await updateDoc(doc(db, "chats", chatId), {
       messages: arrayUnion({
         _id: message._id,
         senderId: user?.uid,
         text: message.text,
         createdAt: Date.now(),
         senderName: user?.displayName,
          senderAvatar: message.user.avatar,
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

         userChatsData.chats[chatIndex].messageId = message._id;
         userChatsData.chats[chatIndex].lastMessage = message.text;
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
```
