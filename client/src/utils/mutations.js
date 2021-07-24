import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
            _id
            username
            email
            password

             }
        }
    }
`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        password
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($title: String!, $authors: String!, $description: String!, $image: String!, link: String!){
    saveBook(title:$title, authors:$suhtors, description:$description, image:$image, link:$link){
        _id
        title
        authors
        description
        image
        link
    }
}`


export const DELETE_BOOK = gql`
mutation deleteBook($title: String!, $authors: String!, $description: String!, $image: String!, link: String!){
    deleteBook(title:$title, authors:$suhtors, description:$description, image:$image, link:$link){
        _id
        title
        authors
        description
        image
        link
    }
}`
