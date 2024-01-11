"use client";
import React from "react";
import { useState } from "react";
import { measurementOpt } from "@/util/constants";
import { useDispatch } from "react-redux";
import { primaryButtonStyle } from "@/util/styles";
import type { RootState } from "../../lib/store";
import { useSelector } from "react-redux";
import {
  modifyIngredientFromList,
  setIngredients,
} from "@/lib/features/ingredientList/ingredientListSlice";
import {
  BoardStatus,
  setShowBoard,
} from "../../lib/features/showBoard/showBoardSlice";
import { Ingredient } from "@/lib/features/ingredientList/ingredientListSlice";

interface IngredientBoardProps {
  index: number | null;
}

export default function IngredientBoard({ index }: IngredientBoardProps) {
  const dispatch = useDispatch();

  const chosenIngredient = useSelector(
    (state: RootState) => state.chosenIngredient.value
  );

  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="border-solid border-2 border-indigo-600">
      {chosenIngredient!} * {quantity} {unit}
      {measurementOpt.map((measurement, i) => {
        return (
          <div key={i}>
            <button
              className={primaryButtonStyle}
              onClick={() => {
                setUnit(measurement.unit);
              }}
            >
              {measurement.label}
            </button>
          </div>
        );
      })}
      <input
        type="number"
        onChange={(e) => {
          setQuantity(parseInt(e.target.value));
        }}
      ></input>
      {index !== null ? (
        <button
          className={primaryButtonStyle}
          onClick={() => {
            if (quantity !== 0 || unit !== "") {
              const newIn: Ingredient = {
                ingredient: chosenIngredient,
                unit: unit,
                quantity: quantity,
              };
              dispatch(
                modifyIngredientFromList({ index: index, ingredient: newIn })
              );
              dispatch(setShowBoard(BoardStatus.Closed));
            } else {
              console.log("please insert quantity and unit");
            }
          }}
        >
          Modify
        </button>
      ) : (
        <button
          className={primaryButtonStyle}
          onClick={() => {
            if (quantity !== 0 || unit !== "") {
              const newIn: Ingredient = {
                ingredient: chosenIngredient,
                unit: unit,
                quantity: quantity,
              };
              dispatch(setIngredients(newIn));
              dispatch(setShowBoard(BoardStatus.Closed));
            } else {
              console.log("please insert quantity and unit");
            }
          }}
        >
          OK
        </button>
      )}
    </div>
  );
}
