"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../lib/store";
import {
  keywordOnChange,
  deleteKeyword,
} from "@/lib/features/keyword/keywordSlice";
import IngredientBoard from "./IngredientBoard";
import { requestIngredient } from "@/services/ingredientService";
import { ingredientSearchResOnChange } from "@/lib/features/ingredientSearchRes/ingredientSearchResSlice";
import { useState } from "react";
import { setChosenIngredient } from "@/lib/features/chosenIngredient/chosenIngredientSlice";
import {
  BoardStatus,
  setShowBoard,
} from "@/lib/features/showBoard/showBoardSlice";
import { primaryButtonStyle } from "@/util/styles";
import SavedRecipes from "./SavedRecipes";
import { useEffect } from "react";
import Warning from "./Warning";
import { setRecipe } from "@/lib/features/recipe/recipeSlice";
const Search = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.keyword.value);
  const showBoard = useSelector((state: RootState) => state.showBoard.value);
  const ingredientList = useSelector(
    (state: RootState) => state.ingredientList.value
  );
  const ingredientSearchRes = useSelector(
    (state: RootState) => state.ingredientSearchRes.value
  );

  const ingredientIndex = useSelector(
    (state: RootState) => state.ingerdientIndex.value
  );
  const openModal = (): void => {
    const modal = document.getElementById("my_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  useEffect(() => {
    dispatch(setRecipe(""));
  }, []);

  const closeModal = (): void => {
    const modal = document.getElementById("my_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  return (
    <div className="w-screen 2xl:w-1/3 xl:w-1/3 lg:w-1/2 md:w-1/2 flex-col ">
      {showBoard === BoardStatus.Closed ? (
        <>
          <div className="navbar bg-base-100 shadow-xl rounded-custom">
            <div className="flex-1 items-center justify-center space-x-2 m-1">
              <input
                className="input input-bordered w-full"
                type="text"
                value={keyword}
                onChange={(e) => {
                  dispatch(keywordOnChange(e.target.value));
                }}
              />
              <button
                className="btn btn-active btn-neutral shadow-xl"
                onClick={async () => {
                  if (keyword !== "" && ingredientList.length < 10) {
                    const res = await requestIngredient(keyword);
                    dispatch(deleteKeyword());
                    dispatch(ingredientSearchResOnChange(res));
                  } else {
                    openModal();
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div className="relative">
            {ingredientSearchRes.length !== 0 && (
              <div className="card bg-base-100 shadow-xl m-1 absolute top-0 left-0 z-10 w-full">
                <div className="card-body">
                  <h2 className="card-title">
                    <p className="text-center uppercase">Ingredients</p>
                  </h2>

                  <div className="overflow-x-auto overflow-y-scroll h-[400px]">
                    <table className="table">
                      <thead></thead>
                      <tbody>
                        {ingredientSearchRes.map((obj, i) => {
                          return (
                            <tr
                              key={i}
                              onClick={() => {
                                dispatch(ingredientSearchResOnChange([]));
                                dispatch(setChosenIngredient(obj));
                                dispatch(
                                  setShowBoard(BoardStatus.IngredientBoard)
                                );
                              }}
                            >
                              <th>{i + 1}</th>
                              <th className="text-wrap">{obj}</th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="navbar bg-base-100 shadow-xl rounded-custom">
          <div className="flex-1 items-center justify-center space-x-2 m-1">
            <h1>Good-Bye-Stale</h1>
          </div>
        </div>
      )}

      {showBoard === BoardStatus.IngredientBoard && (
        <IngredientBoard index={null} />
      )}
      {showBoard === BoardStatus.ModifyIngredientBoard && (
        <IngredientBoard index={ingredientIndex} />
      )}
      <div>
        <Warning
          closeModal={closeModal}
          title="Search Error"
          text="No Keyword or You already have 10 ingredients in your list."
        />
      </div>
    </div>
  );
};

export default Search;
