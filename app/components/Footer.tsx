"use client";

import {
  BoardStatus,
  setShowBoard,
} from "@/lib/features/showBoard/showBoardSlice";
import { requestRecipe } from "@/services/recipeService";
import useIngredientList from "../hooks/useIngredientList";
import type { RootState } from "../../lib/store";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setRecipe } from "@/lib/features/recipe/recipeSlice";
export default function Footer() {
  const seasoningList = useSelector(
    (state: RootState) => state.seasoningList.value
  );
  const ingredientList = useIngredientList();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const showBoard = useSelector((state: RootState) => state.showBoard.value);
  return (
    <div className="flex justify-between absolute bottom-0">
      {/* <div role="tablist" className="tabs tabs-boxed  ">
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
          Sesasonings
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
      </button> */}

      {/* tab */}
      <div className="btm-nav">
        <button
          className={
            showBoard === BoardStatus.Closed
              ? "active bg-blue-200 text-blue-600 border-blue-600"
              : " bg-blue-200 text-blue-600 border-blue-600"
          }
          onClick={() => {
            showBoard === BoardStatus.Closed
              ? dispatch(setShowBoard(BoardStatus.Closed))
              : dispatch(setShowBoard(BoardStatus.Closed));
          }}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M14 11H8M10 15H8M16 7H8M20 10.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H11.5M22 22L20.5 20.5M21.5 18C21.5 19.933 19.933 21.5 18 21.5C16.067 21.5 14.5 19.933 14.5 18C14.5 16.067 16.067 14.5 18 14.5C19.933 14.5 21.5 16.067 21.5 18Z"
              // stroke="black"
              strokeWidth="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span className="btm-nav-label">Ingredients</span>
        </button>
        <button
          className={
            showBoard === BoardStatus.SeasoningBoard
              ? "active bg-teal-200 text-teal-600"
              : " bg-teal-200 text-teal-600"
          }
          onClick={() => {
            showBoard !== BoardStatus.SeasoningBoard
              ? dispatch(setShowBoard(BoardStatus.SeasoningBoard))
              : dispatch(setShowBoard(BoardStatus.SeasoningBoard));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z"
              // stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>

          <span className="btm-nav-label">Season</span>
        </button>
      </div>
    </div>
  );
}
