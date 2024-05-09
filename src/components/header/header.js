import React, { useState } from 'react';
import { Tabs } from 'antd';

import MoviesList from '../movies-list/movies-list';
import RatedMoviesList from '../rated/rated';

function Header() {
  const [ratedTabKey, setRatedTabKey] = useState('1');

  const handleTabChange = (key) => {
    setRatedTabKey(key);
  };

  const items = [
    {
      label: 'Search',
      key: '1',
      children: <MoviesList />,
    },
    {
      label: 'Rated',
      key: '2',
      children: <RatedMoviesList onRatedTabClick={() => handleTabChange('2')} />,
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Tabs
        defaultActiveKey="1"
        activeKey={ratedTabKey}
        centered
        items={items}
        onChange={handleTabChange} 
        style={{ width: '100%', margin: 'auto' }}
      />
    </div>
  );
}

export default Header;
