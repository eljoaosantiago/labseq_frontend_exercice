import React, { useState } from 'react';
import './App.css';

function App() {
  const [index, setIndex] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleClickLabseqValue = async () => {
    try {
      if (index >= 0) {

        const response = await fetch(`http://localhost:8080/labseq/${index}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResult(data);
        setError(null);
      } else {
        setError("You have entered a negative number. Please enter a number greater than zero!")
      }
    } catch (error) {
      setError(error.message);
      setResult(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Labseq Sequence</h1>
        <div className="d-flex">
          l({' '}
          <input
            type="number"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            placeholder="Enter index"
          />
          {' '})
          {' '}
          {' '}
          <button onClick={handleClickLabseqValue}>Get Value</button>
        </div>
        {result !== null && <p>Result = {result}</p>}
        {error && <p>Error: {error}</p>}
      </header>
    </div>
  );
}

export default App;
