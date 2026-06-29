import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function saveReport(report: any) {
  try {
    const docRef = await addDoc(collection(db, "reports"), {
      ...report,
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}