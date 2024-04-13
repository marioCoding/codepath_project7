// src/components/CrewmateList.js
import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

const CrewmateList = () => {
    const [crewmates, setCrewmates] = useState([]);

    const fetchCrewmates = async () => {
        const { data, error } = await supabase
            .from('crewmates')
            .select('*');
        if (error) console.error('Error fetching crewmates:', error);
        else setCrewmates(data);
    };

    useEffect(() => {
        fetchCrewmates();
    }, []);

    return (
        <div>
            {crewmates.map((crewmate) => (
                <div key={crewmate.id}>
                    {crewmate.name} - {crewmate.attribute}
                </div>
            ))}
        </div>
    );
};

export default CrewmateList;