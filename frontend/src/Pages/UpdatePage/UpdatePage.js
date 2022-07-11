import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import { useMyContext } from "../../Contexts/GlobalState";
import { toast } from "react-toastify";
const initialState = {
  name: "",
  location: "",
  price_range : "price_range",
  create_at_date_time:""
};

const UpdatePage = () => {
  const [state, setState] = useState(initialState);
  const {name,location, price_range,create_at_date_time}=state;
  const {setReload,reload,restaurants}=useMyContext()
  const {id}=useParams()
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/edit/${id}`,{
        name,location, price_range,create_at_date_time
      }).then(() => {
        setReload(!reload);
        navigate("/")
        return toast.success(`Edit restaurants ${id} success!`);

      }).catch((error) => {
      return toast.error(" Server busy 🥲 !");

      })
    } catch (error) {
      return toast.error(" Server busy 🥲 !");
    }

  }
  useEffect(()=>{
    if(id){
      restaurants.forEach((item)=>{
        if(item.id==id){
          return setState(item)
        }
      })
    }
  },[id])
  return (
    <React.Fragment>
       <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            name="name"
            onChange={ handleChange }
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            name="location"
            onChange={ handleChange }
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            value={price_range}
            name="price_range"
            onChange={ handleChange }
            id="price_range"
            className="form-control"
            type="number"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
    </React.Fragment>
  )
};

export default UpdatePage;
