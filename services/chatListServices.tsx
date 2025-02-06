import { db } from "@/firebaseConfig";
import {
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

export const retrieveChatLists = async (user: { uid: string } | null) => {
  try {
    if (!user?.uid) return [];

    onSnapshot(doc(db, "userchatrooms", user.uid), async (res) => {
      const items = res.data()?.chats;
      console.log("items", items);

      const promises = items.map(async (item: any) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        console.log("user", user);

        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
      console.log("chatData", chatData);

      return chatData;
    });
  } catch (error) {
    console.error("Error retrieving chat lists", error);
    return [];
  }
};
