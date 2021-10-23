import React from "react";
import Link from "next/link";
export default function UnauthNavbar() {
  return (
    <div>
      <nav className="h-32 bg-main grid-cols-5 grid">
        <Link href="/">
          <a className="flex justify-center items-center ">
            <h1 className="text-5xl text-white font-main">Munkey</h1>
          </a>
        </Link>
      </nav>
    </div>
  );
}
