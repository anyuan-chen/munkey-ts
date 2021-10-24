import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
  getFirebaseAdmin,
} from "next-firebase-auth";

import { getAuth } from "firebase-admin";

const handler = async (req, res) => {
  console.log("hidsfds");
  const db = getFirebaseAdmin().firestore();
  try {
    getFirebaseAdmin()
      .auth()
      .createUser({
        email: req.body.email,
        password: req.body.password,
      })
      .then((userRecord) => {
        db.collection("users")
          .doc(userRecord.uid)
          .set({
            email: req.body.email,
            level: "participant",
            delegateName: req.body.delegateName,
            resources: req.body.resources,
            id: Math.random().toString(36).slice(2),
          });
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ success: true });
};

export default handler;
