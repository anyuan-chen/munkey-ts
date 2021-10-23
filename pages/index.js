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
import { useRouter } from "next/router";

const HomePage = ({ email }) => {
  const router = useRouter();

  return (
    <div>
      <UnauthNavbar></UnauthNavbar>
      <main className="flex justify-center">
        <div className="w-screen/2 flex flex-col space-y-4">
          <h1 className="text-3xl pt-32">I am a(n)</h1>
          <Link href="/login">
            <button className="bg-main rounded-lg py-2 font-main text-white">
              participant
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-main rounded-lg py-2 font-main text-white">
              administrator
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

// Note that this is a higher-order function.

export default withAuthUser()(HomePage);
