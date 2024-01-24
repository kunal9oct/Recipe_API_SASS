import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import RecipeLists from "./components/RecipeLists";
import Tabs from "./components/Tabs";

function App() {
  const [loader, setLoader] = useState(true);
  const [recipeId, setRecipeId] = useState('6623390762899b54537e69d97268983a');
  const [search, setSearch] = useState('Pizza');
  const [switchSearch, setSwitchSearch] = useState('pizza');

  return (
    <>
      <div className="main">
        <Header />
        <Tabs setLoader={setLoader} recipeId={recipeId} search={search} setSearch={setSearch} setSwitchSearch={setSwitchSearch} />
        <RecipeLists setLoader={setLoader} setRecipeId={setRecipeId} setSearch={setSearch} switchSearch={switchSearch} setSwitchSearch={setSwitchSearch} />
        {loader && (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
