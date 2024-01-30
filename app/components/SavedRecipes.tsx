"use client";
import { setRecipe } from "@/lib/features/recipe/recipeSlice";
import { requestRecipe } from "@/services/recipeService";
import { deleteRecipe, getRecipe } from "@/services/windyService";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function SavedRecipes() {
  interface RecipeListResponse {
    title: string;
    steps: string;
    _id: string;
  }
  const dispatch = useDispatch();
  const [recipeOpt, setRecipeOpt] = useState<RecipeListResponse[] | []>([]);


  useEffect(() => {
    // const localData = localStorage.getItem("recipes");
    // let recipeList: string[] = localData ? JSON.parse(localData) : [];
    // setRecipeOpt(recipeList);

    getRecipe().then((res: RecipeListResponse[]) => {
      console.log(res);
      // const recipes = res.map((obj: RecipeListResponse) => {
      //   console.log(obj.title);
      //   return { id: obj._id, recipe: obj.title.concat("★" + obj.steps + "★") };
      // });
      console.log(res);
      setRecipeOpt(res);
    });
  }, []);

  useEffect(() => {});

  const handleDelete = async (recipeId: string) => {
    const res = await deleteRecipe(recipeId);
    if (res?.success) {
      console.log("Recipe deleted");
      const newArr = recipeOpt.filter((obj) => {
        return obj._id !== recipeId;
      });

      setRecipeOpt(newArr);
    } else {
      console.log("Log in failed.");
    }
  };

  return (
    <div className="overflow-y-scroll h-[500px]">
      {recipeOpt.map((obj, i) => {
        return (
          <div
            className="card w-full bg-base-100 shadow-xl m-1"
            key={i}
            onClick={() => {
              dispatch(setRecipe(obj.title.concat("★" + obj.steps)));
            }}
          >
            <div className="card-body">
              <h2 className="card-title">{obj.title}</h2>
              <p>{obj.steps.split("★")[0].slice(0, 50)} ...</p>
              <div className="card-actions justify-end">
                <Link href="/recipe">
                  <button className="btn btn-primary">Check it out</button>
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleDelete(obj._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
