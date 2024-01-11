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
const Search = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.keyword.value);
  const showBoard = useSelector((state: RootState) => state.showBoard.value);

  const ingredientSearchRes = useSelector(
    (state: RootState) => state.ingredientSearchRes.value
  );

  return (
    <div className="border-solid border-2 border-indigo-600">
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          dispatch(keywordOnChange(e.target.value));
        }}
      />
      <button
        className={primaryButtonStyle}
        onClick={async () => {
          if (keyword !== "") {
            const res = await requestIngredient(keyword);
            dispatch(deleteKeyword());
            dispatch(ingredientSearchResOnChange(res));
          } else {
            console.log("no keyword is detected");
          }
        }}
      >
        Search
      </button>

      {ingredientSearchRes.map((obj, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              dispatch(ingredientSearchResOnChange([]));
              dispatch(setChosenIngredient(obj));
              dispatch(setShowBoard(BoardStatus.IngredientBoard));
            }}
          >
            {obj}
          </div>
        );
      })}
      {showBoard === BoardStatus.IngredientBoard && (
        <IngredientBoard index={null} />
      )}
    </div>
  );
};

export default Search;
