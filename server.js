const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/medicalPrediction', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Schema Definitions
const SymptomSchema = new mongoose.Schema({
    symptom: String,
    test: String,
    deficiency: String,
    medicine: String,
});

const Symptom = mongoose.model('Symptom', SymptomSchema);

// API Endpoints
app.get('/symptoms', async (req, res) => {
    const symptoms = await Symptom.find();
    res.json(symptoms);
});

app.post('/prediction', async (req, res) => {
    const { selectedSymptoms } = req.body;
    const results = await Symptom.find({
        symptom: { $in: selectedSymptoms },
    });

    const tests = results.map((r) => r.test);
    const deficiencies = results.map((r) => r.deficiency);
    const medicines = results.map((r) => r.medicine);

    res.json({ tests, deficiencies, medicines });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
