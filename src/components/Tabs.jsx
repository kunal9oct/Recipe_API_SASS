import React, { useEffect, useState } from "react";
import { CiPizza } from "react-icons/ci";
import { GiFruitBowl, GiNoodles, GiCheckMark } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { fetchTabsData } from "../service";

function Tabs({ setLoader, recipeId, setSwitchSearch, search, setSearch }) {
  const [tabData, setTabData] = useState("");
  const [tabLabel, setTabLabel] = useState([
    {
      name: "Pizza",
      icon: <CiPizza />,
    },
    {
      name: "Noodles",
      icon: <GiNoodles />,
    },
    {
      name: "Desert",
      icon: <GiFruitBowl />,
    },
    {
      name: "Ice Cream",
      icon: <MdOutlineIcecream />,
    },
  ]);

  const checkItemArray = ["PIZZA", "NOODLES", "DESERT", "ICE CREAM"]; 

  const handleClick = (name) => {
    setSearch(name);
  };

  useEffect(() => {
    fetchTabsData(recipeId).then((res) => {
      setTabData(res);
      setLoader(false);
    });
  }, [recipeId]);

  return (
    <div className="container">
      <h1 className="recipeHeading">What would you like to have!</h1>
      <div className="tabs">
        {tabLabel.map((item, index) => (
          <div
            onClick={() => (handleClick(item.name), setSwitchSearch(item.name), setLoader(true))}
            key={index}
            className={`tablist ${
              checkItemArray.includes(
                search.toUpperCase()
              )
                ? search.toUpperCase() === item.name.toUpperCase()
                  ? "active"
                  : ""
                : ""
            } `}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div className="recipe_banner">
        {tabData !== "" && (
          <>
            <div className="left-col">
              <span className="badge">
                {tabData.recipe.cuisineType[0].toUpperCase()}
              </span>
              <h1>{tabData.recipe.label}</h1>
              <p>
                <strong>Recipe by:</strong>
                <small>{tabData.recipe.source}</small>
              </p>
              <h3>Ingredients</h3>
              <div className="ingredients">
                <ul>
                  {tabData.recipe.ingredientLines.map((list, index) => (
                    <li key={index}>
                      <GiCheckMark size="18px" color="#6fcb9f" />
                      &nbsp;<span>{list}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="right-col">
              <div className="image-wrapper">
                <img src={tabData.recipe.image} alt={tabData.recipe.label} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Tabs;
