import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

export default function Detail() {
  const { productID } = useParams();
  const { isLoading, fetchURL, data } = useFetch(
    "GET",
    `products/${productID}/`
  );

  useEffect(() => {
    fetchURL();
  }, []);

  console.log(data);

  return (
    <div>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <div>
          <p>{data.title}</p>
          <img src={data.image} alt={data.title} />
        </div>
      )}
    </div>
  );
}
