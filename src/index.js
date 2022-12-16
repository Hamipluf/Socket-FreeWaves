import express from "express";
const cors = require("cors");
import { z, ZodError } from "zod";
import { PORT } from "./config.js"; // config de produccion

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const objectSchema = z.object({
  // Verificacion Inputs
  name: z.string().min(1, "Name es requerido"),
  image: z.string().min(1, "image es requerida"),
  message: z.string().min(1, "message es requerido"),
  type: z.string().min(1, "type es requerido"),
});

var STORE = [];

app.post("/", (req, res) => {
  // console.log(req.body);
  try {
    const schemaResult = objectSchema.parse(req.body);
    const obj = req.body;
    const evento_en_store = STORE.filter((ev) => ev.type == obj.type)[0];
    if (!evento_en_store) {
      // si no existe un evento previo del mismo tipo se crea
      const primer_evento_del_tipo = {
        name: obj.name,
        image: obj.image,
        message: obj.message,
        type: obj.type,
        count: 1,
        timestamp: new Date().getTime(), // creando el timestamp en el primer evento del tipo
      };
      STORE.push(primer_evento_del_tipo);
    } else {
      // si ya existe un evento del mismo tipo se actualiza
      evento_en_store.count++;
      evento_en_store.timestamp = new Date(); // creando el timestamp en cada evento nuevo
      STORE.some((evento_en_store) => evento_en_store.type !== obj.type); //filtrando los eventos del mismo tipo
    }
    // console.log(STORE);
    res.status(200).json(STORE);
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({
        "Tipo requerido": e.issues[0].type, // errores input
        "Error message": e.issues[0].message,
        "El error es en": e.issues[0].path[0],
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
});

app.listen(PORT, () => {
  console.log("CORS-Activado y server en el puerto", PORT);
});
