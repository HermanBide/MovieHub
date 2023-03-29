import React, { useEffect} from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";

const Genres = ({
  setGenres,
  genres,
  selectedGenre,
  setSelectedGenre,
  setPage,
  type,
}) => {

    const handleAddGenre = (genre) => {
      setSelectedGenre([...selectedGenre, genre]);
      setGenres(genres.filter((g) => g.id !== genre.id));
      setPage(1);
    };
  
    const handleRemoveGenre = (genre) => {
      setSelectedGenre(
        selectedGenre.filter((selected) => selected.id !== genre.id)
      );
      setGenres([...genres, genre]);
      setPage(1);
    };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(genres.results)
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
       // eslint-disable-next-line
  }, []);


  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenre &&
        selectedGenre.map((genre) => (
          <Chip
            label={genre.name}
            clickable
            style={{ margin: 2 }}
            size="small"
            color="primary"
            key={genre.id}
            variant="outlined"
            onDelete={() => handleRemoveGenre(genre)}
          />
        ))}
      {/* {genres.map((genre) => (
          <Chip
            label={genre.name}
            clickable
            style={{ margin: 2 }}
            size="small"
            key={genre.id}
            variant="outlined"
            onClick={() => handleAddGenre(genre)}
          />
        ))} */}
    </div>
  );
};

export default Genres;
