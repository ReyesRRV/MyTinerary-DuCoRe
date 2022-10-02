import React from "react";
import { useGetItineraryByCUMutation } from "../features/itineraryAPI";
import { useEffect } from "react";
import Itinerary from "../components/ItineraryPage";
import "../styles/MyTinerary.css";
import { Link as LinkRouter } from "react-router-dom";

export default function MyTinerares() {

  let id = ""

if(localStorage.length > 0){
let user = JSON.parse(localStorage.getItem("user"))
id = user.id
}

  const [getAllItinerary, { data: items }] = useGetItineraryByCUMutation();

  useEffect(() => {
    getAllItinerary({ city: "", user: id });
  }, [id]);

  return (
    <div className="MyTinerary-container">      
      <LinkRouter to="/NewItinerary" className="Submit-button">
        {" "}
        Add Itinerary{" "}
      </LinkRouter>
      {items?.map(Itinerary)}
    </div>
  );
}
