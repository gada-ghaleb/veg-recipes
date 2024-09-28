import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { RecipeContext } from "../store/context/RecipeProvider";
import RecipeDetails from "../pages/RecipeDetails";
import RecipeInfo from "../pages/RecipeInfo";
import {
  BASE_URL,
  API_KEY,
  getRecipeInformationEndpoint,
} from "../store/api/apiConfig";

const Layout = ({ children }) => {
  const { recipeId } = useParams();
  const { recipeDetails, updateRecipeDetails } = useContext(RecipeContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!recipeDetails[recipeId]) {
        setLoading(true);
        try {
          const { data } = await axios.get(
            `${BASE_URL}/${getRecipeInformationEndpoint(recipeId)}`,
            {
              params: { apiKey: API_KEY },
            }
          );
          updateRecipeDetails(recipeId, data);
        } catch (error) {
          console.error(
            "Errore nel recupero dei dettagli della ricetta:",
            error
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecipeDetails();
  }, [recipeId, recipeDetails, updateRecipeDetails]);
  const details = recipeDetails[recipeId];
  if (loading) {
    return <div className="mt-10 text-center text-black">Loading...</div>;
  }

  if (!details) {
    return (
      <div className="mt-10 text-center text-black">
        No details available for this recipe.
      </div>
    );
  }

  return (
    <div>
      <RecipeInfo details={details} />
      {children}
      <RecipeDetails details={details} />
    </div>
  );
};
export default Layout;
