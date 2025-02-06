import { db } from "@/firebaseConfig";
import {
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

export const retrieveChatLists = async (user: { uid: string } | null, setChats: (chats: any[]) => void) => {
  if (!user) return;

  return onSnapshot(
    doc(db, "userchatrooms", user.uid),
    async (res) => {
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
    }
  );
};
