import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
        <li style={{ marginRight: "20px" }}>
          <NavLink to="/">Form</NavLink>
        </li>
        <li>
          <NavLink to="/sub">Submissions</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
