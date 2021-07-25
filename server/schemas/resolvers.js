const { User, Book } = require('./typeDefs')
const {AuthenticationError}  = require('apollo-server-express')
const signToken = require('../utils/auth')

const resolvers = {
        Query: {
            users: async () => {
                return User.find();
            },

            user: async (parent, { username }) => {
                return User.findOne({ name: username });
            },

            me: async (parent, args, context) => {
                if (context.user) {
                    return User.findOne({_id: context.user._id});
                }
             throw new AuthenticationError('You need to be logged in to see this!')
            },

        },

    Mutation: {
        login: async (parent, args) => {
            const user = await User.findOne({ $or: [{ username: args.username}, {email: args.email}] })
            if(!user) {
                throw new AuthenticationError('No user found with these credentials!')
            }

            const correctPw = await user.isCorrectPassword(args.password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect password!')
            }

            const token = signToken(user);

            return { token, user }
        },

        


    }




}