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

export default function Participant() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [delegateName, setDelegateName] = useState("");
  const [curResourceAmt, setCurResourceAmt] = useState();
  const [curResourceName, setCurResourceName] = useState();
  const [resources, setResources] = useState([]);

  const addResource = (event) => {
    event.preventDefault();
    setResources(
      resources.concat([{ amount: curResourceAmt, name: curResourceName }])
    );
    setCurResourceAmt("");
    setCurResourceName("");
  };
  const addManager = async (event) => {
    event.preventDefault();
    if (curResourceName !== "") {
      setResources(
        resources.concat([{ amount: curResourceAmt, name: curResourceName }])
      );
    }
    const data = {
      email: email,
      password: password,
      resources: resources,
      delegateName: delegateName,
    };
    const response = await fetch("/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    console.log(response); // parses JSON response into native JavaScript objects

    setEmail("");
    setPassword("");
    setDelegateName("");
    setResources([]);
    setCurResourceAmt("");
    setCurResourceName("");
  };
  const resourceComponents = resources.map((resource, index) => {
    return (
      <li className="grid grid-cols-2 gap-4">
        <input type="text" className="rounded-lg" value={resource.name}></input>
        <input
          type="text"
          className="rounded-lg"
          value={resource.amount}
        ></input>
      </li>
    );
  });
  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <div className="flex items-center justify-center">
        <form
          className="flex flex-col w-screen/2 space-y-4"
          onSubmit={addManager}
        >
          <h1 className="text-3xl font-main pt-32">Add A Participant</h1>
          <h2 className="text-xl font-main">Basic Information</h2>
          <input
            type="text"
            className="rounded-lg"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            type="text"
            className="rounded-lg"
            placeholder="delegate name"
            value={delegateName}
            onChange={(event) => setDelegateName(event.target.value)}
          ></input>
          <input
            type="password"
            className="rounded-lg"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <div className="flex justify-between pt-4">
            <h2 className="text-xl font-main"> Resource Information</h2>
            <button
              className="border rounded-xl border-black px-4 "
              onClick={addResource}
            >
              Add
            </button>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                className="rounded-lg"
                placeholder="resource name"
                value={curResourceName}
                onChange={(event) => setCurResourceName(event.target.value)}
              ></input>
              <input
                type="text"
                className="rounded-lg"
                placeholder="resource amount"
                value={curResourceAmt}
                onChange={(event) => setCurResourceAmt(event.target.value)}
              ></input>
            </div>
            <ul className="space-y-4 pt-4">{resourceComponents}</ul>
          </div>
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
