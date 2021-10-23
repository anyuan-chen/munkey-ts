import React from "react";
import Link from "next/link";
import firebase from "firebase";
import { useRouter } from "next/router";
import "firebase/auth";
export default function AuthUserNavbar({ delegateName }) {
  const Router = useRouter();

  const signOut = () => {
    firebase.auth().signOut();
    Router.push("/");
  };
  return (
    <div>
      <nav className="h-32 bg-main grid-cols-5 grid">
        <Link href="/">
          <a className="flex justify-center items-center ">
            <h1 className="text-5xl font-bold text-white font-main">Munkey</h1>
          </a>
        </Link>
        <h2 className="text-3xl font-bold text-supersub font-main flex items-center col-start-2">
          You are: &nbsp; <span className="text-white">{delegateName}</span>
        </h2>
        <button
          className="col-start-5  font-main bg-white my-10 mx-32 rounded-lg"
          onClick={signOut}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
