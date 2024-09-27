// src/App.js
import React, { useState } from 'react';
import PartsCondition from './PartsCondition';
import './App.css'; // Import your CSS file
import Home from './Home';
import {Amplify} from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';




Amplify.configure(awsExports);

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Authenticator>
            {({ signOut }) => (
        <div className="app-container">
            <div className="navigation">
                <button onClick={() => handlePageChange('home')}>Home</button>
                <button onClick={() => handlePageChange('parts-condition')}>Parts Condition</button>
            </div>
            <div className="page">
                {currentPage === 'home' && <Home />}
                {currentPage === 'parts-condition' && <PartsCondition />}
            </div>
            <button 
                onClick={signOut} 
                style={{ 
                  margin: '20px', 
                  fontSize: '0.8rem', 
                  padding: '5px 10px', 
                  marginTop: '20px'
                }}
              >
                Sign Out
              </button>
        </div>
        )}
        </Authenticator>
    );
};

export default App;
