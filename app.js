import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [results, setResults] = useState(null);

    useEffect(() => {
        async function fetchSymptoms() {
            const response = await axios.get('http://localhost:5000/symptoms');
            setSymptoms(response.data);
        }
        fetchSymptoms();
    }, []);

    const handleSymptomChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setSelectedSymptoms([...selectedSymptoms, value]);
        } else {
            setSelectedSymptoms(selectedSymptoms.filter((symptom) => symptom !== value));
        }
    };

    const handleSubmit = async () => {
        const response = await axios.post('http://localhost:5000/prediction', { selectedSymptoms });
        setResults(response.data);
    };

    return (
        <div>
            <h1>Test & Medical Prediction</h1>
            <h3>Select Symptoms</h3>
            {symptoms.map((symptom, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        value={symptom.symptom}
                        onChange={handleSymptomChange}
                    />
                    {symptom.symptom}
                </div>
            ))}
            <button onClick={handleSubmit}>Get Prediction</button>

            {results && (
                <div>
                    <h3>Results:</h3>
                    <p>Tests: {results.tests.join(', ')}</p>
                    <p>Deficiencies: {results.deficiencies.join(', ')}</p>
                    <p>Medicines: {results.medicines.join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default App;
