import "../styles/CityDetails.css";
import { useParams } from "react-router-dom";
import { useGetItineraryByCUMutation } from "../features/itineraryAPI";
import { useEffect, useState, useRef } from "react";
import Itinerary from "../components/Itinerary";
import ButtonBack from "./ButtonBack";
import Input from "../components/Input";
import { useCreateItineraryMutation } from "../features/itineraryAPI";

export default function CityDetails(props) {
  let [addOne, setAddOne] = useState(false);
  let [justUsers, setJustUsers] = useState("hidden-no-user");

  const nameRef = useRef();
  const priceRef = useRef();
  const durationRef = useRef();
  const tagsRef = useRef();
  let id = useParams().id;
  const [NewItineraryRedux , {data : newItinerary }] = useCreateItineraryMutation();
  let userID = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : "";

  const [getAllItinerary, { data: items }] = useGetItineraryByCUMutation();

  useEffect(() => {
      setJustUsers(localStorage.getItem("user") ? "" : "hidden-no-user");
      getAllItinerary({ city: id, user: "" });
  }, [id , newItinerary]);  

  const city = props.data;
  let newDate = new Date(city.founded);
  let year = newDate.getFullYear();

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
      user: userID,
      city: id,
      price: priceRef.current.value,
      tags: [tagsRef.current.value],
      duration: durationRef.current.value,
      likes: [""],
    };
    NewItineraryRedux(dataItinerary);
    alert("Create succesfully");
  }

  function openButton() {
    setAddOne(true);
  }
  function closeButton() {
    setAddOne(false);
  }

  return addOne ? (
    <>
      <div className="NewCity-container">
        <h1>New Itinerary</h1>
        <form className="NewCity-form" onSubmit={Create}>
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
        <button className="Submit-button" onClick={closeButton}>
          Cancel
        </button>
      </div>
    </>
  ) : (
    <div className="CityDetails-container">
      <div
        className="CityDetails-banner"
        style={{
          backgroundImage: `url(${city.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="CityDetails-bannerColor">
          <h3 className="Banner-welcome">Welcome to</h3>
          <h3 className="Banner-city">{city.city}</h3>
        </div>
      </div>
      <div className="CityDetails-info">
        <h2>DETAILS</h2>
        <p className="Info-city">Country: {city.country}</p>
        <p className="Info-country">City: {city.city}</p>
        <p className="Info-population">Population number: {city.population}</p>
        <p className="Info-founded">Founded: {year}</p>
      </div>
      <button className={justUsers} onClick={openButton}>
        {" "}
        Add Itinerary
      </button>
      {items?.map((e) => (
        <Itinerary item={e} key={e._id} />
      ))}

      <ButtonBack linkTo="/cities" buttonText="Back to Cities" />
    </div>
  );
}
