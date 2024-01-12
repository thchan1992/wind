"use client";
import { Ingredient } from "@/lib/features/ingredientList/ingredientListSlice";
const apiUrl = "https://api.openai.com/v1/chat/completions";

const prompt = (ingredientList: Ingredient[], seasoningList: string[]) => {
  const foodList = ingredientList
    .map((ingredient) => {
      if (
        ingredient.quantity &&
        ingredient.unit !== "some" &&
        ingredient.unit !== "time"
      ) {
        return `${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredient}`;
      } else if (ingredient.unit === "time") {
        return `${ingredient.quantity} ${ingredient.ingredient}`;
      } else {
        return `some${ingredient.ingredient}`;
      }
    })
    .join(" and ");
  const seasonings = seasoningList
    ? "I already have" + seasoningList.join(", ")
    : "";

  const message = `I have ${foodList} in my fridge, please give me only one recipe that I can utilise my ingredients from my fridge.  ${seasonings}. Please do not use any other ingrendients or seasonings I did not mention. Place your answer into a bullet point and do not give me any introduction to save time. Feel free to tell me you cannot come up with any receipe if the ingredients are not enough, just mention: (no receipe). Your receipe answer should be like: food name: ★(place the step 1 inside this bracket) ★(place the step 1 inside this bracket), etc.`;
  return message;
};
const maxTokens = 500;
const requestData = (ingredientList: Ingredient[], seasoningList: string[]) => {
  console.log(prompt(ingredientList, seasoningList));
  return {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful chef who is good at minimise food wastes.",
      },
      {
        role: "user",
        content: prompt(ingredientList, seasoningList),
      },
    ],
    max_tokens: maxTokens,
  };
};

export const requestRecipe = async (
  ingredientList: Ingredient[],
  seasoningList: string[]
) => {
  requestData(ingredientList, seasoningList);
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_MY_SECURE_KEY;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestData(ingredientList, seasoningList)),
      next: { revalidate: 1000 },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API Response:", data.choices[0].message.content);
    return data.choices[0].message.content;
  } catch (e) {
    console.error(e);
  }
};
