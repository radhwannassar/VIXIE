
import React, { useState } from 'react';
import './Home.css'; 

const Home = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = () => {
        if (!input) return;
        setMessages([...messages, { content: input, sender: 'User' }]);
        setInput('');

        // Simulate chatbot response
        setMessages((prevMessages) => [
            ...prevMessages,
            { content: 'Chatbot response to: ' + input, sender: 'Bot' },
        ]);
    };

    return (
        <div className="dash-container">
            <h2>Car Performance</h2>
            <div className="dashboard">
                <h3>Engine RPM: 2500</h3>
                <h3>Fuel Level: 75%</h3>
            </div>
            <div className="chatbot-container">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender}>
                            {msg.content}
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
