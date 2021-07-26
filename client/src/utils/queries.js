import { gql } from '@apollo/client'

export const GET_ME = gql`{
    query me {
        user {
            _id
            username
            savedBooks {
                _id
                title
                authors
                description
                image
                link
            }
         }
    }
}`