import React, { useState } from 'react';
import axios from 'axios';

function PythonAPI() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleRequest = () => {
    // Replace with the URL of your API
    const apiUrl = 'http://127.0.0.1:5000/generate-response';

    axios
      .post(apiUrl, { prompt: prompt })
      .then((res) => {
        setResponse(res.data.response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <label>Enter a prompt: </label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <button onClick={handleRequest}>Generate Response</button>
      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default PythonAPI;
