const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Book {
    bookId: String!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
}

input BookSearch {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    bookLink: String
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!) : Auth
    saveBook(bookData: BookSearch!) : User
    deleteBook(bookId: ID!) : User
}
`
module.exports = typeDefs;