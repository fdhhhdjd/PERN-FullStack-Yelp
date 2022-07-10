import React from "react";
import { Header } from "../../Components/Header/Index";
import { AddRestaurant } from "../../Components/AddRestaurant/Index";
import { RestaurantList } from "../../Components/RestaurantList/Index";
const Home = () => {
  return (
    <React.Fragment>
      <div>
        <Header />
        <AddRestaurant />
        <RestaurantList />
      </div>
    </React.Fragment>
  );
};

export default Home;
