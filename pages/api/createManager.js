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
  try {

    getAuth()
      .createUser({
        email: req.body.email,
        password: req.body.password,
      })
      .then((userRecord) => {
        db.collection("users").doc(userRecord.uid).set({
          email: req.body.email,
          level: "manager",
          delegateName: null,
        });
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ success: true });
};

export default handler;
