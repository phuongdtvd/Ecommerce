import React from "react";
import { useState } from "react";

// a generic function to retrieve json from an API
// it can be used outside of our hook as well
// it's a replacement to just using fetch
// thus we don't have to parse the JSON all the time or reuse the URL

const API_BASE_URL = "https://fakestoreapi.com";

export async function fetchJSON(method, endpoint) {
  return fetch(`${API_BASE_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => res.json());
}

export default function useFetch(method, url) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchURL = async () => {
    try {
      setIsLoading(true);
      const data = await fetchJSON(method, url);
      setData(data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { isLoading, fetchURL, data, error };
}
