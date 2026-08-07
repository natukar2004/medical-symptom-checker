import React, { useEffect, useState } from 'react';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [symptoms, setSymptoms] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetch('/api/questions')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load questions');
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoadError(err.message);
        setLoading(false);
      });
  }, []);

  const submitForAnalysis = async (finalSymptoms) => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: finalSymptoms })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult(null);
    } finally {
      setAnalyzing(false);
      setShowResult(true);
    }
  };

  const handleAnswer = (answer) => {
    const q = questions[currentQuestion];
    const updated = { ...symptoms, [q.id]: answer };
    setSymptoms(updated);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitForAnalysis(updated);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSymptoms({});
    setShowResult(false);
    setResult(null);
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="page">
        <div className="container">
          <p>Could not reach the server: {loadError}</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <h1>🏥 Medical Symptom Checker</h1>
          <p>Answer questions about your symptoms for analysis</p>
        </div>

        {!showResult ? (
          <>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="question-counter">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="question">
              <h2>{questions[currentQuestion].question}</h2>
              <div className="button-group">
                <button className="btn-yes" onClick={() => handleAnswer(true)} disabled={analyzing}>
                  Yes
                </button>
                <button className="btn-no" onClick={() => handleAnswer(false)} disabled={analyzing}>
                  No
                </button>
              </div>
            </div>
            {analyzing && <p className="analyzing">Analyzing…</p>}
          </>
        ) : (
          <div>
            <h2 className="results-title">📋 Analysis Results</h2>

            {result && result.matched ? (
              <div className="result-box">
                <div className="result-title">Possible Condition: {result.name}</div>
                <div className="progress-meter">
                  <div className="progress-bar-result">
                    <div
                      className="progress-fill-result"
                      style={{ width: `${Math.round(result.matchPercentage)}%` }}
                    />
                  </div>
                  <span className="percentage">{Math.round(result.matchPercentage)}%</span>
                </div>
                <p className="description">{result.description}</p>
                <div className="treatment-section">
                  <p className="treatment-label">Recommended Treatment:</p>
                  <p className="treatment-text">{result.treatment}</p>
                </div>
                <div className="warning-box">
                  <p className="warning-title">⚠️ Important:</p>
                  <p className="warning-text">{result.warning}</p>
                </div>
                <div className="warning-box">
                  <p className="warning-title">⚕️ Medical Disclaimer:</p>
                  <p className="warning-text">
                    This tool is for educational purposes only. Always consult with a qualified
                    healthcare professional for accurate diagnosis and treatment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="result-box">
                <p className="no-match">
                  Unable to match symptoms. Please consult a healthcare professional.
                </p>
              </div>
            )}

            <button className="btn-primary" onClick={handleReset}>
              Start Over
            </button>
          </div>
        )}
      </div>

      <div className="footer">
        <p>Made with ❤️ for health awareness | Always consult healthcare professionals</p>
      </div>
    </div>
  );
};

export default App;
