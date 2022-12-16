"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _zod = require("zod");
var _config = require("./config.js");
var cors = require("cors");
// config de produccion

var app = (0, _express["default"])();
app.use(_express["default"]["static"](__dirname + "/public"));
app.use(cors({
  origin: "*"
}));
app.use(_express["default"].json());
var objectSchema = _zod.z.object({
  // Verificacion Inputs
  name: _zod.z.string().min(1, "Name es requerido").nullish(),
  image: _zod.z.string().min(1, "image es requerida").nullish(),
  message: _zod.z.string().min(1, "message es requerido").nullish(),
  type: _zod.z.string().min(1, "type es requerido").nullish()
});
var STORE = [];
app.post("/", function (req, res) {
  // console.log(req.body);
  try {
    var schemaResult = objectSchema.parse(req.body);
    var obj = req.body;
    var evento_en_store = STORE.filter(function (ev) {
      return ev.name == obj.name;
    })[0];
    if (!evento_en_store) {
      // si no existe un evento previo del mismo tipo se crea
      var primer_evento_del_tipo = {
        name: obj.name,
        image: obj.image,
        message: obj.message,
        type: obj.type,
        count: 1,
        timestamp: new Date().getTime() // creando el timestamp en el primer evento del tipo
      };

      STORE.push(primer_evento_del_tipo);
    } else {
      // si ya existe un evento del mismo tipo se actualiza
      evento_en_store.count++;
      evento_en_store.timestamp = new Date(); // creando el timestamp en cada evento nuevo
      STORE.some(function (evento_en_store) {
        return evento_en_store.name !== obj.name;
      }); //filtrando los eventos del mismo tipo
    }
    // console.log(STORE);
    res.status(200).json(STORE);
  } catch (e) {
    if (e instanceof _zod.ZodError) {
      return res.status(400).json({
        "Tipo requerido": e.issues[0].type,
        // errores input
        "Error message": e.issues[0].message,
        "El error es en": e.issues[0].path[0]
      });
    } else {
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  }
});
app.get("/", function (req, res) {
  res.status(200).json(STORE);
});
app.listen(_config.PORT, function () {
  console.log("CORS-Activado y server en el puerto", _config.PORT);
});