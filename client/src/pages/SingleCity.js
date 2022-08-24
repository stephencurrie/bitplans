import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import FoodList from '../components/FoodList';
import FoodForm from '../components/FoodForm';

import { QUERY_SINGLE_CITY } from '../utils/queries';

const SingleCity = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { cityId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_CITY, {
    // pass URL parameter
    variables: { cityId: cityId },
  });

  const city = data?.city || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {city.cityAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {city.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {city.cityText}
        </blockquote>
      </div>

      <div className="my-5">
        <FoodList comments={city.foods} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <FoodForm cityId={city._id} />
      </div>
    </div>
  );
};

export default SingleCity;
