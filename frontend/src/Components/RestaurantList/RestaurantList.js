import axios from "axios";
import React from "react";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "moment/locale/vi";
import { StarRating } from "../../Components/StarRating/Index";
import { API, useMyContext } from "../../Contexts/GlobalState";
const RestaurantList = () => {
  const { restaurants, setReload, reload } = useMyContext();
  let navigate = useNavigate();
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you want delete Restaurants ?")) {
      e.stopPropagation();
      try {
        await axios
          .post(`${API}/api/delete`, {
            id,
          })
          .then((item) => {
            setReload(!reload);
            return toast.success("Delete Success 😉!");
          })
          .catch((error) => {
            return toast.error("Server busy 🥲 !");
          });
      } catch (error) {
        return toast.error("Server busy 🥲 !");
      }
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
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
      <button className="btn btn-danger" onClick={() => navigate("/undo")}>
        Page Delete
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
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {restaurants &&
              restaurants.map((restaurant) => {
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
                        onClick={(e) => handleUpdate(e, restaurant.id)}
                        className="btn btn-warning"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) => handleDelete(e, restaurant.id)}
                        className="btn btn-danger"
                      >
                        Delete
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

export default RestaurantList;
