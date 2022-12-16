const ventana_br = document.querySelector("#ventana_br");
const ventana_send = document.querySelector("#ventana_send");
const ventana_api = document.querySelector("#ventana_api");
const error = document.querySelector("#error");
const ventana_br_ACT = document.querySelector("#ventana_br_ACT");

// Envio del Evento sin procesar
const brEvent = (data) => {
  // console.log("br",data);
  const { name, image, message, type} = data;
  ventana_br.innerHTML = ` <ul>
  <li>Name:${name}</li>
  <li>Image: ${image}</li>
  <li>Message: ${message}</li>
  <li>Type: ${type}</li>
</ul>`;
};

//Evento procesado
const brEventProceced = (data) => {
  console.log(
    `Broadcast del evento ACTUALIZADO:(cantidad:${data.length})`,
    data
  );
  const { name, image, message, type, count, timestamp } =
    data[0];
  ventana_br_ACT.innerHTML = ` <ul>
    <li>Name:${name}</li>
    <li>Image: ${image}</li>
    <li>Message: ${message}</li>
    <li>Type: ${type}</li>
    <li>Count: ${count}</li>
    <li>Timestamp: ${timestamp}</li>
    </ul>`;
};
