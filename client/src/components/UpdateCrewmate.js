// src/components/UpdateCrewmate.js
import React, { useState } from 'react';
import supabase from '../supabaseClient';

const UpdateCrewmate = ({ id }) => {
    const [attribute, setAttribute] = useState('');

    const handleUpdate = async () => {
        const { data, error } = await supabase
            .from('crewmates')
            .update({ attribute })
            .match({ id });
        if (error) console.error('Error updating crewmate:', error);
        else console.log('Updated crewmate:', data);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="New Attribute"
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
            />
            <button onClick={handleUpdate}>Update Attribute</button>
        </div>
    );
};

export default UpdateCrewmate;
