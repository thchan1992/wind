"use client";
import Link from "next/link";
import React from "react";
import { primaryButtonStyle } from "@/util/styles";
import type { RootState } from "../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { deleteIngredientFromList } from "@/lib/features/ingredientList/ingredientListSlice";
import IngredientBoard from "./IngredientBoard";
import { useState } from "react";
import {
  BoardStatus,
  setShowBoard,
} from "@/lib/features/showBoard/showBoardSlice";

import useIngredientList from "../hooks/useIngredientList";
import SeasoningBoard from "./SeasoningBoard";
import { requestRecipe } from "@/services/recipeService";
import { setRecipe } from "@/lib/features/recipe/recipeSlice";
import SavedRecipes from "./SavedRecipes";
import Warning from "./Warning";
import { setIngredientIndex } from "@/lib/features/ingredientIndex/ingredientIndexSlice";
import { setChosenIngredient } from "@/lib/features/chosenIngredient/chosenIngredientSlice";

export default function Ingredients() {
  const dispatch = useDispatch();
  const ingredientList = useIngredientList();

  const seasoningList = useSelector(
    (state: RootState) => state.seasoningList.value
  );

  const auth = useSelector((state: RootState) => state.auth);
  const showBoard = useSelector((state: RootState) => state.showBoard.value);

  const openModal = (): void => {
    const modal = document.getElementById("my_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  const closeModal = (): void => {
    const modal = document.getElementById("my_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  return (
    <div className="relative h-full w-full 2xl:w-1/3 xl:w-1/3 lg:w-1/2 md:w-1/2 flex-col m-2 z-0 ">
      {showBoard === BoardStatus.Closed && (
        // <div className="grid flex-grow card bg-base-300 rounded-box place-items-center overflow-y-scroll h-full ">
        <div className="card bg-base-300 rounded-box min-h-full w-full flex items-center border overflow-auto z-0">
          {ingredientList.length !== 0 ? (
            ingredientList.map((ingredient, i) => {
              {
                return (
                  <div
                    className="card bg-base-100 m-2 w-4/5 h-1/5 border z-0"
                    key={i}
                  >
                    <div className="card-body">
                      <div className="flex">
                        <div className="flex flex-grow m-0.5">
                          {ingredient.ingredient.toUpperCase()}
                          {" = "}
                          {ingredient.quantity} {ingredient.unit.toUpperCase()}
                        </div>
                        <div className="item-center m-0.5">
                          <button
                            className={"btn"}
                            onClick={() => {
                              dispatch(
                                setChosenIngredient(ingredient.ingredient)
                              );
                              dispatch(setIngredientIndex(i));
                              dispatch(
                                setShowBoard(BoardStatus.ModifyIngredientBoard)
                              );
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div className="item-center m-0.5">
                          <button
                            className={"btn"}
                            onClick={() => {
                              dispatch(deleteIngredientFromList(i));
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <h1 className="text-center text-xl m-10">
              No Ingredient. Search an ingredient to start.
            </h1>
          )}
        </div>
      )}
      {showBoard === BoardStatus.SavedRecipesList && <SavedRecipes />}
      {showBoard === BoardStatus.SeasoningBoard && <SeasoningBoard />}
      <div className="flex justify-between m-1 fixed bottom-0 z-0">
        <div role="tablist" className="tabs tabs-boxed  ">
          <a
            role="tab"
            className={
              showBoard === BoardStatus.Closed
                ? "tab tab-active border border-white"
                : "tab border border-white"
            }
            onClick={() => {
              showBoard === BoardStatus.Closed
                ? dispatch(setShowBoard(BoardStatus.Closed))
                : dispatch(setShowBoard(BoardStatus.Closed));
            }}
          >
            Ingredients
          </a>
          <a
            role="tab"
            className={
              showBoard === BoardStatus.SeasoningBoard
                ? "tab tab-active border border-white"
                : "tab border border-white"
            }
            onClick={() => {
              console.log("pressed");
              showBoard !== BoardStatus.SeasoningBoard
                ? dispatch(setShowBoard(BoardStatus.SeasoningBoard))
                : dispatch(setShowBoard(BoardStatus.SeasoningBoard));
            }}
          >
            Seasonings
          </a>
          {auth.isLogin && (
            <a
              role="tab"
              className={
                showBoard === BoardStatus.SavedRecipesList
                  ? "tab tab-active border border-white"
                  : "tab border border-white"
              }
              onClick={() => {
                showBoard === BoardStatus.SavedRecipesList
                  ? dispatch(setShowBoard(BoardStatus.SavedRecipesList))
                  : dispatch(setShowBoard(BoardStatus.SavedRecipesList));
              }}
            >
              Saved Recipes
            </a>
          )}
        </div>
        <button
          disabled={ingredientList.length !== 0 ? false : true}
          className="btn btn-sm m-1 border border-white"
          onClick={async () => {
            const data = await requestRecipe(ingredientList, seasoningList);
            dispatch(setRecipe(data));
          }}
        >
          <Link href="/recipe">Submit</Link>
        </button>
      </div>
      <Warning
        closeModal={closeModal}
        title="Ingredient Error"
        text="No ingredient in the list."
      />
    </div>
  );
}
