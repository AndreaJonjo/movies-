import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import MovieItem from "../components/MovieItem";

export default function DiscoverMoviesPage() {
  const history = useHistory();
  const { searchtext } = useParams();

  const [searchText, set_searchText] = useState(searchtext);
  const [state, setState] = useState({ status: "idle" });

  useEffect(() => {
    async function fetchData() {
      if (!searchtext || searchtext === "") {
        setState({ status: "idle" });
        return;
      }
      setState({ status: "searching" });

      const queryParam = encodeURIComponent(searchtext);

      const data = await fetch(
        `https://omdbapi.com/?apikey=6a06f383&s=${queryParam}`
      ).then((r) => r.json());

      setState({ status: "done", data: data.Search });
    }

    fetchData();
  }, [searchtext]);

  const navigateToSearch = (e) => {
    e.preventDefault();
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
  };

  return (
    <div>
      <h1>Discover some movies!</h1>
      <form onSubmit={navigateToSearch}>
        <input
          value={searchText}
          onChange={(e) => set_searchText(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {state.status === "idle" && (
        <p>Type in a search term and click "Search" to start...</p>
      )}
      {state.status === "searching" && <p>Searching...</p>}
      {state.status === "done" && (
        <div>
          {state.data && state.data.length > 0 ? (
            <>
              <h2>Search results</h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  margin: "0 -10px",
                }}
              >
                {state.data.map((movie) => (
                  <MovieItem key={movie.imdbID} movie={movie} />
                ))}
              </div>
            </>
          ) : (
            <h2>No results!</h2>
          )}
        </div>
      )}
    </div>
  );
}
