import React from 'react';
import { Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import { MoviesProvider } from '../context/movies-context';
import { GenresProvider } from '../context/genres-context';
import Header from '../header/header';

function App() {
  return (
    <MoviesProvider>
      <GenresProvider>
        <div className="app">
          <Online>
            <Header />
          </Online>
          <Offline>
            <Alert message="Error" description="К сожалению ты не в сети(" type="error" showIcon />
          </Offline>
        </div>
      </GenresProvider>
    </MoviesProvider>
  );
}

export default App;
