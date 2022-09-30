import React, { useState } from "react";
// styling
import "../../styles/Checkout.css";
// components
import PopUp from "./PopUp";

export default function Checkout(props) {


let labelButton = props.label



let message = props.message


  // controls if popup displays
  const [popUp, setPopUp] = useState(false);
  // adds class to darken background color

  const duringPopUp = popUp ? " during-popup Submit-button" : "Submit-button";

  return (
    <>
      <button onClick={() => setPopUp(true)} className={duringPopUp}> {labelButton}  </button>
      {popUp && <PopUp setPopUp={setPopUp} h2={message} />}
    </>
  );
}
