const { AuthenticationError } = require('apollo-server-express');
const { User, City } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('cities');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('cities');
    },
    cities: async (parent, { username }) => {
      const params = username ? { username } : {};
      return City.find(params).sort({ createdAt: -1 });
    },
    city: async (parent, { cityId }) => {
      return City.findOne({ _id: cityId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addCity: async (parent, { cityText, cityAuthor }) => {
      const city = await City.create({ cityText, cityAuthor });

      await User.findOneAndUpdate(
        { username: cityAuthor },
        { $addToSet: { cities: city._id } }
      );

      return city;
    },
    addFood: async (parent, { cityId, foodText, foodAuthor }) => {
      return City.findOneAndUpdate(
        { _id: cityId },
        {
          $addToSet: { foods: { foodText, foodAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeCity: async (parent, { cityId }) => {
      return City.findOneAndDelete({ _id: cityId });
    },
    removeFood: async (parent, { cityId, foodId }) => {
      return City.findOneAndUpdate(
        { _id: cityId },
        { $pull: { foods: { _id: foodId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
