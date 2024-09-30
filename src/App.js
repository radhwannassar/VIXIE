import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css'; 
import logo from './Logoc.svg';

Amplify.configure(awsExports);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [popups, setPopups] = useState([]);
  
  // Popup for low fuel warning
  useEffect(() => {
    const popupInterval = setInterval(() => {
      setPopups((prev) => {
        // Show popup only if not already displayed
        return prev.length === 0 
          ? ['Fuel level is critical! Please refuel soon.'] 
          : [];
      });
    }, 7000);

    return () => clearInterval(popupInterval);
  }, []);
  
  // Static car status data
  const staticCarStatus = [
    { sensor: 'Battery', state: '25%' },
    { sensor: 'Fuel', state: '15%' },
    { sensor: 'Oil Pressure', state: 'Normal' },
  ];

  // Static car advice data
  const staticAdvice = "It's a good idea to monitor the battery charge and consider recharging soon. Please refuel soon to avoid running out of fuel.";

  // Send message and provide static responses
  const sendMessage = () => {
    if (!input.trim()) return; // Check for empty input

    setMessages(prev => [...prev, `User: ${input}`]); // Update messages

    // Respond based on user input
    handleUserInput(input.toLowerCase());
    
    setInput(''); // Clear input field
  };

  // Handle user input and return static responses
  const handleUserInput = (input) => {
    if (input === "what's my car status") {
      const statusMessages = staticCarStatus.map(item => `${item.sensor}: ${item.state}`).join(', ');
      setMessages(prev => [...prev, `Vixie: Current car status: ${statusMessages}`]);
    } else if (input === "advise me") {
      setMessages(prev => [...prev, `Vixie: ${staticAdvice}`]);
    } else if (input.toLowerCase() === "hey vixie") {
        setMessages(prev => [...prev, `Vixie: Hello!`]);
        setTimeout(() => {
            setMessages(prev => [...prev, `Vixie: How can I help you?`]);
        }, 2000);
        
    } else if (input === "thanks") {
      setMessages(prev => [...prev, `Vixie: Check me out if you need me! or just say hey vixie :)`]);
    } else {
      setMessages(prev => [...prev, `Vixie: Sorry, I didn't understand that.`]);
    }
  };

  // Show status for specific parts
  const showPartStatus = (partName) => {
    setStatus(`${partName} Status: All systems are functioning normally.`);
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <Authenticator>
      {({ signOut }) => (
        <div className="app-container">
          <div className="logo-container">
            <img src={logo} alt="App Logo" className="logo" />
          </div>
          {currentPage === 'home' ? (
            <div className="page">
              <div className="container">
                <div className="dashboard">
                  <div className="dashboard-card">
                    <h3>Battery level is currently at 25%. Consider recharging soon.</h3>
                  </div>
                  <div className="dashboard-card">
                    <h3>Warning: Fuel level is currently at 15%. Please refuel soon!</h3>
                  </div>
                </div>
                <div className="chatbot-container">
                  <div className="messages">
                    {messages.map((msg, index) => (
                      <div key={index}>{msg}</div>
                    ))}
                  </div>
                  <div className="input-container">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="How can I assist you?"
                    />
                    <button onClick={sendMessage}>Send</button>
                  </div>
                </div>
                <button onClick={() => setCurrentPage('parts')}>Go to Parts</button>
              </div>
              <div className="popup" style={{ display: popups.length > 0 ? 'block' : 'none' }}>
                {popups[0]}
              </div>
              {status && <div className="status-box">{status}</div>}
            </div>
          ) : (
            <div className="page">
              <div className="parts-container">
                {['Engine RPM', 'Engine Temperature', 'Oil Pressure', 'Battery Voltage', 'Fuel Level', 'Tire Pressure', 'Oxygen', 'Exhaust Gas Temperature'].map((part, index) => (
                  <div key={index} className="part-card" onClick={() => showPartStatus(part)}>
                    {part}
                  </div>
                ))}
              </div>
              <button onClick={() => setCurrentPage('home')}>Go Back</button>
              {status && <div className="status-box">{status}</div>}
            </div>
          )}
        </div>
      )}
    </Authenticator>
  );
};

export default App;
