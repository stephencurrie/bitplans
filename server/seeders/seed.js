const db = require('../config/connection');
const { User, City } = require('../models');
const userSeeds = require('./userSeeds.json');
const citySeeds = require('./citySeeds.json');

db.once('open', async () => {
  try {
    await City.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < citySeeds.length; i++) {
      const { _id, cityAuthor } = await City.create(citySeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: cityAuthor },
        {
          $addToSet: {
            cities: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
