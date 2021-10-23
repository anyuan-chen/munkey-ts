import React from "react";
import AuthUserNavbar from "../../components/navbars/authUserNavabar";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
  getFirebaseAdmin,
} from "next-firebase-auth";

const Dashboard = ({ delegateName, resources }) => {
  const resourceArray = resources.map((resource) => {
    return <li> {resource.amount} {resource.name} </li>;
  });
  return (
    <div>
      <AuthUserNavbar delegateName={delegateName}></AuthUserNavbar>
      <main>
        <ul>{resourceArray}</ul>
      </main>
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
  const query = await db
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
  for (const resource in query[0].resources) {
    resourceArray.push({
      name: resource,
      amount: query[0].resources[resource],
    });
  }
  return {
    props: {
      delegateName: query[0].delegateName,
      resources: resourceArray,
    },
  };
});

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(Dashboard);
