import { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext } from "../store/context/RecipeProvider";
import { Animate } from "../components/Animate";
import { motion } from "framer-motion";

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const { recipeDetails } = useContext(RecipeContext);

  const details = recipeDetails[recipeId] || {};

  if (!details?.extendedIngredients?.length) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="bg-neutral-30 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className=" flex flex-col lg:flex-row justify-around">
            <div className="my-8">
              <motion.h2
                variants={Animate}
                initial="hidden"
                whileInView="show"
                className="text-2xl font-medium mb-5 "
              >
                Ingredients :
              </motion.h2>
              {details.extendedIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex border-b-2 border-neutral-200 pb-2"
                >
                  <motion.p
                    variants={Animate}
                    initial="hidden"
                    whileInView="show"
                    className="text-md font-normal text-neutral-800"
                  >
                    {ingredient.measures.metric.amount}
                  </motion.p>
                  <motion.p
                    variants={Animate}
                    initial="hidden"
                    whileInView="show"
                    className="text-md ml-1 font-normal text-neutral-800"
                  >
                    {ingredient.measures.metric.unitShort}
                  </motion.p>
                  <motion.p
                    variants={Animate}
                    initial="hidden"
                    whileInView="show"
                    className="text-md ml-2 font-normal text-neutral-800"
                  >
                    {ingredient.name}
                  </motion.p>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-1/2 my-8 text-md font-normal text-neutral-800">
              <motion.h2
                variants={Animate}
                initial="hidden"
                whileInView="show"
                className=" text-2xl font-medium mb-5"
              >
                Instructions:
              </motion.h2>
              <motion.div
                variants={Animate}
                initial="hidden"
                whileInView="show"
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
