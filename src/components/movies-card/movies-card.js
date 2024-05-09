import React, { useCallback } from 'react';
import { Image, Tag, Rate } from 'antd';
import { format } from 'date-fns';

import { useGenres } from '../context/genres-context';
import { useMovies } from '../context/movies-context';
import SwapiService from '../../services/swapi-service';

import defaultPoster from './заглушка.jpg';
import './movies-card.css';

const swapiService = new SwapiService();
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
  if (lastSpaceIndex !== -1) {
    return text.substring(0, lastSpaceIndex) + '...';
  }
  return text.substring(0, maxLength) + '...';
}

function limitTitle(title) {
  const maxLength = 20;
  return title.length <= maxLength ? title : `${title.substring(0, maxLength - 3)}...`;
}

function formatDate(date) {
  return date ? format(new Date(date), 'MMMM d, yyyy') : '';
}

function shortDes(description) {
  const maxLength = 100;
  return truncateText(description, maxLength);
}

function getColorForRating(rating) {
  if (rating >= 0 && rating < 3) {
    return '#E90000';
  } else if (rating >= 3 && rating < 5) {
    return '#E97E00';
  } else if (rating >= 5 && rating < 7) {
    return '#E9D100';
  } else {
    return '#66E900';
  }
}

function MoviesCard({ movie }) {
  const genreNames = useGenres();
  const guestSession = useMovies();
  if (!movie) return null;
  const {
    title,
    id: idMovie,
    poster_path: posterPath,
    release_date: releaseDate,
    overview,
    vote_average: rating,
    genre_ids: genreIds,
  } = movie;
  const formattedReleaseDate = formatDate(releaseDate);
  const imageSrc = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : defaultPoster;
  const color = getColorForRating(rating);

  const handleRateChange = useCallback(
    (value) => {
      swapiService.addMovieRating(idMovie, value, guestSession.guestSessionId);
    },
    [idMovie, guestSession.guestSessionId]
  );

  return (
    <div className="movie-card">
      <div className="movie-card__image">
        <Image src={imageSrc} alt={title} />
      </div>
      <div className="movie-card__header">
        <div className="rate-circle" style={{ borderColor: color }}>
          {rating.toFixed(1)}
        </div>

        <div className="movie-card__info">
          <h2>{limitTitle(title)}</h2>
          <p className="movie-card__date">{formattedReleaseDate}</p>
          <div className="tags">
            {genreIds.map((id) => (
              <Tag key={id}>{genreNames[id]}</Tag>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="movie-card__overview">{shortDes(overview)}</p>
        <Rate
          className="movie-card__Rate"
          allowHalf
          defaultValue={0}
          count={10}
          onChange={handleRateChange}
        />
      </div>
    </div>
  );
}

export default MoviesCard;
