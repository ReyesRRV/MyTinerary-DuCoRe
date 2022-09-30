import React from 'react';
// styling
import '../../styles/Checkout.css';
// images
import { Link as LinkRouter } from 'react-router-dom';

export default function PopUp(props) {
   // function that takes boolean as param to conditionally display popup
   let h2 = props.h2
   const { setPopUp } = props 

   return (
       <div className="PopUp">
           {/* x close window */}
           <button className="popup-x" onClick={()=> setPopUp(false)} >X</button>
           <div className="pu-content-container">
           <h2>{h2}</h2>
               
           </div>
           {/* button controls */}
           <div className="pu-button-container">


              <a href='/' >
              <button onClick={()=> setPopUp(false)}> OK! </button>
              
              </a>  


           </div>
       </div>
   );
}
