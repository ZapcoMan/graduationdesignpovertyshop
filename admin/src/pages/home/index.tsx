import React from 'react';
import ChartsComponent from './ChartsComponent';
import TopComponent from './TopComponent';

const HomePage: React.FC = () => {
  return (
    <div>
      <TopComponent />
      <ChartsComponent />
    </div>
  );
};

export default HomePage;
