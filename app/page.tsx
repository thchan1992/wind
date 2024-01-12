import IngredientBoard from "./components/IngredientBoard";
import Ingredients from "./components/Ingredients";
import SavedRecipes from "./components/SavedRecipes";
import Search from "./components/Search";

export default function Home() {
  return (
    <div className={"flex justify-center flex-col items-center"}>
      <Search />
      <Ingredients />
    </div>
  );
}
