import NavLinks from "./NavLinks"
import '../styles/Navbar.css';
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="Nav-mobile">
      <img className="Nav-hamburguer"
        onClick={() => setOpen(!open)}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAFFJREFUSEvtlEkKADAIA83/H52eu1APZQShnquTBaqAR/D9+IA04fqIbDuVdXkgaRK9OcABL+pPu/Ud4A7wDnAAHlF/AN4BDujfwXewJoD/pgNrVBgZX2h0sgAAAABJRU5ErkJggg==" 
        alt="hamburger"/>
      {open && < NavLinks />}
    </nav>
  )
}
