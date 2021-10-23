import React, { useState } from "react";
import AdminNavbar from "../../../components/navbars/adminNavbar";
import firebase from "firebase";
import "firebase/auth";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
  getFirebaseAdmin,
} from "next-firebase-auth";

export default function Manager() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const addManager = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const response = await fetch("/api/createManager", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    
    console.log(response); // parses JSON response into native JavaScript objects

    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <div className="flex items-center justify-center">
        <form
          className="flex flex-col w-screen/2 space-y-4"
          onSubmit={addManager}
        >
          <h1 className="text-3xl font-main pt-32">Add A Crisis Manager</h1>
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
          <button
            className="text-white bg-main py-2 font-main rounded-lg"
            type="submit"
          >
            {" "}
            Enter{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
