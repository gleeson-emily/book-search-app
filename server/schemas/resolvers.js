const { User, Book } = require('./typeDefs')
const { AuthenticationError } = require('apollo-server-express')
const signToken = require('../utils/auth')

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, {username}) => {
            return User.findOne({ username: username });
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
        },

        saveBook: async (parent, { bookData }, context) => {
            if(context.user) {
              const userBooks = await User.findByIdAndUpdate(
                  { _id: context.user._id },
                  { $push: { savedBooks: bookData } },
                  { new: true, runValidators: true }
              );

              return userBooks;

            }
            throw new AuthenticationError('Error! Please try again.')
        },
        
        removeBook: async (parent, { bookId }, context) => {
            if(context.user){
                const userBook = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                )
                return userBook;
            }
            throw new AuthenticationError('Error! You must be logged in to perform this action.')
        }
    }
}

module.exports = resolvers;