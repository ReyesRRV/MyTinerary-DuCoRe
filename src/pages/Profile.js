import React, { useEffect, useRef, useState } from "react";
import "../styles/Profile.css";
import {
  useGetOneUserMutation,
  useEditCityMutation,
} from "../features/usersAPI";
import Alert from "../components/Alert/Alert";

export default function Profile() {
  let [edit, setEdit] = useState(false);

  let id = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : "";
  let [getOneUser, { data: myUser }] = useGetOneUserMutation();
  let [editUserRedux, { data: userResponse }] = useEditCityMutation();

  let msg = userResponse?.message ? userResponse.message : "";

  let theUser = myUser?.response;
  let [user, setUser] = useState();
  let nameRef = useRef();
  let lastNameRef = useRef();
  let countryRef = useRef();
  let mailRef = useRef();
  let photoRef = useRef();

  useEffect(() => {
    getOneUser(id);
  }, [id]);

  useEffect(() => {
    setUser(theUser);
  }, [myUser]);

  function editUser() {
    setEdit(true);
  }
  function cancelEdit() {
    setEdit(false);
  }

  let form = [
    {
      Name: "Name",
      Label: "Name",
      Placeholder: `${user?.name}`,
      type: "text",
      value: nameRef,
    },
    {
      Name: "Last Name",
      Label: "Last Name",
      Placeholder: `${user?.lastName}`,
      type: "text",
      value: lastNameRef,
    },
    {
      Name: "Country",
      Label: "Country",
      Placeholder: `${user?.country}`,
      type: "text",
      value: countryRef,
    },
    {
      Name: "mail",
      Label: "mail",
      Placeholder: `${user?.mail}`,
      type: "text",
      value: mailRef,
    },
    {
      Name: "Photo",
      Label: "Photo",
      Placeholder: "Photo",
      type: "text",
      value: photoRef,
    },
  ];

  function editUserButton(e) {
    e.preventDefault();
    let dataUser = {
      name: nameRef.current.value !== "" ? nameRef.current.value : user.name,
      lastName:
        lastNameRef.current.value !== ""
          ? lastNameRef.current.value
          : user.lastName,
      mail: mailRef.current.value !== "" ? mailRef.current.value : user.mail,
      country:
        countryRef.current.value !== ""
          ? countryRef.current.value
          : user.country,
      photo:
        photoRef.current.value !== "" ? photoRef.current.value : user.photo,
    };
    console.log(dataUser);
    editUserRedux({ dataUser, id });
  }

  return edit ? (
    <div className="Profile-container">
      <h2 className="Profile-titlePage">EDIT PROFILE</h2>
      <div className="Profile-card">
        <img src={user?.photo} alt={user?.name}></img>
        <form onSubmit={editUserButton}>
              {form.map((e) => (
                <div className="EditProfile-form" key={e.Name}>
                  <label className="EditProfile-labels" for={e.Name}>{e.Name}</label>
                  <input
                  className="EditProfile-inputs"
                  id={e.Name}
                  placeholder={e.Placeholder}
                  ref={e.value}>
                  </input>
                </div>
              ))}
        <div className="EditProfile-buttons">
          <Alert label={"Send"} message={msg}/>
          <button className="Profile-buttonEdit" onClick={cancelEdit}> Cancel </button>
        </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="Profile-container">
      <h2 className="Profile-titlePage">PROFILE</h2>
      <div className="Profile-card">
        <img src={user?.photo} alt={user?.name}></img>
        <h3 className="Profile-userName">{user?.name} {""} {user?.lastName}</h3>
        <p className="Profile-userCountry">{user?.country}</p>
        <p className="Profile-userEmail">{user?.mail}</p>
        <button className="Profile-buttonEdit" onClick={editUser}>Edit Profile</button>
      </div>
    </div>
  );
}
