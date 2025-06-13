import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = false;  // no cookies needed

function CapitalQuiz() {
  const [country, setCountry]   = useState('');
  const [answer, setAnswer]     = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError]       = useState('');
  const [history, setHistory]   = useState([]);  // countries already asked

  const fetchCountry = async () => {
    setFeedback(''); setError('');
    try {
      const excludeParam = history.join(',');
      const res = await axios.get('/api/country/', {
        params: { exclude: excludeParam }
      });
      if (res.data.country) {
        setCountry(res.data.country);
      } else if (res.data.message) {
        setFeedback(res.data.message);
        setCountry('');
      }
    } catch (err) {
      setError("Couldn't fetch question. Try again.");
    }
  };

  const checkAnswer = async () => {
    if (!country) return;
    setFeedback(''); setError('');
    try {
      const res = await axios.post('/api/check/', {
        country,
        answer
      });
      if (res.data.correct) {
        setFeedback('✅ Correct!');
      } else {
        setFeedback(`❌ Incorrect! Answer: ${res.data.correct_answer}`);
      }
      // add to history so we won't see it again
      setHistory(h => [...h, country]);
    } catch {
      setError('Failed to check answer.');
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <div className="container">
      <h1>🌍 Capital Quiz</h1>
      {error && <p className="error">{error}</p>}
      {country
        ? <h2>What is the capital of <em>{country}</em>?</h2>
        : <h2>{feedback || 'No more questions!'}</h2>
      }
      {country && (
        <>
          <input
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Enter capital city"
          />
          <button onClick={checkAnswer}>Submit</button>
          <button onClick={() => { setAnswer(''); fetchCountry(); }}>
            Next Country
          </button>
        </>
      )}
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default CapitalQuiz;
