import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {GET_PLAYERS } from '../../queries/queries';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import './PlayersList.css';

const PlayersList = () => {
    const [selectedID, setSelectedID] = useState(null);
    const { loading, error, data } = useQuery(GET_PLAYERS);

    const getPlayers = (data) => {
        let playersList = [];
        console.log(data);
        if (data)
            playersList = data.players.map(player => (
                <li key={player.id} onClick={(e) => setSelectedID(player.id)} >{player.name}</li>
        ));
        return playersList;
    }

    const playersList = getPlayers(data);
    if (loading)
        return <p>Loading ...</p>
    if (error)
        return <p>Error ...</p>
    return (
      <div>
        <ul id="player-list">
            { playersList }
        </ul>
        
        { selectedID ? <PlayerDetails playerId={selectedID} /> : <div className="player-details">No player selected...</div> }
      </div>
    );
}

export default PlayersList;
