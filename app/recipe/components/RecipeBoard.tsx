"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "@/lib/store";
import RecipeStep from "./RecipeStep";
import Link from "next/link";
import { FacebookShareButton, FacebookIcon } from "next-share";
import { TwitterShareButton, TwitterIcon } from "next-share";
import { WhatsappShareButton, WhatsappIcon } from "next-share";
import { back, copy, previous, save, next, divider } from "@/assets/icons";
import { setRecipe } from "@/lib/features/recipe/recipeSlice";

export default function RecipeBoard() {
  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(0);

  const recipe = useSelector((state: RootState) => state.recipe.value).split(
    "★"
  );

  const recipeForSaving = useSelector((state: RootState) => state.recipe.value);
  const saveRecipe = () => {
    // localStorage.removeItem("recipes");
    try {
      const localData = localStorage.getItem("recipes");
      let recipeList: string[] = localData ? JSON.parse(localData) : [];
      console.log(recipeList, "recipeList");
      if (!recipeList.includes(recipeForSaving)) {
        recipeList.push(recipeForSaving);
        localStorage.setItem("recipes", JSON.stringify(recipeList));
        console.log("Recipe saved");
      } else {
        console.log("Same recipe exists");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (recipeForSaving === "") {
    return (
      <div className="h-screen">
        <button className="btn">
          <span className="loading loading-spinner"></span>
          Loading
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen 2xl:w-1/3 xl:w-1/3 lg:w-1/2 md:w-1/2 flex-col m-2">
      <div className="grid flex-grow card bg-base-300 rounded-box place-items-center overflow-y-scroll h-[500px]">
        <div className="card bg-base-100 shadow-xl m-2 w-5/6 h-[300px]  overflow-y-scroll">
          <div className="card-body text-wrap">
            <RecipeStep step={recipe[index]} />
          </div>
          <div className="flex justify-center m-1">
            <button
              className="btn btn-circle btn-accent m-1"
              onClick={() => {
                if (index - 1 >= 0) {
                  setIndex(index - 1);
                } else {
                  console.log("the index is 0");
                }
              }}
            >
              {previous}
            </button>
            <button
              className="btn btn-circle btn-accent m-1"
              onClick={() => {
                if (index + 1 <= recipe.length - 1) {
                  setIndex(index + 1);
                } else {
                  console.log(" the end of recipe ");
                }
              }}
            >
              {next}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <button className="btn btn-warning">
            <Link href="/">{back}Back</Link>
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              saveRecipe();
            }}
          >
            {save}
            Save
          </button>
        </div>
        <div className="flex flex-col w-full p-1">
          <div className="divider divider-error">Share</div>
        </div>
        <div className="flex items-center p-2">
          <button
            className="btn btn-circle btn-success"
            onClick={() => {
              navigator.clipboard.writeText(recipeForSaving);
            }}
          >
            {copy}
          </button>
          <FacebookShareButton url={recipeForSaving}>
            <FacebookIcon size={48} round />
          </FacebookShareButton>
          <TwitterShareButton url={recipeForSaving}>
            <TwitterIcon size={48} round />
          </TwitterShareButton>
          <WhatsappShareButton url={recipeForSaving}>
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
}
