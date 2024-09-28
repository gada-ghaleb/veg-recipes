import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../store/context/RecipeProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Animate } from "../components/Animate";
import {
  BASE_URL,
  API_KEY,
  COMPLEX_SEARCH_ENDPOINT,
} from "../store/api/apiConfig";
import Loading from "../components/Loading";

export default function Homepage({ searchTerm }) {
  const { recipes, updateRecipes } = useContext(RecipeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!recipes[searchTerm]) {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `${BASE_URL}/${COMPLEX_SEARCH_ENDPOINT}`,
            {
              params: {
                apiKey: API_KEY,
                query: searchTerm,
                diet: "vegetarian",
                number: 30,
              },
            }
          );
          const results = response.data.results;
          if (results.length === 0) {
            setError("No recipes found.");
          } else {
            updateRecipes(searchTerm, results);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch recipes. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRecipes();
  }, [searchTerm, recipes, updateRecipes]);

  const recipeList = recipes[searchTerm] || [];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Recipes</h2>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4 xl:gap-x-8">
            {recipeList.map((recipe) => (
              <Link
                to={`/details/${recipe.id}`}
                key={recipe.id}
                className="group"
              >
                <motion.div
                  variants={Animate}
                  initial="hidden"
                  whileInView="show"
                  className=" w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className=" h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </motion.div>
                <motion.h3
                  variants={Animate}
                  initial="hidden"
                  whileInView="show"
                  className="text-md py-2 font-medium text-neutral-800"
                >
                  {recipe.title}
                </motion.h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
