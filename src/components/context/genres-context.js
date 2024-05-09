import React, { createContext, useState, useContext, useEffect } from 'react';

import SwapiService from '../../services/swapi-service';

const GenresContext = createContext();

export const useGenres = () => useContext(GenresContext);

export function GenresProvider({ children }) {
  const [genres, setGenres] = useState({});
  const swapiService = new SwapiService();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await swapiService.getMovieGenres();
        setGenres(fetchedGenres);
      } catch (error) {

        console.error('Failed to fetch genres', error);
      }
    };

    fetchGenres();
  }, []);

  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>;
}
