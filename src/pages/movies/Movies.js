import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/singleContent/SingleContent";
import Genres from "../../components/Genres";
import axios from "axios"
import useGenre from "../../hooks/useGenre";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenre);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setData(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
           // eslint-disable-next-line
  }, [genreforURL,page]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
        setGenres={setGenres}
        page={page}
        setPage={setPage}
      />
      <div className="trending">
        {data &&
          data.map((movie) => (
            <SingleContent
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || content.name}
              date={movie.first_air_date || movie.release_date}
              media_type="movie"
              vote_average={movie.vote_average}
              overview={movie.overview}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
