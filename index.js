const express = require('express');
const app = express();
const port= 3001;
const bodyParser = require("body-parser");
const mysql = require('mysql2');

//Estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');
//app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function execQuery(query, res){
    const connection = mysql.createConnection({

        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'appdevweb2'        

    });

    connection.query(query, function(error, results, fields){
        if(error){
            res.json(error);
        }else{
            res(results);
        }

        connection.end();
        console.log('query excutada com sucesso');
        
    });    
}

//rotas
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/salvar", (req, res ) => {
    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const telefone = req.body.telefone;
    const celular = req.body.celular;
    const peso = req.body.peso;
    const altura = req.body.altura;
    const problema = req.body.problema;
    //console.log(req.body);

    execQuery(`INSERT INTO Infectados(nome,endereco,telefone,celular,peso,altura,problema_saude) VALUES('${nome}','${endereco}',
    '${telefone}','${celular}','${peso}','${altura}','${problema}')`, res);

    if(execQuery){
        res.redirect("list/");
    }

});

//Rota que lista todos infectados
app.get("/list", (req, res) => {
    execQuery("select * from infectados order by id desc", (infectados) => {
        res.render("list/index.ejs", {infectados: infectados});
    });
});

//Rota que lista o infectado selecionado
app.get("/infectado/:id?", (req, res) => {
    console.log(parseInt(req.params.id));
    execQuery("select * from infectados where id = "+ parseInt(req.params.id), (infectado) => {
        res.render("list/infectado.ejs", {infectado: infectado});
    });
    //res.send("Dados do Infectado");
});

app.get("/deletar/:id", (req, res) => {
    var id_del = parseInt(req.params.id);
    execQuery("delete from infectados where id= " + id_del, res);
    if(execQuery){
        res.redirect("/list");
    }

});

app.listen(port, function (){
    console.log('Example app listening on port 3001!');
});