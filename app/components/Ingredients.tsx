"use client";
import React from "react";
import { primaryButtonStyle } from "@/util/styles";
import type { RootState } from "../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteIngredientFromList,
  setIngredients,
} from "@/lib/features/ingredientList/ingredientListSlice";
import IngredientBoard from "./IngredientBoard";
import { useState } from "react";
import {
  BoardStatus,
  setShowBoard,
} from "@/lib/features/showBoard/showBoardSlice";
interface Ingredient {
  ingredient: string;
  unit: string;
  quantity: number;
}

export default function Ingredients() {
  const dispatch = useDispatch();
  const ingredientList = useSelector(
    (state: RootState) => state.ingredientList.value
  );
  const showBoard = useSelector((state: RootState) => state.showBoard.value);

  const [ingredientIndex, setIngredientIndex] = useState<number | null>(null);

  return (
    <div className="border-solid border-2 border-indigo-600">
      {ingredientList.map((ingredient, i) => {
        {
          return (
            <div key={i}>
              {ingredient.ingredient} {ingredient.quantity} {ingredient.unit}
              <button
                className={primaryButtonStyle}
                onClick={() => {
                  dispatch(deleteIngredientFromList(i));
                }}
              >
                Delete
              </button>
              <button
                className={primaryButtonStyle}
                onClick={() => {
                  setIngredientIndex(i);
                  dispatch(setShowBoard(BoardStatus.ModifyIngredientBoard));
                }}
              >
                Edit
              </button>
            </div>
          );
        }
      })}
      {showBoard === BoardStatus.ModifyIngredientBoard && (
        <IngredientBoard index={ingredientIndex} />
      )}
    </div>
  );
}
