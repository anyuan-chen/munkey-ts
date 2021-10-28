import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  withAuthUserTokenSSR,
  whenUnauthed,
  getFirebaseAdmin,
  AuthAction,
} from "next-firebase-auth";
import AdminNavbar from "../../components/navbars/adminNavbar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Manage({ participants, managers }) {
  const userComponents = participants.map((user) => {
    return (
      <Menu.Item>
        {({ active }) => (
          <button
            className={classNames(
              active ? "bg-gray-100 text-gray-900 w-full" : "text-gray-700",
              "block px-4 py-2 text-sm w-full"
            )}
          >
            {user.delegateName}
          </button>
        )}
      </Menu.Item>
    );
  });

  const managerComponents = managers.map((manager) => {
    return (
      <div className="h-screen/3 border m-4">
        <h2 className="pt-4 pl-4">{manager.email}</h2>
        <Menu as="div" className="relative inline-block text-left pl-4">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              Add A User
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">{userComponents}</div>
            </Menu.Items>
          </Transition>
        </Menu>
        <ul className="pt-2">
          {manager.managing.map((participant) => {
            return <li className="py-4 bg-gray-50 pl-4">{participant}</li>;
          })}
        </ul>
      </div>
    );
  });  
  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <div className="grid grid-cols-3 gap-4">
        {" "}
        <h1 className="text-3xl font-bold font-main col-span-3 m-4">
          Add Delegates to Manage
        </h1>
        {managerComponents}
      </div>
    </div>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const db = getFirebaseAdmin().firestore();
  const participants = await db
    .collection("users")
    .where("level", "==", "participant")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      });
    });
  const managers = await db
    .collection("users")
    .where("level", "==", "manager")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      });
    });
  console.log(managers);
  return {
    props: {
      participants: participants,
      managers: managers,
    },
  };
});
