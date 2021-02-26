import React from "react";
import { useState } from "react";

export default function DiscoverMoviesPage() {
  const [searchText, set_searchText] = useState("");

  const search = async () => {
    console.log("Start searching for:", searchText);

    const queryParam = encodeURIComponent(searchText);

    const data = await fetch(
      `https://omdbapi.com/?apikey=20648ef1&s=${queryParam}`
    ).then((r) => r.json());

    console.log("Success!", data);
  };

  return (
    <div>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={(e) => set_searchText(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </p>
    </div>
  );
}
