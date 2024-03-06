const fs = require('fs');
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const storadge = multer.diskStorage({
    destination: function (req, res, cd) {
        cb(null, './uploads/imgs');
    },
    filename: function(req, file, cd) {
        cb(null, file.originalname);
    }
});

const uploads = multer({storage: storadge});

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.static(`${__dirname}/uploads`));

app.get('/equipos', (req, res) => {
    const equiposData = fs.readFileSync('./data/equipos.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(equiposData);
});

app.get('/equipos/:id/mirar', (req, res) => {
    const equipos = fs.readFileSync('./data/equipos.json');
    const objJson = JSON.parse(equipos);
    const equipo = objJson.find(obj => obj.id === Number(req.params.id));
    res.setHeader('Content-Type', 'application/json');
    res.send(equipo);
});





app.listen(PORT);
console.log(`El Puerto designado es: http://localhost:${PORT}`);