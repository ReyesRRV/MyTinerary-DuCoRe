import React from "react"
import { useState } from "react"
import '../styles/Itinerary.css'
import Activities from './Activities'
import Comments from "./DisplayComments";
import EditItinerary from './Itinerary/EditItinerary'


export default function Itinerary(item) {
let user = JSON.parse(localStorage.getItem("user"))

    return (       
        <div className="Itinerary-container" key={item._id}>
        <div className="card">
          <div className="card-img">
            <img className='Itinerary-photo' src={item.user.photo} alt={item.user.name}></img>
          </div>
          <div className="card-info">
            <p className="text-title">{item.name}</p>
            <p className="text-user">By {item.user.name}{''} {item.user.lastName}</p>
            <div className="info-pd">
              <p className="text-body">Price: {"💵 ".repeat(item.price)}</p>
              <p className="text-body">Duration: {item.duration}hs</p>
            </div>
            <p className="text-tags">{item.tags.map(tag => "#" + tag + " ")}</p>
          </div>
        </div>
        <EditItinerary data={item}/>
        <Activities itineraryId={item._id}/>
        <Comments itineraryId={item._id}/>
        <hr className="horizontal-line"></hr>
      </div>
  )
}
