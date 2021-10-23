import React from "react";
import Link from "next/link";
export default function AuthUserNavbar({ delegateName }) {
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
      </nav>
    </div>
  );
}
