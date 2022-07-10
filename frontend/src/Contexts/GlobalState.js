import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const Store = createContext();
export const useMyContext = () => useContext(Store);
export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("/api/getall").then((response) => {
          setRestaurants(response.data.data);
        });
      } catch (err) {
        setError(error);
      }
    };

    fetchData();
  }, []);
  const data = { restaurants, setRestaurants };
  Store.displayName = "Tài Heo Dev";
  return <Store.Provider value={data}>{children}</Store.Provider>;
};
