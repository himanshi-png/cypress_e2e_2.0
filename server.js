const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/save-skip-date', (req, res) => {
    const { skipDate } = req.body;
    let skipDates = [];
    if (fs.existsSync('skipDates.json')) {
        skipDates = JSON.parse(fs.readFileSync('skipDates.json'));
    }
    if (!skipDates.includes(skipDate)) {
        skipDates.push(skipDate);
        fs.writeFileSync('skipDates.json', JSON.stringify(skipDates));
    }
    res.json({ message: 'Skip date saved successfully' });
});

app.get('/list-skip-dates', (req, res) => {
    let skipDates = [];
    if (fs.existsSync('skipDates.json')) {
        skipDates = JSON.parse(fs.readFileSync('skipDates.json'));
    }
    res.json({ skipDates });
});

app.post('/remove-skip-date', (req, res) => {
    const { skipDate } = req.body;
    let skipDates = [];
    if (fs.existsSync('skipDates.json')) {
        skipDates = JSON.parse(fs.readFileSync('skipDates.json'));
    }
    skipDates = skipDates.filter(date => date !== skipDate);
    fs.writeFileSync('skipDates.json', JSON.stringify(skipDates));
    res.json({ message: 'Skip date removed successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});