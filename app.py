#!/usr/bin/env python3
"""
Medical Symptom Checker App - Flask Backend
Production-ready app for Hugging Face Spaces
Embedded React component - no separate build needed
"""

from flask import Flask, render_template_string, jsonify, request
import os

app = Flask(__name__)

# HTML Template with embedded React - standalone app
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medical Symptom Checker</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            padding: 40px;
        }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #667eea; margin-bottom: 10px; font-size: 28px; }
        .header p { color: #666; margin: 0; font-size: 14px; }
        .progress-bar { width: 100%; height: 8px; background: #e0e0e0; border-radius: 4px; margin-bottom: 30px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); transition: width 0.3s ease; }
        .question-counter { text-align: center; margin-bottom: 25px; color: #999; font-size: 14px; }
        .question { margin-bottom: 30px; }
        .question h2 { color: #333; font-size: 20px; margin-bottom: 20px; font-weight: 500; }
        .button-group { display: flex; gap: 12px; }
        button {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s;
        }
        .btn-yes { background: #667eea; color: white; }
        .btn-yes:hover { background: #5568d3; }
        .btn-no { background: #e0e0e0; color: #333; }
        .btn-no:hover { background: #d0d0d0; }
        .btn-primary { background: #667eea; color: white; width: 100%; padding: 12px; }
        .btn-primary:hover { background: #5568d3; }
        .result-box {
            background: #f0f7ff;
            border: 2px solid #667eea;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .result-title { color: #667eea; font-size: 18px; margin-bottom: 15px; font-weight: 500; }
        .progress-meter { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
        .progress-bar-result { flex: 1; height: 10px; background: #e0e0e0; border-radius: 5px; overflow: hidden; }
        .progress-fill-result { height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); }
        .percentage { font-weight: bold; color: #667eea; min-width: 50px; }
        .description { color: #333; margin-bottom: 15px; line-height: 1.6; }
        .treatment-section { margin-bottom: 15px; }
        .treatment-label { color: #666; font-weight: bold; margin-bottom: 8px; }
        .treatment-text { color: #666; margin: 0; line-height: 1.6; }
        .warning-box { background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 12px; margin-bottom: 15px; }
        .warning-title { color: #856404; margin: 0 0 8px 0; font-weight: bold; }
        .warning-text { color: #856404; margin: 0; font-size: 13px; }
        .footer { text-align: center; margin-top: 30px; color: white; }
        .footer p { font-size: 12px; margin: 0; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState } = React;

        const MedicalApp = () => {
            const [currentQuestion, setCurrentQuestion] = useState(0);
            const [symptoms, setSymptoms] = useState({});
            const [showResult, setShowResult] = useState(false);
            const [predictedDisease, setPredictedDisease] = useState(null);

            const diseases = [
                {
                    name: 'Common Cold',
                    symptoms: ['fever', 'cough', 'headache', 'sore_throat', 'runny_nose'],
                    description: 'A viral infection affecting the upper respiratory tract.',
                    treatment: 'Rest, fluids, vitamin C supplements, decongestants',
                    warning: 'Usually resolves in 7-10 days'
                },
                {
                    name: 'Dengue Fever',
                    symptoms: ['fever', 'headache', 'body_pain', 'joint_pain', 'rash'],
                    description: 'A mosquito-borne viral infection causing severe fever and pain.',
                    treatment: 'Hospitalization may be needed, supportive care, platelet monitoring',
                    warning: 'Requires immediate medical attention if symptoms worsen'
                },
                {
                    name: 'Migraine',
                    symptoms: ['headache', 'nausea', 'vision_changes', 'sensitivity_to_light'],
                    description: 'A neurological condition causing severe headaches.',
                    treatment: 'Pain relievers, preventive medications, rest in dark quiet room',
                    warning: 'If headache is sudden and severe, seek emergency care'
                },
                {
                    name: 'Gastroenteritis',
                    symptoms: ['vomiting', 'diarrhea', 'fever', 'stomach_pain', 'nausea'],
                    description: 'Inflammation of stomach and intestines, usually from infection.',
                    treatment: 'Oral rehydration, bland diet, anti-nausea medication if needed',
                    warning: 'Stay hydrated to prevent dehydration'
                },
                {
                    name: 'Arthritis',
                    symptoms: ['joint_pain', 'ankle_pain', 'swelling', 'stiffness'],
                    description: 'Inflammation of joints causing pain and reduced mobility.',
                    treatment: 'Anti-inflammatory medications, physical therapy, heat/cold therapy',
                    warning: 'Chronic condition requiring long-term management'
                },
                {
                    name: 'Influenza (Flu)',
                    symptoms: ['fever', 'cough', 'headache', 'body_pain', 'fatigue'],
                    description: 'Contagious respiratory illness caused by influenza virus.',
                    treatment: 'Antiviral medications, rest, fluids, fever management',
                    warning: 'Can lead to serious complications, especially in high-risk groups'
                }
            ];

            const questions = [
                { id: 'fever', question: 'Do you have a fever?' },
                { id: 'cough', question: 'Do you have a cough?' },
                { id: 'headache', question: 'Do you have a headache?' },
                { id: 'body_pain', question: 'Do you experience body/muscle pain?' },
                { id: 'joint_pain', question: 'Do you have joint pain?' },
                { id: 'ankle_pain', question: 'Do you have ankle pain?' },
                { id: 'nausea', question: 'Do you feel nauseous?' },
                { id: 'vomiting', question: 'Are you vomiting?' },
                { id: 'diarrhea', question: 'Do you have diarrhea?' },
                { id: 'stomach_pain', question: 'Do you have stomach pain?' },
                { id: 'sore_throat', question: 'Do you have a sore throat?' },
                { id: 'runny_nose', question: 'Do you have a runny or stuffy nose?' },
                { id: 'rash', question: 'Do you have any rash on your body?' },
                { id: 'vision_changes', question: 'Do you experience vision changes?' },
                { id: 'sensitivity_to_light', question: 'Are you sensitive to light?' },
                { id: 'swelling', question: 'Do you have any joint swelling?' },
                { id: 'stiffness', question: 'Do you experience joint stiffness?' },
                { id: 'fatigue', question: 'Do you feel unusually tired?' }
            ];

            const analyze = () => {
                const matches = diseases.map(disease => {
                    const matchCount = disease.symptoms.filter(s => symptoms[s] === true).length;
                    const percent = (matchCount / disease.symptoms.length) * 100;
                    return { ...disease, matchCount, percent, score: percent > 50 ? percent : 0 };
                });

                const result = matches.filter(d => d.score > 0).sort((a, b) => b.score - a.score)[0];
                setPredictedDisease(result);
                setShowResult(true);
            };

            const handleAnswer = (answer) => {
                const q = questions[currentQuestion];
                setSymptoms({ ...symptoms, [q.id]: answer });
                
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                } else {
                    analyze();
                }
            };

            const progress = ((currentQuestion + 1) / questions.length) * 100;

            return (
                <div>
                    <div className="container">
                        <div className="header">
                            <h1>🏥 Medical Symptom Checker</h1>
                            <p>Answer questions about your symptoms for analysis</p>
                        </div>

                        {!showResult ? (
                            <>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                                </div>
                                <div className="question-counter">
                                    Question {currentQuestion + 1} of {questions.length}
                                </div>
                                <div className="question">
                                    <h2>{questions[currentQuestion].question}</h2>
                                    <div className="button-group">
                                        <button className="btn-yes" onClick={() => handleAnswer(true)}>Yes</button>
                                        <button className="btn-no" onClick={() => handleAnswer(false)}>No</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <h2 style={{ color: '#667eea', textAlign: 'center', marginBottom: '20px' }}>
                                    📋 Analysis Results
                                </h2>

                                {predictedDisease ? (
                                    <div className="result-box">
                                        <div className="result-title">
                                            Possible Condition: {predictedDisease.name}
                                        </div>
                                        <div className="progress-meter">
                                            <div className="progress-bar-result">
                                                <div className="progress-fill-result" 
                                                    style={{ width: `${Math.round(predictedDisease.percent)}%` }}></div>
                                            </div>
                                            <span className="percentage">{Math.round(predictedDisease.percent)}%</span>
                                        </div>
                                        <p className="description">{predictedDisease.description}</p>
                                        <div className="treatment-section">
                                            <p className="treatment-label">Recommended Treatment:</p>
                                            <p className="treatment-text">{predictedDisease.treatment}</p>
                                        </div>
                                        <div className="warning-box">
                                            <p className="warning-title">⚠️ Important:</p>
                                            <p className="warning-text">{predictedDisease.warning}</p>
                                        </div>
                                        <div className="warning-box">
                                            <p className="warning-title">⚕️ Medical Disclaimer:</p>
                                            <p className="warning-text">
                                                This tool is for educational purposes only. Always consult with a qualified healthcare professional for accurate diagnosis and treatment.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="result-box">
                                        <p style={{ color: '#667eea', margin: 0 }}>
                                            Unable to match symptoms. Please consult a healthcare professional.
                                        </p>
                                    </div>
                                )}

                                <button className="btn-primary" onClick={() => {
                                    setCurrentQuestion(0);
                                    setSymptoms({});
                                    setShowResult(false);
                                    setPredictedDisease(null);
                                }}>
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

        ReactDOM.createRoot(document.getElementById('root')).render(<MedicalApp />);
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    """Serve the main application"""
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'app': 'Medical Symptom Checker'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 7860))
    app.run(host='0.0.0.0', port=port, debug=False, threaded=True)
