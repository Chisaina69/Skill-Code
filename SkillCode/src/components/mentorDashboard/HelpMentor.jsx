import NavBar from './Navbar';
import React, { useState } from 'react';

const HelpMentor = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Support Team', message: 'How can I assist you?' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return; // Prevent sending empty messages

    // Add the user's message to the messages state
    setMessages([...messages, { sender: 'You', message: newMessage }]);

    setTimeout(() => {
      setMessages([
        ...messages,
        { sender: 'Support Team', message: 'I apologize, but I do not have information on that issue.' },
      ]);
    }, 1000);

    setNewMessage('');
  };

  const backgroundImageStyle = {

  };

  return (
    <div className='flex' >
        <NavBar />
    <div style={backgroundImageStyle}>
      <div className="w-full max-w-screen-md mx-auto p-4 bg-gradient-to-b mt-11 from-grey-100 grey-200 to-grey-100 rounded-lg shadow-lg">
        <div className="h-64 overflow-y-auto mb-4 p-2 bg-white bg-opacity-70 backdrop-blur rounded-lg shadow-md">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 mb-2 ${
                message.sender === 'You' ? 'bg-blue-200 text-blue-900' : 'bg-orange-600 text-white'
              } rounded-lg shadow-md`}
            >
              <span className="font-semibold">{message.sender}: </span>
              <span className="text-sm">{message.message}</span>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 rounded-lg shadow-md"
          />
          <button onClick={sendMessage} className="p-2 bg-blue-950 text-white rounded-lg shadow-md">
            Send
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HelpMentor;




