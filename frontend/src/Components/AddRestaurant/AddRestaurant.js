import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API, useMyContext } from "../../Contexts/GlobalState";
const initialState = {
  name: "",
  location: "",
  price_range: "price_range",
};
const AddRestaurant = () => {
  const [state, setState] = useState(initialState);
  const { setReload, reload } = useMyContext();
  const { name, location, price_range } = state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${API}/api/create`, {
          name,
          location,
          price_range,
        })
        .then(async (item) => {
          await axios
            .post(`${API}/api/cache`, {
              key: "restaurants",
            })
            .then((success) => {
              setReload(!reload);
              setState({ name: "", location: "", price_range: "price_range " });
              return toast.success(" Add Restaurants Success 😄 !");
            })
            .catch((error) => {
              return toast.error(" Server busy 🥲 !");
            });
        })
        .catch((err) => {
          return toast.error(" Server busy 🥲 !");
        });
    } catch (error) {
      return toast.error(" Server busy 🥲 !");
    }
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              name="name"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              name="location"
              onChange={handleChange}
              className="form-control"
              type="text"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              value={price_range}
              name="price_range"
              onChange={handleChange}
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
