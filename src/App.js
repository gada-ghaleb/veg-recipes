import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import RecipeProvider from "./store/context/RecipeProvider";
import Layout from "./components/Layout";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="App">
      <RecipeProvider>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Homepage searchTerm={searchTerm} />} />
          <Route path="/details/:recipeId" element={<Layout />} />
        </Routes>
      </RecipeProvider>
    </div>
  );
}
export default App;
