// ./pages/demo
import React from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import UnauthNavbar from "../components/navbars/unauthNavbar";
import Link from "next/link";

const LoginPage = ({ email }) => {
  const AuthUser = useAuthUser();
  return (
    <div>
      <UnauthNavbar></UnauthNavbar>
      <main className="flex justify-center">
        <div className="w-screen/2 flex flex-col space-y-4">
          <h1 className="text-3xl pt-32">I am a(n)</h1>
          <button className="bg-main text-white font-main rounded-lg py-2">
            <Link href="/login">participant</Link>
          </button>
          <button className="bg-main text-white font-main rounded-lg py-2">
            <Link href="/login">administrator</Link>
          </button>
        </div>
      </main>
    </div>
  );
};

// Note that this is a higher-order function.

export default withAuthUser()(LoginPage);
