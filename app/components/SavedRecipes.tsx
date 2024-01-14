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
    <div className="overflow-y-scroll h-[500px]">
      {recipeOpt.map((obj, i) => {
        return (
          <div
            className="card w-full bg-base-100 shadow-xl m-1"
            key={i}
            onClick={() => {
              dispatch(setRecipe(obj));
            }}
          >
            <div className="card-body">
              <h2 className="card-title">{obj.split("★")[0]}</h2>
              <p>{obj.split("★")[1].slice(0, 50)} ...</p>
              <div className="card-actions justify-end">
                <Link href="/recipe">
                  <button className="btn btn-primary">Check it out</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
