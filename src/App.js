// src/App.js
import React, { useState } from 'react';
import PartsCondition from './PartsCondition';
import './App.css'; // Import your CSS file
import Home from './Home';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="app-container">
            <div className="navigation">
                <button onClick={() => handlePageChange('home')}>Home</button>
                <button onClick={() => handlePageChange('parts-condition')}>Parts Condition</button>
            </div>
            <div className="page">
                {currentPage === 'home' && <Home />}
                {currentPage === 'parts-condition' && <PartsCondition />}
            </div>
        </div>
    );
};

export default App;
