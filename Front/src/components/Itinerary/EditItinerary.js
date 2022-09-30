import React from "react";
import { useState ,useRef } from "react";
import Alert from "../Alert/Alert";
import {  useDelItineraryMutation,  useEditItineraryMutation,} from "../../features/itineraryAPI";
import PopUp from "../Alert/PopUp";

export default function EditItinerary(props) {
let item = props.data

  let nameIRef = useRef();
  const priceRef = useRef();
  const durationRef = useRef();
  const tagsRef = useRef();
  let [deleteItineraryRedux] = useDelItineraryMutation();
  let [editItineraryRedux] = useEditItineraryMutation();
  let [msg , setMsg] = useState("")


  let [edit, setedit] = useState(false);
  let formItinerary = [
    {label: "Name", htmlFor: "Name", type: "text", placeholder: `${item.name}`,value: nameIRef,},
    {label: "Price",htmlFor: "Price", type: "number",placeholder: `${item.price} $`,value: priceRef,},
    {label: "Duration",htmlFor: "Duration",type: "number",placeholder: `${item.duration} hrs`,value: durationRef,},
    {label: "Tags", htmlFor: "Tags",type: "String",placeholder: `${item.tags}`,value: tagsRef,},
  ];

  function editButton() {
    /// Button for show the "Add activity"
    edit ? setedit(false) : setedit(true);
  }
  async function  editItinerary(e) {
    e.preventDefault();
    let id = item._id
    const dataItinerary = {
     name: nameIRef.current.value !== "" ? nameIRef.current.value : `${item.name}`,
     price: priceRef.current.value !== "" ? priceRef.current.value : `${item.price}`,
     duration: durationRef.current.value !== "" ? durationRef.current.value : `${item.duration}` ,
     tags: tagsRef.current.value !== "" ? [tagsRef.current.value] : [`${item.tags}`]
   };
   
 let res = await editItineraryRedux({dataItinerary, id })
 res.data  ? setMsg(res.data.message) : setMsg(res.error.data.message)
 
 }
 function delItinerary(e) {
  deleteItineraryRedux(item._id);
  console.log(item._id)
}


  return edit ? (
    <form onSubmit={editItinerary}>
      {formItinerary.map((e) => (
        <div className="EditProfile-form" key={e.label}>
          <label className="EditProfile-labels" htmlFor={item._d}>
            {e.label}
          </label>
          <input
            className="EditProfile-inputs"
            id={item._id}
            placeholder={e.placeholder}
            ref={e.value}
          ></input>
        </div>
      ))}
      <div className="EditProfile-buttons">
        <Alert label={"Send"} message={msg} />
        <button className="Profile-buttonEdit" onClick={editButton}>
          {" "}
          Cancel{" "}
        </button>
      </div>
    </form>
  ):(
    <div className="EditProfile-buttons">
      <button className="Profile-buttonEdit" onClick={editButton}> Edit </button>
    <button className="Profile-buttonEdit" onClick={delItinerary}> Delete </button>
    </div>
  );
}
