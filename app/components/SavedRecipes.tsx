"use client";
import { setRecipe } from "@/lib/features/recipe/recipeSlice";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function SavedRecipes() {
  const dispatch = useDispatch();
  const [recipeOpt, setRecipeOpt] = useState<string[] | []>([]);

  useEffect(() => {
    const localData = localStorage.getItem("recipes");
    let recipeList: string[] = localData ? JSON.parse(localData) : [];
    setRecipeOpt(recipeList);
  }, []);

  return (
    <div>
      SavedRecipes
      {recipeOpt.map((obj, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              dispatch(setRecipe(obj));
            }}
          >
            <Link href="/recipe">{obj.slice(0, 20)} ...</Link>
          </div>
        );
      })}
    </div>
  );
}
