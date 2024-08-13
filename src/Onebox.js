import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomEditor from './CustomEditor';

function Onebox({ toggleTheme }) {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);

  const deleteThread = (id) => {
    axios.delete(`/onebox/${id}`)
      .then(() => setThreads(threads.filter(thread => thread.id !== id)))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    axios.get('/onebox/list')
      .then(response => setThreads(response.data))
      .catch(error => console.error(error));

    const handleKeyDown = (e) => {
      if (e.key === 'D' && selectedThread) {
        deleteThread(selectedThread.id);
      } else if (e.key === 'R' && selectedThread) {
        openReplyBox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedThread, deleteThread]); // Added deleteThread as a dependency

  const openReplyBox = () => {
    // Implement open reply box functionality
  };

  return (
    <div className="onebox">
      <h2>Onebox</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <ul>
        {threads.map(thread => (
          <li key={thread.id} onClick={() => setSelectedThread(thread)}>
            {thread.title}
          </li>
        ))}
      </ul>
      {selectedThread && (
        <div>
          <h3>{selectedThread.title}</h3>
          <CustomEditor threadId={selectedThread.id} />
        </div>
      )}
    </div>
  );
}

export default Onebox;
