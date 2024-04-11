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
      {/* <div className="h-screen flex flex-col m-2 z-0"> */}
      {showBoard === BoardStatus.Closed && (
        // <div className="grid flex-grow card bg-base-300 rounded-box place-items-center overflow-y-scroll h-full ">
        // <div className="card bg-base-300 rounded-box min-h-full w-full flex items-center overflow-auto z-0">
        <div className=" overflow-y-auto justify-items-center mb-96 h-full   ">
          {ingredientList.length !== 0 ? (
            ingredientList.map((ingredient, i) => {
              {
                return (
                  <div
                    className="rounded-lg m-4 bg-base-300 shadow-md border border-red-100"
                    key={i}
                  >
                    <div className="card-body">
                      <div className="flex">
                        <div className="flex flex-grow m-0.5">
                          {ingredient.ingredient.toUpperCase()}
                          {" = "}
                          {ingredient.quantity} {ingredient.unit.toUpperCase()}
                        </div>
                        <div className="item-center m-0.5 ">
                          <button
                            className={"btn border border-red-100"}
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
                            className={"btn border border-red-100"}
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
            <h1 className="text-center text-xl m-10">No ingredient</h1>
          )}
          {ingredientList.length > 0 && (
            <div className="flex justify-center">
              <button
                disabled={ingredientList.length !== 0 ? false : true}
                className="btn btn-sm m-1 w-1/2 mb-8 shadow-md"
                onClick={async () => {
                  const data = await requestRecipe(
                    ingredientList,
                    seasoningList
                  );
                  dispatch(setRecipe(data));
                }}
              >
                <Link href="/recipe">Submit</Link>
              </button>
            </div>
          )}
        </div>
      )}
      {showBoard === BoardStatus.SavedRecipesList && <SavedRecipes />}
      {showBoard === BoardStatus.SeasoningBoard && <SeasoningBoard />}
      {/* <div className="flex justify-between m-1 fixed bottom-0 z-0">
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
      </div> */}
      <Warning
        closeModal={closeModal}
        title="Ingredient Error"
        text="No ingredient in the list."
      />
    </div>
  );
}
