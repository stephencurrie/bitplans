import React from 'react';

const FoodList = ({ foods = [] }) => {
  if (!foods.length) {
    return <h3>No Restaurants Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Restaurants
      </h3>
      <div className="flex-row my-4">
        {foods &&
          foods.map((food) => (
            <div key={food._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {food.foodAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {food.createdAt}
                  </span>
                </h5>
                <p className="card-body">{food.foodText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default FoodList;
