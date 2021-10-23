import React from "react";

export default function DarkButton({ submit }) {
  if (submit) {
    return (
      <button
        type="submit"
        className="bg-main text-white font-main rounded-lg py-2"
      ></button>
    );
  } else {
    <button className="bg-main text-white font-main rounded-lg py-2"></button>;
  }
}
