import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { fetchData } from "../service";

function RecipeLists({ setLoader, setRecipeId, setSearch, switchSearch, setSwitchSearch }) {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData(switchSearch).then((res) => {
      setData(res);
      setRecipeId(res.hits[0].recipe.uri.substr(51, 82));
      setLoader(false);
    });
  }, [switchSearch]);

  return (
    <div className="container">
      <div className="heading-line">
        <strong>Search Recipes</strong>
        <div className="input-wrapper">
          <input
            onChange={(e) => setSearchedTerm(e.target.value)}
            value={searchedTerm}
            type="text"
            placeholder="Search your recipe"
          />
          <button onClick={() => {if (searchedTerm.length !== 0) {
            (setSwitchSearch(searchedTerm), setSearch(searchedTerm), setLoader(true))
          }
          }}>
            <BsSearch />
          </button>
        </div>
      </div>
      <div className="flexbox">
        {data &&
          data?.hits.map((item, index) => (
            <div key={index} className="flexItem" onClick={() => (setRecipeId(item.recipe.uri.substr(51, 82)), setLoader(true))}>
              <div className="img-wrapper">
                <img src={item.recipe.image} alt={item.recipe.label} />
              </div>
              <p>{item.recipe.label}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecipeLists;
