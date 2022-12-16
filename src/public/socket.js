const Name = document.querySelector("#name");
const Image = document.querySelector("#image");
const Type = document.querySelector("#type");
const Message = document.querySelector("#message");
const btn_enviar_evento = document.querySelector("#enviar_evento");
const btn_br_evento = document.querySelector("#br_evento");
const enviado = document.querySelector("#enviado");

btn_enviar_evento.addEventListener("click", (e) => {
  // se emite un evento con el boton enviar a la api
  e.preventDefault();
  brEvent({
    name: Name.value, //string
    image: Image.value, //string
    message: Message.value, //string
    type: Type.value,
  });
  console.log("enviando API");
  enviado.innerHTML = `<h1>ENVIADO API ✈</h1>`;
  fetch("/", {
    method: "POST",
    body: JSON.stringify({
      name: Name.value, //string
      image: Image.value, //string
      message: Message.value, //string
      type: Type.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      brEventProceced(data)
      // console.log(data);
    })
    .catch((e) => {
      console.error(e);
    });
});
