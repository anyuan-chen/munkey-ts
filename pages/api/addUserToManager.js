import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
  getFirebaseAdmin,
} from "next-firebase-auth";

import { getAuth } from "firebase-admin";

const handler = async (req, res) => {
  const db = getFirebaseAdmin().firestore();
  try {
    const delegateName = req.body.delegateName;
    const id = db
      .collection("users")
      .where("delegateName", "==", delegateName)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          return doc.data().uid;
        });
      });
      console.log(id[0])

      

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ success: true });
};

export default handler;
