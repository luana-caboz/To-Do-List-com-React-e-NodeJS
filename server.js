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
      const novaTarefa = {...req.body, concluida: false};
      this.tarefas.push(novaTarefa);
      res.json(novaTarefa);
    });

    this.delete('/tarefas/:id', (req, res) => {
      const id = req.params.id; //pega o id da URL
      if(id >= 0 && id < this.tarefas.length){
        this.tarefas.splice(id, 1); //usando spice para remover do array
        res.sendStatus(204);
      } else {
        res.sendStatus(404)
      }
      this.tarefas = this.tarefas.filter()
    });

    this.app.put('/tarefas/:id', (req, res) => {
      const id = req.params.id;
      const novaTarefa = req.body.tarefa;
      if (id >= 0 && id < this.tarefas.length) {
        this.tarefas[id] = { tarefa: novaTarefa }; // atualiza a nova tarefa
        res.json(this.tarefas[id]); //retorna atualizada
      } else {
        res.sendStatus(404); 
      }
    })
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
