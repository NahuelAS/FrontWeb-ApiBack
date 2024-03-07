const fs = require('fs');
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const storadge = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/imgs');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploads = multer({storage: storadge});

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.static(`${__dirname}/uploads`));

app.get('/equipos', (req, res) => {
    const equipos = fs.readFileSync('./data/equipos.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(equipos);
});

app.get('/mostrar_equipo/:id/ver', (req, res) => {
    const equipos = fs.readFileSync('./data/equipos.json');
    const objJson = JSON.parse(equipos);
    const equipo = objJson.find(obj => obj.id === Number(req.params.id));
    res.setHeader('Content-Type', 'application/json');
    res.send(equipo);
});

app.post('/form', uploads.single('imagen'), (req, res) => {
    const equipos = fs.readFileSync('./data/equipos.json');
    const objJson = JSON.parse(equipos);

    objJson.push({
        "id": randomID(objJson),
        "name": req.body.nombre,
        "crestUrl": 'API/uploads/imgs/' + req.file.filename,
        "shortName": req.body.nombreCorto,
        "tla": req.body.abreviatura,
        "clubColors": req.body.colores,
        "area": {"name": req.body.name},
        "address": req.body.direccion,
        "venue": req.body.estadio,
        "phone": req.body.telefono,
        "website": req.body.web,
        "founded": req.body.fundacion,
    });

    fs.writeFileSync('./data/equipos.json', JSON.stringify(objJson));
    res.redirect('http://192.168.1.10:8081/');
});

function randomID(a) {
    let id = Math.ceil(Math.random() * 2000);
    while(a.find(obj => obj.id === id)) {
        id = Math.ceil(Math.random() * 2000);
    }

    return id;
}

app.post('/subirImagen/:id', uploads.single('imagen'), (req, res) => {
    const equipos = fs.readFileSync('./data/equipos.json');
    const objJson = JSON.parse(equipos);
    const indexTeam = objJson.findIndex(obj => obj.id === Number(req.params.id));
    objJson[indexTeam].crestUrl = 'API/uploads/imgs/' + req.file.filename;

    fs.writeFileSync('./data/equipos.json', JSON.stringify(objJson));
    res.redirect('http://192.168.1.10:8081/');
});

app.put('/mostrar_equipo/:id/:tipoDato/:valor/editar', (req, res) => {
    const equipos = fs.readFileSync('./data/equipos.json');
    const objJson = JSON.parse(equipos);
    const indexTeam = objJson.findIndex(obj => obj.id === Number(req.params.id));
    objJson[indexTeam][req.params.tipoDato] = req.params.valor;
    console.log(req.params.tipoDato, " - ", req.params.valor);

    fs.writeFileSync('./data/equipos.json', JSON.stringify(objJson));
    res.send('El Equipo se Edito Exitosamente');
});

app.delete('/borrar/:id', (req, res) => {
    const equipos = fs.readFileSync('./data/equipos.json');
    const objJson = JSON.parse(equipos);
    const newArr = objJson.filter(obj => obj.id !== Number(req.params.id));
    fs.writeFileSync('./data/equipos.json', JSON.stringify(newArr));
    res.send('Eliminado Correctamente');
})





app.listen(PORT);
console.log(`El Puerto designado es: http://localhost:${PORT}`);