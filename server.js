const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const dictionaryFilePath = './dictionary.json';

// Load dictionary from file
let dictionary = {};
if (fs.existsSync(dictionaryFilePath)) {
    dictionary = JSON.parse(fs.readFileSync(dictionaryFilePath, 'utf8'));
}

// Save dictionary to file
function saveDictionary() {
    fs.writeFileSync(dictionaryFilePath, JSON.stringify(dictionary, null, 2), 'utf8');
}

// Get all words
app.get('/api/words', (req, res) => {
    res.json(dictionary);
});

// Add or update word
app.post('/api/words', (req, res) => {
    const { word, definition } = req.body;
    if (word && definition) {
        dictionary[word.toLowerCase()] = definition;
        saveDictionary();
        res.json({ message: `Word "${word}" has been added/updated.` });
    } else {
        res.status(400).json({ error: 'Word and definition are required.' });
    }
});

// Delete word
app.delete('/api/words/:word', (req, res) => {
    const word = req.params.word.toLowerCase();
    if (word in dictionary) {
        delete dictionary[word];
        saveDictionary();
        res.json({ message: `Word "${word}" has been deleted.` });
    } else {
        res.status(404).json({ error: 'Word not found in dictionary.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
