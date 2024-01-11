"use client";

// import { useSelector, useDispatch } from "react-redux";

export const requestIngredient = async (ingr: string) => {
  //   const dispatch = useDispatch();
  try {
    const nutritionType = "cooking";
    const app_id = process.env.NEXT_PUBLIC_FOOD_APP_ID;
    const app_key = process.env.NEXT_PUBLIC_FOOD_APP_KEY;
    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${ingr}&nutrition-type=${nutritionType}`,
      { method: "GET", next: { revalidate: 1000 } }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const res = handleIngredientRes(data.hints);
    return res;
  } catch (e) {
    console.error("Error fetching ingredient data: ", e);
    return [];
  }
};

const handleIngredientRes = (list: any[]): any[] => {
  // Replace 'any' with more specific types if possible
  return list.map((obj: any) => obj.food.knownAs); // Again, replace 'any' with a specific type
};
