"use client";
import React from "react";
import { useState } from "react";
import { measurementOpt } from "@/util/constants";
import { useDispatch, useSelector } from "react-redux";
import { primaryButtonStyle } from "@/util/styles";
import type { RootState } from "../../lib/store";

import {
  modifyIngredientFromList,
  setIngredients,
} from "@/lib/features/ingredientList/ingredientListSlice";
import {
  BoardStatus,
  setShowBoard,
} from "../../lib/features/showBoard/showBoardSlice";
import { Ingredient } from "@/lib/features/ingredientList/ingredientListSlice";
import Warning from "./Warning";

interface IngredientBoardProps {
  index: number | null;
}

export default function IngredientBoard({ index }: IngredientBoardProps) {
  const dispatch = useDispatch();
  const showBoard = useSelector((state: RootState) => state.showBoard.value);

  const chosenIngredient = useSelector(
    (state: RootState) => state.chosenIngredient.value
  );

  const ingreidentIndex = useSelector(
    (state: RootState) => state.ingerdientIndex.value
  );
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(0);

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
    <div className="card bg-base-100 shadow-xl  m-1 h-[500px]">
      <div className="card-body">
        <h2 className="card-title">
          <p className="text-center uppercase">
            {unit !== "some"
              ? chosenIngredient + " * " + quantity + " " + unit
              : unit + " " + chosenIngredient}
          </p>
        </h2>
        <div className="flex flex-col">
          <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box m-2 shadow-xl">
            {measurementOpt.map((measurement, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    setUnit(measurement.unit);
                  }}
                >
                  <a>{measurement.label}</a>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-row m-2 ">
            <input
              value={unit === "some" ? 0 : quantity}
              disabled={unit === "some" ? true : false}
              className="input input-bordered w-full"
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                // Check if the value is numeric
                if (/^\d+$/.test(value)) {
                  setQuantity(parseInt(value, 10)); // Parse as integer
                } else {
                  setQuantity(0); // Reset or handle as needed
                }
              }}
            />

            {showBoard === BoardStatus.ModifyIngredientBoard ? (
              <button
                className={"btn m-1"}
                onClick={() => {
                  if (quantity !== 0 || unit !== "") {
                    const newIn: Ingredient = {
                      ingredient: chosenIngredient,
                      unit: unit,
                      quantity: quantity,
                    };
                    dispatch(
                      modifyIngredientFromList({
                        index: ingreidentIndex,
                        ingredient: newIn,
                      })
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
                className={"btn shadow-xl"}
                onClick={() => {
                  console.log(typeof quantity);
                  if (quantity !== 0 && unit !== "") {
                    const newIn: Ingredient = {
                      ingredient: chosenIngredient,
                      unit: unit,
                      quantity: quantity,
                    };
                    dispatch(setIngredients(newIn));
                    dispatch(setShowBoard(BoardStatus.Closed));
                  } else if (unit === "some") {
                    const newIn: Ingredient = {
                      ingredient: chosenIngredient,
                      unit: unit,
                      quantity: 1,
                    };
                    dispatch(setIngredients(newIn));
                    dispatch(setShowBoard(BoardStatus.Closed));
                  } else {
                    openModal();
                  }
                }}
              >
                OK
              </button>
            )}
          </div>
        </div>
        <Warning
          closeModal={closeModal}
          title="Quantity and Unit issue"
          text="Quantity must not be zero, and Unit must be selected."
        />
      </div>
    </div>
  );
}
