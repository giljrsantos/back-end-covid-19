const express = require('express');
const cors = require('cors');
const parser = require('body-parser');

const app = express();

const port = process.env.PORT || 3001;
const MainRouter = require('./routes/main');
const PacienteRouter = require('./routes/pacientes');
const HospitaisRouter = require('./routes/hospitais');

const db = require('./database/db');
db.sequelize.sync({force: false});


app.use(parser.json());
app.use(cors());
app.use(parser.urlencoded({extended: false}));


app.use('/', MainRouter);
app.use('/pacientes', PacienteRouter);
app.use('/hospitais', HospitaisRouter);

app.listen(port, function(){
    console.log('O Servidor está rodando na porta '+ port);
})