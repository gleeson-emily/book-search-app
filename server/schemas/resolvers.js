const { User, Book } = require('./typeDefs')
const { AuthenticationError } = require('apollo-server-express')
const signToken = require('../utils/auth')

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, {username}) => {
            return User.findOne({username: username});
        },

        me: async (parent, args, context) => {
            if (context.user) {
              return Profile.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in to view this!');
          },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {;
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('No user found! Please check the email address you entered.')
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect password! Please try again.')
            }

            const token = signToken(user);
            return { token, user };
        }
    }
}
