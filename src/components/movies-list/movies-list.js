import React, { useEffect } from 'react';
import { Input, Spin, Empty, Pagination } from 'antd';

import { useMovies } from '../context/movies-context';
import MoviesCard from '../movies-card/movies-card';

import './movies-list.css';

const { Search } = Input;

function MoviesList() {
  const {
    movieList,
    setMovieList,
    loading,
    fetchError,
    totalPages,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
  } = useMovies();
  
  useEffect(() => {
    if (searchTerm === '') {
      setMovieList([]);
      setCurrentPage(1);
    }
  }, [searchTerm, setMovieList, setCurrentPage]);


  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm !== searchTerm) {
      setCurrentPage(1);
    }
  };

  return (
    <div className="ml-container">
      <div className="movies-list">
        <Search
          placeholder="Введите название фильма"
          loading={loading}
          onChange={handleSearchChange}
          value={searchTerm}
        />
        {loading && <Spin size="large" />}
        {!loading && fetchError && <Empty description="Ошибка при загрузке фильмов" />}
        {!loading && !fetchError && movieList.length === 0 && !searchTerm && (
          <Empty description="Воспользуйтесь строкой ввода" />
        )}
        {!loading && !fetchError && movieList.length === 0 && searchTerm && (
          <Empty description="Ничего не найдено" />
        )}
        {!loading &&
          !fetchError &&
          movieList.length > 0 &&
          movieList.map((movie) => <MoviesCard key={movie.id} movie={movie} />)}
      </div>
      {searchTerm && totalPages > 0 && !fetchError && (
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={totalPages * 10}
          onChange={(page) => {
            setCurrentPage(page);
          }}
          showSizeChanger={false}
        />
      )}
    </div>
  );
}

export default React.memo(MoviesList);
