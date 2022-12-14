import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from 'cors'
import { z } from "zod";
import { PORT } from "./config.js"; // config de produccion


const app = express();
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: "https://socket-freewaves-production.up.railway.app/socket.io/?EIO=4&transport=polling&t=OKHFGTO",
  },
});

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors())
var STORE = [];

const objectSchema = z.object({
  // Verificacion Inputs
  name: z.string().min(1, "Name es requerido"),
  image: z.string().min(1, "image es requerida"),
  message: z.string().min(1, "message es requerido"),
  type: z.string().min(1, "type es requerido"),
});

const procesadoApi = async (evento) => {
  try {
    const schemaResult = objectSchema.parse(evento); // Uso verificacion de input
    const obj = evento;
    const evento_en_store = STORE.filter((ev) => ev.type == obj.type)[0];
    if (!evento_en_store) {
      // si no existe un evento previo del mismo tipo se crea
      const primer_evento_del_tipo = {
        name: obj.name,
        image: obj.image,
        message: obj.message,
        type: obj.type,
        count: 1,
        timestamp: new Date(), // creando el timestamp en el primer evento del tipo
      };
      STORE.push(primer_evento_del_tipo);
      return STORE;
    } else {
      // si ya existe un evento del mismo tipo se actualiza
      evento_en_store.count++;
      evento_en_store.timestamp = new Date(); // creando el timestamp en cada evento nuevo
      STORE.filter((evento_en_store) => evento_en_store.type !== obj.type); //filtrando los eventos del mismo tipo
    }
  } catch (error) {
    console.error(error);
  }
};

io.on("connection", (socket) => {
  socket.emit("server:STORE", STORE); // primer evento al cargar la pag

  socket.on("cliente:EVENTO", async (data) => {
    await procesadoApi(data); // logica del procesado de eventos
    const dataEvento = { ...data, id: socket.id }; // Agrego el id para identificar el evento, si no se necesita eliminar esta linea
    socket.emit("server:EVENTO", {
      dataEvento: dataEvento,
      dataEventoProcesado: STORE,
    });
  });
});

httpServer.listen(PORT, () => {
  console.log("CORS-Activado y server en el puerto", PORT);
});
