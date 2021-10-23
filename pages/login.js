// ./pages/demo
import React from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import UnauthNavbar from "../components/navbars/unauthNavbar";

const LoginPage = ({ email }) => {
  const AuthUser = useAuthUser();
  return (
    <div>
      <UnauthNavbar />
      <div className="flex justify-center">
        <form className="w-screen/3 flex flex-col space-y-4">
          <h1 className="text-3xl font-main pt-32">Login</h1>
          <input type="text" className="rounded-lg" placeholder="email"></input>
          <input
            type="password"
            className="rounded-lg"
            placeholder="password"
          ></input>
          <button
            type="submit"
            className="bg-main text-white font-main rounded-lg py-2"
          >
            Enter
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
