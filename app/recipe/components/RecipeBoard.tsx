"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "@/lib/store";
import RecipeStep from "./RecipeStep";
import Link from "next/link";
import { FacebookShareButton, FacebookIcon } from "next-share";
import { TwitterShareButton, TwitterIcon } from "next-share";
import { WhatsappShareButton, WhatsappIcon } from "next-share";
export default function RecipeBoard() {
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
          <button
            onClick={() => {
              saveRecipe();
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div>loading</div>
      )}
      <button>
        <Link href="/">go back</Link>
      </button>
      <button
        onClick={() => {
          navigator.clipboard.writeText(recipeForSaving);
        }}
      >
        COPY
      </button>
      <FacebookShareButton url={recipeForSaving}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={recipeForSaving}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={recipeForSaving}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
