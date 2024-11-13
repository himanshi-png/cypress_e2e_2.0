const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/save-skip-date', (req, res) => {
    const { skipDate } = req.body;
    fs.writeFileSync('skipDate.json', JSON.stringify({ skipDate }));
    res.json({ message: 'Skip date saved successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});