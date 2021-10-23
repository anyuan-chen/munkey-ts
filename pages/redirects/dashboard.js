import React from "react";
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
  getFirebaseAdmin,
} from "next-firebase-auth";
import firebase from "firebase/app";
import "firebase/firestore";

const DashboardPage = () => {
  return <div>Something went wrong :/</div>;
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  // Optionally, get other props.
  const db = getFirebaseAdmin().firestore();
  var user;
  const query = await db
    .collection("users")
    .where("email", "==", AuthUser.email)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot) {
        return querySnapshot.docs.map((doc) => {
          return doc.data().level;
        });
      }
    });
  if (query[0] === "participant") {
    return {
      redirect: {
        destination: "/participant/dashboard",
        permanent: false,
      },
    };
  } else if (query[0] === "admin") {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
});

export default withAuthUser()(DashboardPage);
