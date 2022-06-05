import "./styles.css";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";

export default function App() {
  // const [category, setCategory] = useState([]);
  const [activeFilter, setActiveFilter] = useState([]);
  const { isLoading, fetchURL, data } = useFetch("GET", "products");
  const category = getAllCategories(data);

  useEffect(() => {
    fetchURL();
  }, []);

  function filter(newCategory) {
    console.log(newCategory);
    if (activeFilter.includes(newCategory)) {
      setActiveFilter((prevFilters) =>
        prevFilters.filter((item) => item !== newCategory)
      );
    } else {
      setActiveFilter((prevFilters) => [...prevFilters, newCategory]);
    }
  }

  const displayData = activeFilter.length
    ? data.filter((item) => activeFilter.includes(item.category))
    : data;

  return (
    <div className="App">
      {!isLoading && (
        <>
          <div className="categories">
            {category.map((category) => (
              <Filter
                isActive={activeFilter.includes(category)}
                key={category}
                category={category}
                handleClick={() => filter(category)}
              >
                {category}
              </Filter>
            ))}
          </div>

          <div className="items">
            {displayData.map((item) => (
              <div key={item.id} className="item">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <img src={item.image} alt={item.title} width="100px" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function getAllCategories(array) {
  if (array) {
    let categories = array.reduce(
      (set, item) => set.add(item.category),
      new Set()
    );
    return Array.from(categories);
  }
}
