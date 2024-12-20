// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple schema
const RecordSchema = new mongoose.Schema({
    name: String,
    value: Number
});

const Record = mongoose.model('Record', RecordSchema);

// Create a record
app.post('/records', async (req, res) => {
    try {
        const newRecord = new Record(req.body);
        await newRecord.save();
        res.status(201).send(newRecord);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all records
app.get('/records', async (req, res) => {
    try {
        const records = await Record.find();
        res.status(200).send(records);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
