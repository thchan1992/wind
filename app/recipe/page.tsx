import React from "react";
import RecipeBoard from "./components/RecipeBoard";

export default function page() {
  return (
    <div className={"flex flex-col items-center p-5 h-screen"}>
      <RecipeBoard />
    </div>
  );
}
