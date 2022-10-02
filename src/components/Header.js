import "../styles/Header.css";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import { Link as LinkRouter } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useSignOutMutation } from "../features/usersAPI";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuIcon = useRef(null);
  let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  let [logOutRedux] = useSignOutMutation();
  const handleCloseMenu = (event) => {
    const isClickInside = menuIcon.current.contains(event.target);

    if (menuIcon.current !== event.target && !isClickInside) {
      setOpen(false);
    }
  };

  const handleToggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseMenu);

    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  function logOut() {
    console.log("first");
    localStorage.clear();
    console.log(user);
    let id = { _id: user.id };
    logOutRedux(id);
  }

  return user !== "" ? (
    <div className="Header-container">
      <LinkRouter to="/">
        <img
          className="Header-logo"
          src="/img/Logo-nav.png"
          alt="logo-header"
        ></img>
      </LinkRouter>
      <div className="Header-right">
        <MobileNav />
        <Nav />
        {open && (
          <div className="Header-user">           
            <LinkRouter className="Header-option" to="myprofile">
              Profile
            </LinkRouter>
            <LinkRouter className="Header-option" to="/" onClick={logOut}>
              Sign Out
            </LinkRouter>
          </div>
        )}
        <div className="Header-userButton" ref={menuIcon} onClick={handleToggleMenu}>
          <img
            className="Header-avatar"
            src={
              user !== "" ? `${user.photo}` : "https://i.imgur.com/CNe5NKD.png"
            }
            alt="user-avatar"
          />
          <p className="Header-userName">{user.name}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="Header-container">
      <LinkRouter to="/">
        <img
          className="Header-logo"
          src="/img/Logo-nav.png"
          alt="logo-header"
        ></img>
      </LinkRouter>
      <div className="Header-right">
        <MobileNav />
        <Nav />
        {open && (
          <div className="Header-user">
            <LinkRouter className="Header-option" to="auth/signin">
              Sign In
            </LinkRouter>
            <LinkRouter className="Header-option" to="auth/signup">
              Sign Up
            </LinkRouter>
          </div>
        )}
        <img
          className="Header-avatar"
          src={
            user !== "" ? `${user.photo}` : "https://i.imgur.com/CNe5NKD.png"
          }
          alt="user-avatar"
          ref={menuIcon}
          onClick={handleToggleMenu}
        />
      </div>
    </div>
  );
}
