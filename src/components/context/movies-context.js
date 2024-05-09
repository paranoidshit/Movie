import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

import SwapiService from '../../services/swapi-service';

const MoviesContext = createContext();

export const useMovies = () => useContext(MoviesContext);

export function MoviesProvider({ children }) {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesState, setTotalPagesState] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [guestSessionId, setGuestSessionId] = useState({});
  const swapiService = new SwapiService();


  
  const fetchMovies = async (term, page) => {
    try {
      setLoading(true);
      const movies = await swapiService.getOfNameMovies(term, page);
      const totalPages = await swapiService.getTotalPages(term, page);
      setMovieList(movies);
      setTotalPagesState(totalPages);
      setLoading(false);
    } catch (error) {
      setFetchError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm, currentPage);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    const fetchGuestSession = async () => {
      try {
        const fetchedGuestSession = await swapiService.createGuestSession();
        setGuestSessionId(fetchedGuestSession);
      } catch (error) {
        console.error('Failed to fetch guestSession', error);
      }
    };

    fetchGuestSession();
  }, []);

  const value = useMemo(
    () => ({
      movieList,
      setMovieList,
      loading,
      setLoading,
      fetchError,
      setFetchError,
      currentPage,
      setCurrentPage,
      totalPages: totalPagesState,
      setTotalPages: setTotalPagesState,
      searchTerm,
      setSearchTerm,
      guestSessionId,
    }),
    [movieList, loading, fetchError, currentPage, totalPagesState, searchTerm]
  );

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
}
