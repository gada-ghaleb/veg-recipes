

export const API_KEY = "7b3c6a5847344402be9149eda8f584ff"



export const BASE_URL = `https://api.spoonacular.com/recipes`;
export const COMPLEX_SEARCH_ENDPOINT = `complexSearch`;
export const getRecipeInformationEndpoint = (recipeId) => `/${recipeId}/information`;
export const getRecipeIngredientsEndpoint = (recipeId) => `/${recipeId}/ingredientWidget.json`;
