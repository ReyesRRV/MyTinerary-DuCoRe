import React from "react";
import Input from "../components/Input";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCitiesQuery } from "../features/citiesAPI";
import { useCreateItineraryMutation } from "../features/itineraryAPI";

export default function AddItinerary() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const priceRef = useRef();
  const durationRef = useRef();
  const tagsRef = useRef();
  const [id, setId] = useState();
  const { data: cities } = useGetAllCitiesQuery();
  const [NewItineraryRedux] = useCreateItineraryMutation()

  let user = JSON.parse(localStorage.getItem("user"))
  let userID = user.id

  function getID(e) {
    setId(e.target.value);
  }

  const form = [
    {
      label: "Name",
      htmlFor: "Name",
      type: "text",
      placeholder: "Enter a itinerary",
      value: nameRef,
    },
    {
      label: "Price",
      htmlFor: "Price",
      type: "number",
      placeholder: "Enter a Price",
      value: priceRef,
    },
    {
      label: "Duration",
      htmlFor: "Duration",
      type: "number",
      placeholder: "Enter a duration",
      value: durationRef,
    },
    {
      label: "Tags",
      htmlFor: "Tags",
      type: "String",
      placeholder: "add tags",
      value: tagsRef,
    },
  ];

  function Create(e) {
    e.preventDefault();

    const dataItinerary = {
      name: nameRef.current.value,
      user: userID, /// Modify user for get the user
      city: id,
      price: priceRef.current.value,
      tags: [tagsRef.current.value],
      duration: durationRef.current.value,
      likes: [""]
    };
    NewItineraryRedux(dataItinerary);
  }

  return (
    <>
      <div className="NewCity-container">
        <h1>New Itinerary</h1>
        <form className="NewCity-form" onSubmit={Create}>
          <select className="EditCity-select" onChange={getID}>
            <option hidden>Select city</option>
            {cities?.map((city) => (
              <option className="Option-select" key={city._id} value={city._id}>
                {city.city}{" "}
              </option>
            ))}
          </select>
          {form.map((input) => (
            <Input
              label={input.label}
              htmlFor={input.htmlFor}
              type={input.type}
              key={input.label}
              value={input.value}
            />
          ))}
          <button className="Submit-button" type="submit">
            Add Itinerary
          </button>
        </form>
        <button className="Submit-button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </>
  );
}
