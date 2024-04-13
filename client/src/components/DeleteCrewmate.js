// src/components/DeleteCrewmate.js
import React from 'react';
import supabase from '../supabaseClient';

const DeleteCrewmate = ({ id }) => {
    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('crewmates')
            .delete()
            .match({ id });
        if (error) console.error('Error deleting crewmate:', error);
        else console.log('Deleted crewmate:', data);
    };

    return (
        <button onClick={handleDelete}>Delete Crewmate</button>
    );
};

export default DeleteCrewmate;
