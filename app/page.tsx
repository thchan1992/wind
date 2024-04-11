import AuthHeader from "./components/AuthHeader";

import IngredientBoard from "./components/IngredientBoard";
import Ingredients from "./components/Ingredients";
import SavedRecipes from "./components/SavedRecipes";
import Search from "./components/Search";

import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className={"flex flex-col items-center  w-full h-full   "}>
      <AuthHeader />
      <Search />
      <Ingredients />
      <Footer />
    </div>
  );
}
