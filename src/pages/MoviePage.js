import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function MoviePage() {
  const { imdb_id } = useParams();

  const [movieData, set_movieData] = useState({});

  console.log(imdb_id);

  useEffect(() => {
    async function fetchData() {
      console.log("hey im here");
      const response = await Axios.get(
        `https://omdbapi.com/?apikey=20648ef1&i=${imdb_id}`
      );
      console.log("this is data", response);
      set_movieData(response.data);
    }
    fetchData();
  }, [imdb_id]);

  return (
    <div>{movieData ? <h2>{movieData.Title}</h2> : <p>Loading...</p>}</div>
  );
}
