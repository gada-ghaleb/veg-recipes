import React, { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

export default function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState({});
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }

    const savedDetails = localStorage.getItem("recipeDetails");
    if (savedDetails) {
      setRecipeDetails(JSON.parse(savedDetails));
    }
  }, []);

  const updateRecipes = (searchTerm, data) => {
    setRecipes((prev) => {
      const updatedRecipes = { ...prev, [searchTerm]: data };

      if (JSON.stringify(prev[searchTerm]) !== JSON.stringify(data)) {
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      }

      return updatedRecipes;
    });
  };

  const updateRecipeDetails = (id, details) => {
    setRecipeDetails((prev) => {
      const updatedDetails = { ...prev, [id]: details };

      if (JSON.stringify(prev[id]) !== JSON.stringify(details)) {
        localStorage.setItem("recipeDetails", JSON.stringify(updatedDetails));
      }

      return updatedDetails;
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        updateRecipes,
        recipeDetails,
        updateRecipeDetails,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
