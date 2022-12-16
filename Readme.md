# API FreeWaves `1.0.0`

![](./src/public/logo.png)

`URL endpoit: https://socket-freewaves-production.up.railway.app/`

# Endpoint

##### Recibe el evento por metodo POST, lo procesa dependiendo del nombre y le agrega una marca de tiempo con un contador por evento, ademas de verificar si los datos enviados son validos.

```javascript
fetch("https://socket-freewaves-production.up.railway.app/", {
  method: "POST",
});
```

##### En la misma ruta pero con metodo get pueden ver un panel que les muestra todos los eventos mandados.

> [
> {

    "count": 1
    "image": "https://risa.jpg.com",
    "message": "Mensaje",
    "name": "Risa"
    "timestamp": "2022-12-15T13:16:51."
    "type": "Reacción 1",

}
]

>

# Enviar a la API

##### En el body del fetch se tiene que mandar un objeto como el siguiente

```javascript
body: JSON.stringify({
  name: "Risa", //string || null
  image: "https://risa.jpg.com", //string || null
  message: "Mensaje", //string || null
  type: "Reacción 1", //string || null
});
```

##### Headers

```javascript
   headers: {
      "Content-Type": "application/json",
    },
```

# Respuesta de la API

##### En la respuesta le va a traer a trabes del body un arreglo con objetos que poseen distinto nombre (type, message, image, pueden ser iguales )

    	[{"count": 1 //contador que incrementa dependiendo del name
    	"image": "https://risa.jpg.com",
      "message": "Mensaje",
    	"name": "Risa"
    	"timestamp": "2022-12-15T13:16:51." //marca del ultimo evento
      "type": "Reacción 1",}]

##### Codigos de respuesta

`200: (evento recibido) el evento fue recibido en el servidor `<br/>
`400: (BadRequest) los datos enviados son incorrectos`<br/>
`404: (NotFuound) no se encontro la informacion`<br/>
`500: error en el servidor`

##### Pagina del desarrollador

¡Hola! Mi nombre es Ramiro Gumma y soy Frontend Developer. Para contactarse con migo pude ingresar a mi portafolio web:
https://portafolio-nextjs-omega.vercel.app/
Gracias por su atención.

### Links personales

`<link>` <https://www.linkedin.com/in/ramiro-gabriel-gumma-400993240/>

`<link>` <https://www.workana.com/freelancer/b85e703950de6afa717ace9a8327c73a>
