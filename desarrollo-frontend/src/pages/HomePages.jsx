import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigation } from '../components/Navigation';



export function HomePage() {
    //const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/name/`);

    return (
        <div>
            <Navigation></Navigation>
        </div>
    );
}


