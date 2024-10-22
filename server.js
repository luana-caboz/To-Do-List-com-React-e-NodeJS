const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

class Server {
  constructor() {
    this.app = express();
    this.port = 3001; 
    this.tarefas = []; // Array para as tarefas

    this.config();
    this.routes();
  }

  config() {
    this.app.use(cors()); // Permitir requisições diferentes 
    this.app.use(bodyParser.json()); // ler dados JSON
  }

  routes() {
    this.app.get('/tarefas', (req, res) => {
      res.json(this.tarefas); 
    });

    this.app.post('/tarefas', (req, res) => {
      const novaTarefa = req.body;
      this.tarefas.push(novaTarefa);
      res.json(novaTarefa);
    });
  }

  start() {
    const PORT = 3001;
    this.app.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
