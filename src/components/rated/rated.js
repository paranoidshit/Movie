import React, { useEffect, useState } from 'react';
import { Spin, Empty } from 'antd';

import SwapiService from '../../services/swapi-service';
import { useMovies } from '../context/movies-context';
import MoviesCard from '../movies-card/movies-card';

function RatedMoviesList({ onRatedTabClick }) {
  const { guestSessionId } = useMovies();
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const swapiService = new SwapiService();

  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        setLoading(true);
        const ratedMoviesData = await swapiService.getRatedMovie(guestSessionId);
        setRatedMovies(ratedMoviesData);
        setLoading(false);
      } catch (error) {
        setFetchError(error);
        setLoading(false);
      }
    };

    if (onRatedTabClick) {
      fetchRatedMovies(); // Вызываем fetchRatedMovies при каждом изменении onRatedTabClick
    }
  }, [guestSessionId, onRatedTabClick]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (fetchError) {
    return <Empty description="Ошибка при загрузке оценённых фильмов" />;
  }

  if (ratedMovies.length === 0) {
    return <Empty description="Вы ещё не оценили ни одного фильма" />;
  }

  return (
    <div className="movies-list">
      {ratedMovies.map((movie) => (
        <MoviesCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default RatedMoviesList;
