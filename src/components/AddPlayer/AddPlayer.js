import React, { useState } from 'react';
import { useQuery, useMutation  } from '@apollo/client';
import { GET_CLUBS, ADD_PLAYER_MUTATION, GET_PLAYERS } from '../../queries/queries';
import './AddPlayer.css';



const getClubs = (data) => {
    let clubsList = [];

    if (data) {
        clubsList = data.clubs.map(club => (
            <option key={club.id} value={club.id} >{club.name}</option>
        ));
    }
    return clubsList;
}

const AddPlayer = () => {
    const [ name, setName ] = useState("");
    const [ nationality, setNationality ] = useState("");
    const [ club_id, setClubId ] = useState("");
    const { loading, error, data } = useQuery(GET_CLUBS);
    const [ addPlayerMutation ] = useMutation(ADD_PLAYER_MUTATION);
    

    const clubsList = getClubs(data);

    const submitForm = (e) => {
        e.preventDefault();

        if (name === "" || nationality === "" || club_id === "")
            return;

        addPlayerMutation({
            variables: { name, nationality, club_id },
            refetchQueries: [{ query: GET_PLAYERS }]
        });
        setName("");
        setNationality("");
        setClubId("");
    }

    if (loading)
        return <p>Loading ...</p>
    if (error)
        return <p>Error ...</p>
    return (
        <form id="add-player" onSubmit={submitForm}>
            <div className="field">
                <label>Player name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value) } />
            </div>

            <div className="field">
                <label>Nationality:</label>
                <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value) } />
            </div>

            <div className="field">
                <label>Club:</label>
                <select value={club_id} onChange={(e) => setClubId(e.target.value) } >
                    <option>Select a club</option>
                    { clubsList }
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default AddPlayer;
