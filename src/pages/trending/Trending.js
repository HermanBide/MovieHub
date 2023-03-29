import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../components/singleContent/SingleContent";
import "./Trending.css"
import CustomPagination from "../../components/pagination/CustomPagination";

const Trending = () => {
  const [data, setData] = useState([]);
  const [page , setPage ] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

    const fetchTrending = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      console.log(data);
      setData(data.results);
    };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <h4 className="pageTitle">Now Trending</h4>
      <div className="trending">
        {data &&
          data.map((content) => (
            <SingleContent
              key={content.id}
              id={content.id}
              poster={content.poster_path}
              title={content.title || content.name}
              date={content.first_air_date || content.release_date}
              media_type={content.media_type}
              vote_average={content.vote_average}
              overview={content.overview}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage}/>
    </div>
  );
};

export default Trending;
