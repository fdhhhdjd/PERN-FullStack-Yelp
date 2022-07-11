import React from "react";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { toast } from "react-toastify";
import "moment/locale/vi";
import { useMyContext } from "../../Contexts/GlobalState";
import { StarRating } from "../../Components/StarRating/Index";
import axios from "axios";
const RestaurantFlag = () => {
  const { restaurantsFlag, setReload, reload } = useMyContext();
  let navigate = useNavigate();
  const handleUndo = async (e, id) => {
    e.stopPropagation();
    if (window.confirm(` Are you want Undo ${id} Restaurants ? `)) {
      e.stopPropagation();
      try {
        await axios
          .post("/api/undo", {
            id,
          })
          .then((item) => {
            setReload(!reload);
            return toast.success("Undo Success 😉!");
          })
          .catch((error) => {
            return toast.error("Server busy 🥲 !");
          });
      } catch (error) {
        return toast.error("Server busy 🥲 !");
      }
    }
  };

  const RollBack = (e) => {
    e.stopPropagation();
    navigate("/");
  };
  const renderRating = (restaurant) => {
    if (!restaurant.price_range) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.price_range} />
        <span className="text-warning ml-1">({restaurant.price_range})</span>
      </>
    );
  };
  return (
    <>
      <button className="btn btn-warning" onClick={RollBack}>
        Roll Back
      </button>
      <div className="list-group">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary">
              <th scope="col">Restaurant</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
              <th scope="col">Date Create</th>
              <th scope="col">Date Edit</th>
              <th scope="col">Date Delete</th>
              <th scope="col">Undo</th>
            </tr>
          </thead>
          <tbody>
            {restaurantsFlag &&
              restaurantsFlag.map((restaurant) => {
                return (
                  <tr key={restaurant.id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <td>{renderRating(restaurant)}</td>
                    <td>
                      {" "}
                      <Moment format="dddd, Do MMMM YYYY, HH:mm:ss a">
                        {restaurant.create_at_date_time}
                      </Moment>
                    </td>
                    <td>
                      {restaurant.update_date_time === null ? (
                        "Chưa sữa lần nào"
                      ) : (
                        <Moment format="dddd, Do MMMM YYYY, HH:mm:ss a">
                          {restaurant.update_date_time}
                        </Moment>
                      )}
                    </td>
                    <td>
                      {restaurant.delete_flag_date_time === null ? (
                        "Chưa xóa lần nào"
                      ) : (
                        <Moment format="dddd, Do MMMM YYYY, HH:mm:ss a">
                          {restaurant.delete_flag_date_time}
                        </Moment>
                      )}
                    </td>

                    <td>
                      <button
                        onClick={(e) => handleUndo(e, restaurant.id)}
                        className="btn btn-warning"
                      >
                        Undo
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RestaurantFlag;
