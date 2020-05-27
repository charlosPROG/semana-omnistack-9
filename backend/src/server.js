const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { resolve } = require('path')
const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const app = express()
const server = http.Server(app) //PEGAR O SERVIDOR E EXTRAIR NO EXPRESS
const io = socketio(server) //A PARTIR DESTE MOMENTO, O SERVIDOR PASSA A OUVIR O PROTOCOLO WEBSOCKET

// io.on('connection', socket => { //OUVINDO A INFORMAÇÃO DE TODO O USUÁRIO QUE LOGAR NA APLICAÇÃO, TODA CONEXÃO TEM UM ID ÚNICO
//    console.log('user', socket.id) //MOSTRAR O USUÁRIO CONECTADO A PARTIR DO ID
//    socket.emit('message', 'Oi') //ENVIAR UMA MENSAGEM, COM A STRING 'OI'
// })

mongoose.connect('mongodb+srv://OmniStack:omnistack@cluster0-xo99n.mongodb.net/omnistack9?retryWrites=true&w=majority', { //CONEXÃO COM O BANCO
   useNewUrlParser: true,
   useUnifiedTopology: true
})

const connUsers = {} //SALVAR INFORMAÇÕES DOS USUÁRIOS CONECTADOS

io.on('connection', socket => {
   const { user_id } = socket.handshake.query //BUSCAR O USUÁRIO CONECTADO
   connUsers[user_id] = socket.id //SALVAR ESTE USUÁRIO, ASSOCIANDO O ID DO USUÁRIO COM O ID DO SOCKET
})

app.use((req, res, next) => {
   req.io = io //ADICIONANDO O WEBSOCKET À REQUISIÇÃO PARA TER ACESSO A TUDO NA COMUNICAÇÃO ENTRE BACKEND E FRONTEND
   req.connUsers = connUsers //ADICIONANDO Os USUÁRIOS CONECTADOS À REQUISIÇÃO PARA TER ACESSO A TUDO NA COMUNICAÇÃO ENTRE BACKEND E FRONTEND
   return next() //SE EU NÃO CHAMÁ-LO, ELE NÃO CONTINUA COM O FLUXO DA APLICAÇÃO
})

app.use(express.json())
app.use(cors())
app.use('/files', express.static(resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(8888) //OUVIR REQUISIÇÕES PARA PROTOCOLOS HTTP E PROTOCOLOS WEBSOCKET