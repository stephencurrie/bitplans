import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_CITY } from '../../utils/mutations';
import { QUERY_CITIES } from '../../utils/queries';

import Auth from '../../utils/auth';

const CityForm = () => {
  const [cityText, setCityText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addCity, { error }] = useMutation(ADD_CITY, {
    update(cache, { data: { addCity } }) {
      try {
        const { cities } = cache.readQuery({ query: QUERY_CITIES });

        cache.writeQuery({
          query: QUERY_CITIES,
          data: { cities: [addCity, ...cities] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCity({
        variables: {
          cityText,
          cityAuthor: Auth.getProfile().data.username,
        },
      });

      setCityText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'cityText' && value.length <= 280) {
      setCityText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="cityText"
                placeholder="Here's a new city..."
                value={cityText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add City
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add a city. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CityForm;
