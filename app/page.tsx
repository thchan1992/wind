import AuthHeader from "./components/AuthHeader";
import IngredientBoard from "./components/IngredientBoard";
import Ingredients from "./components/Ingredients";
import SavedRecipes from "./components/SavedRecipes";
import Search from "./components/Search";

export default function Home() {
  return (
    <div className={"flex flex-col items-center p-5 h-screen"}>
      <h1 className={"font-extrabold"}>
        For an improved experience, Chrome is recommended.
      </h1>
      <h1 className={"font-extrabold"}>
        For educational use only. Coursework - university of West London
      </h1>
      <AuthHeader />
      <Search />
      <Ingredients />
    </div>
  );
}
