import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <NavLink to="./pages/HomePage">Home</NavLink>
      <NavLink to="./pages/AboutPage">About</NavLink>
      <NavLink to="./DiscoverMoviesPage">Discover Movies</NavLink>
    </div>
  );
}
