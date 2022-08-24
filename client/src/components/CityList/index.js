import React from 'react';
import { Link } from 'react-router-dom';

const CityList = ({ cities, title }) => {
  if (!cities.length) {
    return <h3>No Cities Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {cities &&
        cities.map((city) => (
          <div key={city._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {city.cityAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                had this thought on {city.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{city.cityText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/cities/${city._id}`}
            >
              Join the discussion on this city.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default CityList;
