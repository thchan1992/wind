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
    const localData = localStorage.getItem("ingredientList");
    if (localData) {
      const ingredients: Ingredient[] = JSON.parse(localData);
      ingredients.forEach((ingredient) => {
        dispatch(setIngredients(ingredient));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("ingredientList", JSON.stringify(ingredientList));
  }, [ingredientList]);

  return ingredientList;
};

export default useIngredientList;
