const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/medicalPrediction', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Symptom = mongoose.model('Symptom', new mongoose.Schema({
    symptom: String,
    test: String,
    deficiency: String,
    medicine: String,
}));

async function seedData() {
    await Symptom.insertMany([
        { symptom: 'Fever', test: 'Blood Test', deficiency: 'Vitamin C', medicine: 'Paracetamol' },
        { symptom: 'Cough', test: 'Chest X-Ray', deficiency: 'Zinc', medicine: 'Cough Syrup' },
        { symptom: 'Headache', test: 'MRI', deficiency: 'Magnesium', medicine: 'Aspirin' },
        { symptom: 'Fatigue', test: 'CBC', deficiency: 'Iron', medicine: 'Iron Supplement' },
    ]);

    console.log('Data seeded');
    mongoose.disconnect();
}

seedData();
