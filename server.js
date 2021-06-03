const { response, raw } = require('express');
const express = require('express');
const fs = require('fs');
const cors = require('cors');


const readJSONFile = (file) => {
  const rawData = fs.readFileSync(file);
  const parsedData = JSON.parse(rawData);
  return parsedData;
}

const app = express(); 

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => {
    console.log('server is running on port 5000');
  });
  app.get('/votes', (req, res) => {
    const data = readJSONFile('vote.json');
    res.status(200).send(data);
  });

  app.post('/votes', (req, res) => {
    fs.writeFileSync('vote.json', JSON.stringify(req.body));
  
    res.send("ok");
  });
  