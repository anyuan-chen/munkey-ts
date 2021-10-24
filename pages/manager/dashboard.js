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
import AdminNavbar from "../../components/navbars/adminNavbar";

const Dashboard = ({ delegateName, resources, messages }) => {
  //resources into list

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
      <AdminNavbar></AdminNavbar>
      <div className="flex items-center ">
        <main className="grid grid-cols-5 h-screen-30 w-screen ">
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
  const usersManaging = await db
    .collection("users")
    .where("email", "==", AuthUser.email)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data().managing;
      });
    });
  var listUsers = [];
//   usersManaging[0].forEach(async (curName) => {
//     let newMessages = await db
//       .collection("private-directives")
//       .where("sender", "==", curName)
//       .get()
//       .then((querySnapshot) => {
//         return querySnapshot.docs.map((doc) => {
//           return doc.data();
//         });
//       })
//       .then((message) => listUsers.concat(message));

//     //console.log(newMessages);
//   });
 usersManaging[0].reduce((a,b) => {
     
 })

  console.log(listUsers);

  return {
    props: {
      messages: listUsers,
    },
  };
});

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(Dashboard);
