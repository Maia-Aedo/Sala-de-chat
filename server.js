// creamos aplicacion con express que pasaremos a servidor http
const express = require('express');
const app = express();
const server = require('http').Server(app);
// servidor de websocket
const io = require('socket.io') (server);
// indicamos ruta donde estaran los ficheros estaticos usando middleware | public tiene index y main
app.use(express.static('public'));

// pobramos el chat con array de mensajes, se envia cuando se conecte a cliente web
let messages = [
    { author: "juan", text:"hola, que tal" },
    { author: "pedro", text:"muy bien, y vos?" },
    { author: "ana", text:"genial" }
];

// necesitamos que el servidor de websocket este atento a que se realice una conexion
// pasamos mensaje connection
io.on('connection', function(socket){
    console.log('un cliente se ha conectado');
    // enviamos el array de objetos con el evento messages
    socket.emit('messages', messages)

    // socket escucha evento new y cuando llegue trae los datos en data
    socket.on('new-message', function(data){
        // añadimos el nuevo msj que llega en data al array messages con push
        messages.push(data);
        /* usando sokcet.emit creamos una comunicacion 1:1 pero una sala de chat es privada
        por lo que se debe notificar a todos los clientes conectados usando io.sockets.emit*/
        io.sockets.emit('messages', messages)
    })
})

// puerto corriendo en servidor 8080
server.listen(8080, ()=>{
    console.log('servidor corriendo en http://localhost:8080');
})
