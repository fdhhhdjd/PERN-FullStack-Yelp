import React from "react";
import { Header } from "../../Components/Header/Index";
import { AddRestaurant } from "../../Components/AddRestaurant/Index";
import { RestaurantFlag } from "../../Components/RestaurantFlag/Index";
const DeleteFlag = () => {
  return (
    <React.Fragment>
      <div>
        <Header />
        <RestaurantFlag  />
      </div>
    </React.Fragment>
  );
};

export default DeleteFlag;
