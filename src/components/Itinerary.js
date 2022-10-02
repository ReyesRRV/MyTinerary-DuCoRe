import React, { useState, useRef } from "react";
import "../styles/Itinerary.css";
import Activities from "./Activities";
import Comments from "./Comments";
import Alert from "../components/Alert/Alert";
import { useCreateActivityMutation } from "../features/activitiesAPI";
import {
  useDelItineraryMutation,
  useEditItineraryMutation,
} from "../features/itineraryAPI";

export default function Itinerary({ item }) {
  let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  let [open, setOpen] = useState(false);
  let [edit, setedit] = useState(false);
  let nameRef = useRef();
  let photoRef = useRef();
  let nameIRef = useRef();
  const priceRef = useRef();
  const durationRef = useRef();
  const tagsRef = useRef();

  let [addActivityRedux] = useCreateActivityMutation();
  let [deleteItineraryRedux] = useDelItineraryMutation();
  let [editItineraryRedux] = useEditItineraryMutation();
let [msg , setMsg] = useState("")
  

  let form = [
    { Name: "Name",Label: "Name", Placeholder: "Activity",  type: "text", value: nameRef,},
    {Name: "photo",Label: "photo", Placeholder: "Photo",type: "text",value: photoRef,},
  ];
  let formItinerary = [
    {label: "Name", htmlFor: "Name", type: "text", placeholder: `${item.name}`,value: nameIRef,},
    {label: "Price",htmlFor: "Price", type: "number",placeholder: `${item.price} $`,value: priceRef,},
    {label: "Duration",htmlFor: "Duration",type: "number",placeholder: `${item.duration} hrs`,value: durationRef,},
    {label: "Tags", htmlFor: "Tags",type: "String",placeholder: `${item.tags}`,value: tagsRef,},
  ];

  function delItinerary(e) {
    deleteItineraryRedux(e.target.id);
  }
  function editButton() {
    /// Button for show the "Add activity"
    edit ? setedit(false) : setedit(true);
  }
  function addActivity() {
    /// Button for show the "Add activity"
    open ? setOpen(false) : setOpen(true);
  }
  function createActivity(e) {
    ///// Create function for activities
    e.preventDefault();
    let dataActivity = {
      name: nameRef.current.value,
      photo: photoRef.current.value,
      itinerary: nameRef.current.id,
    };
    console.log(dataActivity);
    addActivityRedux(dataActivity);
  }
  async function  editItinerary(e) {
   e.preventDefault();
   let id = nameIRef.current.id

   const dataItinerary = {
    name: nameIRef.current.value !== "" ? nameIRef.current.value : `${item.name}`,
    price: priceRef.current.value !== "" ? priceRef.current.value : `${item.price}`,
    duration: durationRef.current.value !== "" ? durationRef.current.value : `${item.duration}` ,
    tags: tagsRef.current.value !== "" ? [tagsRef.current.value] : [`${item.tags}`]
  };
let res = await editItineraryRedux({dataItinerary, id })
res.data  ? setMsg(res.data.message) : setMsg(res.error.data.message)

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
  ) : (
    <>
      <div className="Itinerary-container">
        <div className="card">
          <div className="card-img">
            <img
              className="Itinerary-photo"
              src={item.user.photo}
              alt={item.user.name}
            ></img>
          </div>
          <div className="card-info">
            <p className="text-title">{item.name}</p>
            <p className="text-user">
              By {item.user.name}
              {""} {item.user.lastName}
            </p>
            <div className="info-pd">
              <p className="text-body">Price: {"💵 ".repeat(item.price)}</p>
              <p className="text-body">Duration: {item.duration}hs</p>
            </div>
            <p className="text-tags">
              {item.tags.map((tag) => "#" + tag + " ")}
            </p>
          </div>
        </div>
        {user.id === item.user._id ? (
          <>
            <button onClick={addActivity}> Add Activity </button>
            <button onClick={editButton}> Edit </button>
            <button onClick={delItinerary} id={item._id}>
              {" "}
              Delete{" "}
            </button>
          </>
        ) : (
          ""
        )}
        {open ? (
          <form onSubmit={createActivity}>
            {form.map((e) => (
              <div className="EditProfile-form" key={e.Name}>
                <label className="EditProfile-labels" htmlFor={item._id}>
                  {e.Name}
                </label>
                <input
                  className="EditProfile-inputs"
                  id={item._id}
                  placeholder={e.Placeholder}
                  ref={e.value}
                ></input>
              </div>
            ))}
            <div className="EditProfile-buttons">
              <Alert label={"Send"} message="" />
              <button className="Profile-buttonEdit" onClick={addActivity}>
                {" "}
                Cancel{" "}
              </button>
            </div>
          </form>
        ) : (
          ""
        )}

        <Activities itineraryId={item._id} />
        <Comments itineraryId={item._id} />
        <hr className="horizontal-line"></hr>
      </div>
    </>
  );
}
