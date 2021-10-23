import React from "react";
import AuthUserNavbar from "../../components/navbars/authUserNavabar";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
  getFirebaseAdmin,
} from "next-firebase-auth";
import Link from "next/link";

const Dashboard = ({ delegateName, resources, messages }) => {
  //resources into list
  const resourceArray = resources.map((resource) => {
    return (
      <li className="font-main">
        <span className="font-semibold">{resource.amount}</span> {resource.name}
      </li>
    );
  });

  const messagesArray = messages.map((message) => {
    if (message.read) {
      return (
        <Link href={`/messages/${message.id}`}>
          <a>
            <div className="py-2 ">
              <li className="font-main">{message.subject}</li>
            </div>
          </a>
        </Link>
      );
    } else {
      return (
        <Link href={`/messages/${message.id}`}>
          <a>
            <div className="py-4 shadow rounded-2xl">
              <li className="font-main px-2">{message.subject}</li>
            </div>
          </a>
        </Link>
      );
    }
  });
  return (
    <div>
      <AuthUserNavbar delegateName={delegateName}></AuthUserNavbar>
      <div className="flex items-center ">
        <main className="grid grid-cols-5 h-screen-30 w-screen ">
          <div className="m-5 flex flex-col items-center">
            <h2 className="text-2xl font-main font-semibold pb-4">
              Your Resources:{" "}
            </h2>

            <ul className="  flex flex-col p-8 border space-y-4 rounded-2xl">
              {resourceArray}
            </ul>
          </div>
          <div className="col-span-4 my-5 mr-5 col-start-2">
            <h2 className="text-2xl font-main font-semibold pb-4">
              Your Messages:{" "}
            </h2>
            <div className="border rounded-2xl overflow-y-scroll h-screen-30">
              <ul>{messagesArray}</ul>
            </div>
            <button className="font-thin bg-main rounded-full px-8 py-2 text-white mt-2">
              Create
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
const MyLoader = () => {
  <div>
    <h1>Loading</h1>
  </div>;
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  //fetching the user information (delegate name, resources)
  const db = getFirebaseAdmin().firestore();
  const userquery = await db
    .collection("users")
    .where("email", "==", AuthUser.email)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      });
    });

  //converting resources from object to array
  const resourceArray = [];
  for (const resource in userquery[0].resources) {
    resourceArray.push({
      name: resource,
      amount: userquery[0].resources[resource],
    });
  }

  const messageSentQuery = await db
    .collection("private-directives")
    .where("reciepient", "==", AuthUser.email)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      });
    });

  const messageRecievedQuery = await db
    .collection("private-directives")
    .where("sender", "==", AuthUser.email)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      });
    });


  return {
    props: {
      delegateName: userquery[0].delegateName,
      resources: resourceArray,
      messages: messageSentQuery.concat(messageRecievedQuery),
    },
  };
});

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(Dashboard);
