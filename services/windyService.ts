"use client";

export interface RecipeResponse {}

export interface Recipe {}

export interface User {}

const GET_RECEIPE_API = "https://windyrecipe.com/recipes/userRecipes";

export const getRecipe = async () => {
  try {
    const response = await fetch(GET_RECEIPE_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          message: "Unauthorised: Session expired.",
        };
      }

      const errorText = response.statusText || (await response.text());
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    return data;
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};
