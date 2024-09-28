import { useCallback, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Animate } from "./Animate";
import { useDebounce } from "./useDebounce";

const SearchInput = ({ searchTerm, handleSearchChange }) => (
  <motion.div
    variants={Animate}
    initial="hidden"
    whileInView="show"
    className="w-full max-w-lg"
  >
    <label htmlFor="search" className="sr-only">
      Search
    </label>
    <div className="relative">
      <input
        id="search"
        name="search"
        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search"
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  </motion.div>
);

export default function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 500);

  const handleSearchChange = useCallback((e) => {
    setLocalSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm !== searchTerm) {
      setSearchTerm(debouncedSearchTerm);
      navigate(`/`);
    }
  }, [debouncedSearchTerm, searchTerm, setSearchTerm, navigate]);
  const handleLogoClick = () => {
    navigate("/");
    window.location.reload(); 
  };
  return (
    <Disclosure as="nav" className="bg-teal-900 shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <Link to={"/"} onClick={handleLogoClick}>
                <motion.h1
                  variants={Animate}
                  initial="hidden"
                  whileInView="show"
                  className="ml-2 text-3xl font-sans text-white"
                >
                  Veg-Recipes
                </motion.h1>
              </Link>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end px-2">
            <SearchInput
              searchTerm={localSearchTerm}
              handleSearchChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
