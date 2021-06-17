import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PLAYER } from '../../queries/queries';
import './PlayerDetails.css';



const PlayerDetails = (props) => {
    const { loading, error, data } = useQuery(GET_PLAYER, { variables: {id: props.playerId } });
    
    let playerDetails = null;
    if (data) {
        const player = data.player;
        playerDetails = (
            <div>
                <h2>{player.name}</h2>
                <p>{player.nationality}</p>
                <p>{player.club.name}</p>
                <p>All players of {player.club.name}</p>
                <ul className="other-players">
                    {
                        player.club.players.map(player => (
                            <li key={player.id}>{player.name}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }

    if (loading)
        return <p>Loading ...</p>
    if (error)
        return <p>Error ...</p>
    return (
        <div className="player-details">
            { playerDetails }
        </div>
    )
}

export default PlayerDetails;