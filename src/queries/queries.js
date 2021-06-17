import { gql } from '@apollo/client';

const GET_CLUBS = gql`
        {
            clubs {
                id
                name
            }
        }
    `;

const GET_PLAYERS = gql`
    {
        players {
            id
            name
        }
    }
`;

const ADD_PLAYER_MUTATION = gql`
    mutation($name: String!, $nationality: String!, $club_id: ID!) {
        addPlayer(name: $name, nationality: $nationality, club_id: $club_id) {
            id
            name
        }
    }
`;

const GET_PLAYER = gql`
    query($id: ID!) {
        player(id: $id) {
            id
            name
            nationality
            club{
                id
                name
                trophies
                players{
                    id
                    name
                }
            }
        }
    }
`;

export { GET_CLUBS, GET_PLAYERS, ADD_PLAYER_MUTATION, GET_PLAYER };