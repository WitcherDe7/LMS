import React from 'react';
import { useLocation } from "react-router-dom";

export default function Success() {
    const location = useLocation();
    console.log("Location state:", location.state);

    return (
        <div>
            <h1>Login successful!</h1>
            {location.state ? (
                <p>Welcome, ({location.state.username}) ({location.state.email})</p>
            ) : (
                <p>No data found.</p>
            )}
        </div>
    );
}
