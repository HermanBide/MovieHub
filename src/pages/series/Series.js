import React, { useState, useEffect} from 'react'
import axios from 'axios'
import useGenre from '../../hooks/useGenre'
import CustomPagination from '../../components/pagination/CustomPagination';
import SingleContent from '../../components/singleContent/SingleContent'
import Genres from '../../components/Genres';

const Series = () => {
    const [ content, setContent ] = useState([])
    const [genres, setGenres] = useState([]);
    const [ selectedGenre, setSelectedGenre] = useState([])
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL = useGenre(selectedGenre);

    const fetchSeries = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
      };
    
      useEffect(() => {
        window.scroll(0, 0);
        fetchSeries();
               // eslint-disable-next-line
      }, [genreforURL,page]);
    return(<div>
        <span className="pageTitle">TV Series</span>
        <Genres
        type="tv"
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
        setGenres={setGenres}
        page={page}
        setPage={setPage}
      />
        <div className='trending'>
        {content &&
          content.map((movie) => (
            <SingleContent
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || content.name}
              date={movie.first_air_date || movie.release_date}
              media_type="tv"
              vote_average={movie.vote_average}
              overview={movie.overview}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>

    )
}

export default Series;