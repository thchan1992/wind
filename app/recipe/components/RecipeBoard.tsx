"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "@/lib/store";
import RecipeStep from "./RecipeStep";
export default function RecipeBoard() {
  const [index, setIndex] = useState<number>(0);

  const recipe = useSelector((state: RootState) => state.recipe.value);

  return (
    <div>
      <button
        onClick={() => {
          if (index + 1 <= recipe.length - 1) {
            setIndex(index + 1);
          } else {
            console.log(" the end of recipe ");
          }
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          if (index - 1 >= 0) {
            setIndex(index - 1);
          } else {
            console.log("the index is 0");
          }
        }}
      >
        Previous
      </button>
      {recipe.length !== 0 ? (
        <div>
          <RecipeStep step={recipe[index]} />
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
