import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getReports() {
  const snapshot = await getDocs(collection(db, "reports"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}