const { User } = require('./typeDefs')
const AuthenticationError = require('apollo-server-express')
const signToken = require('../utils/auth')

