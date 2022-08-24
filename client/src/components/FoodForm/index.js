import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_FOOD } from '../../utils/mutations';

import Auth from '../../utils/auth';

const FoodForm = ({ cityId }) => {
  const [foodText, setFoodText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addFood, { error }] = useMutation(ADD_FOOD);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addFood({
        variables: {
          cityId,
          foodText,
          foodAuthor: Auth.getProfile().data.username,
        },
      });

      setFoodText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'foodText' && value.length <= 280) {
      setFoodText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>Add your restaurants</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="foodText"
                placeholder="Add your restaurants..."
                value={foodText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Restaurant
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your city. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default FoodForm;
