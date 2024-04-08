import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import {
  Ingredient,
  setIngredients,
} from "@/lib/features/ingredientList/ingredientListSlice";

const useIngredientList = () => {
  const dispatch = useDispatch();
  const ingredientList = useSelector(
    (state: RootState) => state.ingredientList.value
  );

  useEffect(() => {
    try {
      const localData = localStorage.getItem("ingredientList");
      if (localData) {
        const ingredients: Ingredient[] = JSON.parse(localData);
        // if (ingredientList.length === 0) {
        //   ingredients.forEach((ingredient) => {
        //     dispatch(setIngredients(ingredient));
        //   });
        // }
      }
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, ingredientList]);

  useEffect(() => {
    console.log(ingredientList, " saving the ingredient list");
    try {
      localStorage.setItem("ingredientList", JSON.stringify(ingredientList));
    } catch (e) {
      console.error(e);
    }
  }, [ingredientList]);

  return ingredientList;
};

export default useIngredientList;
