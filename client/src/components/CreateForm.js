// src/components/CreateForm.js
import React, { useState } from 'react';
import supabase from '../supabaseClient';

const CreateForm = () => {
    const [name, setName] = useState('');
    const [attribute, setAttribute] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('crewmates')
            .insert([{ name, attribute }]);
        if (error) console.error('Error inserting:', error);
        else {
            console.log('Added crewmate:', data);
            setName('');
            setAttribute('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Crewmate Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Attribute"
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
            />
            <button type="submit">Add Crewmate</button>
        </form>
    );
};

export default CreateForm;