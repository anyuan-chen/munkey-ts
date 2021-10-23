import firebase from "firebase";
import "firebase/auth";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
  getFirebaseAdmin,
} from "next-firebase-auth";
import { useRouter } from "next/router";

function Message({ message }) {
  return <div>{message.id}</div>;
}

const MyLoader = () => {
  return <div>Loading</div>;
};

export async function getStaticPaths() {
  const db = getFirebaseAdmin().firestore();
  const messageQuery = await db
    .collection("private-directives")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      });
    });
  //console.log(messageQuery);
  const paths = messageQuery.map((message) => ({
    params: {
      message: message.id,
    },
  }));
  //console.log(paths);
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { message } }) {
  console.log(message);
  const db = getFirebaseAdmin().firestore();
  const messageSentQuery = await db
    .collection("private-directives")
    .where("id", "==", message)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      });
    });

  return {
    props: {
      message: messageSentQuery[0],
    },
  };
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(Message);
