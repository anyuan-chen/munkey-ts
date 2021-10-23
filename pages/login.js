// ./pages/demo
import React, { useState } from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import UnauthNavbar from "../components/navbars/unauthNavbar";
import firebase from "firebase/app";
import "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
      });
  };
  return (
    <div>
      <UnauthNavbar />
      <div className="flex justify-center">
        <form className="w-screen/3 flex flex-col space-y-4" onSubmit={login}>
          <h1 className="text-3xl font-main pt-32">Login</h1>
          <input
            type="text"
            className="rounded-lg"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            type="password"
            className="rounded-lg"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button className="text-white bg-main py-2 rounded-lg">
            {" "}
            Enter{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

// Note that this is a higher-order function.
// export const getServerSideProps = withAuthUserTokenSSR({
//   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
// })(async ({ AuthUser, req }) => {
//   return {
//     props: {
//       email: AuthUser.email,
//     },
//   };
// });

const MyLoader = () => <div>Loading...</div>;

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(LoginPage);
