import React, { useState } from 'react';

const MedicalDiagnosisApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [symptoms, setSymptoms] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [predictedDisease, setPredictedDisease] = useState(null);

  // Disease definitions with questions and symptom mappings
  const diseases = [
    {
      name: 'Common Cold',
      symptoms: ['fever', 'cough', 'headache', 'sore_throat', 'runny_nose'],
      requiredCount: 3,
      confidence: 85,
      description: 'A viral infection affecting the upper respiratory tract.',
      treatment: 'Rest, fluids, vitamin C supplements, decongestants',
      warning: 'Usually resolves in 7-10 days',
    },
    {
      name: 'Dengue Fever',
      symptoms: ['fever', 'headache', 'body_pain', 'joint_pain', 'rash'],
      requiredCount: 4,
      confidence: 90,
      description: 'A mosquito-borne viral infection causing severe fever and pain.',
      treatment: 'Hospitalization may be needed, supportive care, platelet monitoring',
      warning: 'Requires immediate medical attention if symptoms worsen',
    },
    {
      name: 'Migraine',
      symptoms: ['headache', 'nausea', 'vision_changes', 'sensitivity_to_light'],
      requiredCount: 2,
      confidence: 80,
      description: 'A neurological condition causing severe headaches.',
      treatment: 'Pain relievers, preventive medications, rest in dark quiet room',
      warning: 'If headache is sudden and severe, seek emergency care',
    },
    {
      name: 'Gastroenteritis',
      symptoms: ['vomiting', 'diarrhea', 'fever', 'stomach_pain', 'nausea'],
      requiredCount: 3,
      confidence: 88,
      description: 'Inflammation of stomach and intestines, usually from infection.',
      treatment: 'Oral rehydration, bland diet, anti-nausea medication if needed',
      warning: 'Stay hydrated to prevent dehydration',
    },
    {
      name: 'Arthritis',
      symptoms: ['joint_pain', 'ankle_pain', 'swelling', 'stiffness'],
      requiredCount: 2,
      confidence: 75,
      description: 'Inflammation of joints causing pain and reduced mobility.',
      treatment: 'Anti-inflammatory medications, physical therapy, heat/cold therapy',
      warning: 'Chronic condition requiring long-term management',
    },
    {
      name: 'Influenza (Flu)',
      symptoms: ['fever', 'cough', 'headache', 'body_pain', 'fatigue'],
      requiredCount: 4,
      confidence: 92,
      description: 'Contagious respiratory illness caused by influenza virus.',
      treatment: 'Antiviral medications, rest, fluids, fever management',
      warning: 'Can lead to serious complications, especially in high-risk groups',
    },
  ];

  const questions = [
    {
      id: 'fever',
      question: 'Do you have a fever?',
      type: 'yes_no',
      followUp: 'What is your body temperature (in °C)?',
      followUpType: 'number',
    },
    {
      id: 'cough',
      question: 'Do you have a cough?',
      type: 'yes_no',
      followUp: 'Is it a dry cough or with phlegm?',
      followUpType: 'options',
      followUpOptions: ['Dry cough', 'With phlegm', 'Not sure'],
    },
    {
      id: 'headache',
      question: 'Do you have a headache?',
      type: 'yes_no',
      followUp: 'On a scale of 1-10, how severe is it?',
      followUpType: 'range',
    },
    {
      id: 'body_pain',
      question: 'Do you experience body/muscle pain?',
      type: 'yes_no',
      followUp: 'Which areas? (Select all that apply)',
      followUpType: 'checkbox',
      followUpOptions: ['Arms', 'Legs', 'Back', 'Chest'],
    },
    {
      id: 'joint_pain',
      question: 'Do you have joint pain?',
      type: 'yes_no',
    },
    {
      id: 'ankle_pain',
      question: 'Do you have ankle pain?',
      type: 'yes_no',
      followUp: 'Is there any swelling?',
      followUpType: 'yes_no',
    },
    {
      id: 'nausea',
      question: 'Do you feel nauseous?',
      type: 'yes_no',
    },
    {
      id: 'vomiting',
      question: 'Are you vomiting?',
      type: 'yes_no',
    },
    {
      id: 'diarrhea',
      question: 'Do you have diarrhea?',
      type: 'yes_no',
    },
    {
      id: 'stomach_pain',
      question: 'Do you have stomach pain?',
      type: 'yes_no',
    },
    {
      id: 'sore_throat',
      question: 'Do you have a sore throat?',
      type: 'yes_no',
    },
    {
      id: 'runny_nose',
      question: 'Do you have a runny or stuffy nose?',
      type: 'yes_no',
    },
    {
      id: 'rash',
      question: 'Do you have any rash on your body?',
      type: 'yes_no',
    },
    {
      id: 'vision_changes',
      question: 'Do you experience vision changes or blurred vision?',
      type: 'yes_no',
    },
    {
      id: 'sensitivity_to_light',
      question: 'Are you sensitive to light?',
      type: 'yes_no',
    },
    {
      id: 'swelling',
      question: 'Do you have any joint swelling?',
      type: 'yes_no',
    },
    {
      id: 'stiffness',
      question: 'Do you experience joint stiffness?',
      type: 'yes_no',
    },
    {
      id: 'fatigue',
      question: 'Do you feel unusually tired or fatigued?',
      type: 'yes_no',
    },
  ];

  const analyzeDiseases = () => {
    const matches = diseases.map((disease) => {
      const matchingSymptoms = disease.symptoms.filter(
        (symptom) => symptoms[symptom] === true
      ).length;
      const matchPercentage = (matchingSymptoms / disease.symptoms.length) * 100;
      return {
        ...disease,
        matchingCount: matchingSymptoms,
        matchPercentage,
        score: matchPercentage > 50 ? matchPercentage : 0,
      };
    });

    return matches
      .filter((d) => d.score > 0)
      .sort((a, b) => b.score - a.score)[0];
  };

  const handleYesNo = (answer) => {
    const currentQ = questions[currentQuestion];
    setSymptoms({
      ...symptoms,
      [currentQ.id]: answer,
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinish();
    }
  };

  const handleFollowUp = (value) => {
    const currentQ = questions[currentQuestion];
    setSymptoms({
      ...symptoms,
      [currentQ.id]: true,
      [`${currentQ.id}_detail`]: value,
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinish();
    }
  };

  const handleCheckbox = (values) => {
    const currentQ = questions[currentQuestion];
    setSymptoms({
      ...symptoms,
      [currentQ.id]: values.length > 0,
      [`${currentQ.id}_detail`]: values,
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const result = analyzeDiseases();
    setPredictedDisease(result);
    setShowResult(true);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSymptoms({});
    setShowResult(false);
    setPredictedDisease(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          padding: '40px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#667eea', margin: '0 0 10px 0', fontSize: '28px' }}>
            🏥 Medical Symptom Checker
          </h1>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            Answer questions about your symptoms for analysis
          </p>
        </div>

        {!showResult ? (
          <>
            {/* Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '8px',
                background: '#e0e0e0',
                borderRadius: '4px',
                marginBottom: '30px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  width: `${progress}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            {/* Question Counter */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '25px',
                color: '#999',
                fontSize: '14px',
              }}
            >
              Question {currentQuestion + 1} of {questions.length}
            </div>

            {/* Current Question */}
            <div style={{ marginBottom: '30px' }}>
              <h2
                style={{
                  color: '#333',
                  fontSize: '20px',
                  margin: '0 0 20px 0',
                  fontWeight: '500',
                }}
              >
                {currentQ.question}
              </h2>

              {/* Yes/No Buttons */}
              {currentQ.type === 'yes_no' && !currentQ.followUp && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => handleYesNo(true)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = '#5568d3')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = '#667eea')
                    }
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleYesNo(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#e0e0e0',
                      color: '#333',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = '#d0d0d0')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = '#e0e0e0')
                    }
                  >
                    No
                  </button>
                </div>
              )}

              {/* Follow-up Questions */}
              {currentQ.followUp && symptoms[currentQ.id] === true && (
                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                  <p
                    style={{
                      color: '#666',
                      fontSize: '14px',
                      marginBottom: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    {currentQ.followUp}
                  </p>

                  {currentQ.followUpType === 'number' && (
                    <input
                      type='number'
                      step='0.1'
                      placeholder='Enter temperature'
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxSizing: 'border-box',
                        marginBottom: '12px',
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleFollowUp(e.target.value);
                        }
                      }}
                    />
                  )}

                  {currentQ.followUpType === 'range' && (
                    <div>
                      <input
                        type='range'
                        min='1'
                        max='10'
                        defaultValue='5'
                        style={{ width: '100%', marginBottom: '12px' }}
                        id='severity'
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          color: '#999',
                          marginBottom: '12px',
                        }}
                      >
                        <span>Mild</span>
                        <span id='severity-value' style={{ color: '#667eea', fontWeight: 'bold' }}>
                          5
                        </span>
                        <span>Severe</span>
                      </div>
                    </div>
                  )}

                  {currentQ.followUpType === 'options' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {currentQ.followUpOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleFollowUp(option)}
                          style={{
                            padding: '10px',
                            background: '#f5f5f5',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#667eea';
                            e.target.style.color = 'white';
                            e.target.style.borderColor = '#667eea';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#f5f5f5';
                            e.target.style.color = 'inherit';
                            e.target.style.borderColor = '#ddd';
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {currentQ.followUpType === 'checkbox' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {currentQ.followUpOptions.map((option) => (
                        <label
                          key={option}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                          }}
                        >
                          <input
                            type='checkbox'
                            value={option}
                            style={{ cursor: 'pointer' }}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {currentQ.followUpType === 'yes_no' && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={() => handleFollowUp(true)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                        }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleFollowUp(false)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: '#e0e0e0',
                          color: '#333',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                        }}
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* No condition for follow-up */}
              {currentQ.followUp && symptoms[currentQ.id] === false && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => {
                      if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                      } else {
                        handleFinish();
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Result Screen */
          <div>
            <h2 style={{ color: '#667eea', textAlign: 'center', marginBottom: '20px' }}>
              📋 Analysis Results
            </h2>

            {predictedDisease ? (
              <div
                style={{
                  background: '#f0f7ff',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px',
                }}
              >
                <h3 style={{ color: '#667eea', margin: '0 0 10px 0' }}>
                  Possible Condition: {predictedDisease.name}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '15px',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '10px',
                      background: '#e0e0e0',
                      borderRadius: '5px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, #667eea 0%, #764ba2 100%)`,
                        width: `${Math.round(predictedDisease.matchPercentage)}%`,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: '#667eea',
                      minWidth: '50px',
                    }}
                  >
                    {Math.round(predictedDisease.matchPercentage)}%
                  </span>
                </div>
                <p style={{ color: '#333', margin: '0 0 15px 0', lineHeight: '1.6' }}>
                  {predictedDisease.description}
                </p>

                <div style={{ marginBottom: '15px' }}>
                  <p style={{ color: '#666', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                    Recommended Treatment:
                  </p>
                  <p style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>
                    {predictedDisease.treatment}
                  </p>
                </div>

                <div
                  style={{
                    background: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '6px',
                    padding: '12px',
                    marginBottom: '15px',
                  }}
                >
                  <p style={{ color: '#856404', margin: 0, fontWeight: 'bold' }}>
                    ⚠️ Important:
                  </p>
                  <p style={{ color: '#856404', margin: '5px 0 0 0' }}>
                    {predictedDisease.warning}
                  </p>
                </div>

                <div
                  style={{
                    background: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '6px',
                    padding: '12px',
                  }}
                >
                  <p style={{ color: '#856404', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                    ⚕️ Medical Disclaimer:
                  </p>
                  <p style={{ color: '#856404', margin: 0, fontSize: '13px' }}>
                    This tool is for educational purposes only and not a substitute for
                    professional medical diagnosis. Always consult with a qualified healthcare
                    professional for accurate diagnosis and treatment.
                  </p>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: '#f0f7ff',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <p style={{ color: '#667eea', margin: 0 }}>
                  Unable to match symptoms to common conditions. Please consult a healthcare
                  professional.
                </p>
              </div>
            )}

            <button
              onClick={handleReset}
              style={{
                width: '100%',
                padding: '12px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '20px',
              }}
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
        <p style={{ fontSize: '12px', margin: 0 }}>
          Made with ❤️ for health awareness | Always consult healthcare professionals
        </p>
      </div>
    </div>
  );
};

export default MedicalDiagnosisApp;
