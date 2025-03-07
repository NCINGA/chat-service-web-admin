import {gql} from '@apollo/client';

export const FETCH_SEAT_MAP = gql`
    query FetchSeatMap($configName: String!, $eventId: String!, $zoneId: String!) {
        fetchSeatMap(configName: $configName, eventId: $eventId, zoneId: $zoneId)
    }
`;

export const GET_ALL_USERS = gql`
    query GetAllUsers {
       getAllUsers
    }
`;

export const GET_USER_BY_ID = gql`
    query GetUserById($userId: String!) {
        getUserById(id: $userId) {
            username
            email
            role
        }
    }
`;   


export const REGISTER = gql`
  mutation Register(
    $username: String!
    $password: String!
    $email: String!
    $role: String!
  ) {
    register(username: $username, password: $password, email: $email, role: $role) {
      username
      email
      role
    }
  }
`;  



export const UPDATE_USERS = gql`
    mutation UpdateUser(
        $id: String!
        $username: String
        $password: String!
        $email: String!
        $role: String!
    ) {
        updateUser(id: $id, username: $username, password: $password, email: $email, role: $role) {
            id
            username
            password
            email
            role
            
}    
    }
`;

export const DELETE_MONGO_USER = gql`
    mutation DeleteMongoUser($id: String!) {
        deleteMongoUser(id: $id)
    }
`;