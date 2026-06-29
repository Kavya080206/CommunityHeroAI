import {
  doc,
  updateDoc,
  increment
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const voteReport = async (id: string) => {
  const reportRef = doc(db, "reports", id);

  await updateDoc(reportRef, {
    votes: increment(1),
  });
};