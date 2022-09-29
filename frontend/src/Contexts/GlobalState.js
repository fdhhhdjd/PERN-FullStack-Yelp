import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const API = "https://yelppostgres.ml";
export const Store = createContext();
export const useMyContext = () => useContext(Store);
export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsFlag, setRestaurantsFlag] = useState([]);
  const [error, setError] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`${API}/api/getall`)
          .then((response) => {
            setRestaurants(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        setError(error);
      }
    };

    fetchData();
  }, [reload]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`${API}/api/getdelete`)
          .then((response) => {
            setRestaurantsFlag(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        setError(error);
      }
    };

    fetchData();
  }, [reload]);
  const data = {
    restaurants,
    setRestaurants,
    setReload,
    reload,
    restaurantsFlag,
    setRestaurantsFlag,
  };
  Store.displayName = "Tài Heo Dev";
  return <Store.Provider value={data}>{children}</Store.Provider>;
};
