import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLeaf,
  faUtensils,
  faWheatAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Animate } from "../components/Animate";

export default function RecipeInfo({ details }) {
  return (
    <div className="bg-neutral-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="mt-7 space-y-20 lg:mt-10 lg:space-y-20">
            <motion.div
              variants={Animate}
              initial="hidden"
              whileInView="show"
              className="relative isolate flex flex-col lg:flex-row justify-around"
            >
              <img
                src={details.image}
                alt={details.title}
                className="aspect-[3/2] w-full lg:w-2/5 object-cover"
              />
              <div className="ml-8 lg:col-span-5">
                <h2 className="text-4xl p-2 font-medium text-neutral-800">
                  {details.title}
                </h2>
                <p className="flex items-center text-md p-2 font-medium text-neutral-800">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="w-5 h-5 mr-2 text-teal-600"
                  />
                  Preparation: {details.readyInMinutes} Minutes
                </p>
                <p className="flex items-center text-md p-2 font-medium text-neutral-800">
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="w-5 h-5 mr-2 text-teal-600"
                  />
                  Servings: {details.servings}
                </p>
                {details.vegetarian && (
                  <p className="flex items-center text-md p-2 font-medium text-neutral-800">
                    <FontAwesomeIcon
                      icon={faLeaf}
                      className="w-5 h-5 mr-2 text-teal-600"
                    />
                    Vegetarian
                  </p>
                )}
                {details.glutenFree && (
                  <p className="flex items-center text-md p-2 font-medium text-neutral-800">
                    <FontAwesomeIcon
                      icon={faWheatAlt}
                      className="w-5 h-5 mr-2 text-teal-600"
                      style={{ textDecoration: "line-through" }}
                    />
                    Gluten-free
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}