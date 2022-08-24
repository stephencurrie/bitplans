import React from 'react';
import { useQuery } from '@apollo/client';

import CityList from '../components/CityList';
import CityForm from '../components/CityForm';

import { QUERY_CITIES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_CITIES);
  const cities = data?.cities || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <CityForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CityList
              cities={cities}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
