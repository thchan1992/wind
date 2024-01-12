"use client";
import React from "react";

interface RecipeBoardProps {
  step: string;
}

export default function RecipeStep({ step }: RecipeBoardProps) {
  return <div>{step}</div>;
}
