"use client";

export interface RecipeResponse {}

export interface Recipe {}

export interface User {}

const GET_RECEIPE_API = "https://windyrecipe.com/recipes/userRecipes";
const ADD_RECEIPE_API = "https://windyrecipe.com/recipes/add";
const DELETE_RECEIPE_API = "https://windyrecipe.com/recipes/delete/";
const DEV_GET_RECEIPE_API = "http://localhost:3001/recipes/userRecipes";

export const addRecipe = async (recipe: string) => {
  const stepsArray = recipe.split("★");
  const data = {
    title: stepsArray[0],
    steps: stepsArray.slice(1).join("★"),
  };

  console.log(data);

  try {
    // const data = {};
    const response = await fetch(ADD_RECEIPE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          message: "Unauthorised: Incorrect email or password.",
        };
      }

      const errorText = response.statusText || (await response.text());
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    // the status is in the range 200–299
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecipe = async (recipeId: string) => {
  try {
    const response = await fetch(DELETE_RECEIPE_API + recipeId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          message: "Unauthorised: Incorrect email or password.",
        };
      }

      const errorText = response.statusText || (await response.text());
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    // the status is in the range 200–299
    return {
      success: true,
    };
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

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
