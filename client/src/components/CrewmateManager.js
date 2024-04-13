import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

function CrewmateManager() {
    const [crewmates, setCrewmates] = useState([]);
    const [name, setName] = useState('');
    const [attribute, setAttribute] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch crewmates from the database
    const fetchCrewmates = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('crewmates').select();
        if (error) console.log('Error fetching crewmates:', error);
        else setCrewmates(data);
        setLoading(false);
    };

    // Handle creation of crewmate
    const handleAdd = async () => {
        if (name && attribute) {
            const { data, error } = await supabase.from('crewmates').insert([{ name, attribute }]);
            if (error) console.log('Error adding crewmate:', error);
            else setCrewmates([...crewmates, ...data]);
            setName('');
            setAttribute('');
        }
    };

    // Handle update of crewmate
    const handleUpdate = async (id) => {
        const { data, error } = await supabase
            .from('crewmates')
            .update({ attribute })
            .match({ id });
        if (error) console.log('Error updating crewmate:', error);
        else {
            const updatedCrewmates = crewmates.map(crewmate => {
                if (crewmate.id === id) return { ...crewmate, attribute };
                return crewmate;
            });
            setCrewmates(updatedCrewmates);
        }
    };

    // Handle deletion of crewmate
    const handleDelete = async (id) => {
        const { data, error } = await supabase.from('crewmates').delete().match({ id });
        if (error) console.log('Error deleting crewmate:', error);
        else setCrewmates(crewmates.filter(crewmate => crewmate.id !== id));
    };

    useEffect(() => {
        fetchCrewmates();
    }, []);

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Attribute"
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
            />
            <button onClick={handleAdd}>Add Crewmate</button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                crewmates.map(crewmate => (
                    <div key={crewmate.id}>
                        <p>{crewmate.name} - {crewmate.attribute}</p>
                        <input
                            type="text"
                            placeholder="Update Attribute"
                            value={attribute}
                            onChange={(e) => setAttribute(e.target.value)}
                        />
                        <button onClick={() => handleUpdate(crewmate.id)}>Update</button>
                        <button onClick={() => handleDelete(crewmate.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default CrewmateManager;