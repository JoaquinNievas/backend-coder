const socket = io();

function renderProducts(data) {
  if (data.length == 0) return;
  const html = data
    .map((elem, index) => {
      return `<tr>
      <th scope="row">${elem._id}</th>
      <td>${elem.title}</td>
      <td>${elem.price}</td>
      <td>${elem.thumbnail}</td>
    </tr>`;
    })
    .join(" ");
  document.getElementById("products").innerHTML = html;
}

function renderMessages(messages) {
  if (!messages || messages.length == 0) return;
  const clientEmail = document.getElementById("user").value;

  const html = messages
    .map((elem, index) => {
      const isFromClient = elem.email == clientEmail;

      if (isFromClient) {
        return `<div class="d-flex align-items-center text-right justify-content-end ">
          <div class="pe-2 ps-1">
            <span class="name">${elem.email}</span>
            <span class="date">${elem.date}</span>
            <p class="msg">${elem.message}</p>
          </div>
          <div class="text-right pe-1">
            <img src="https://i.imgur.com/HpF4BFG.jpg" width="30" class="img1" />
          </div>
		    </div>`;
      }

      return `<div class="d-flex align-items-center">
        <div class="text-left ps-1">
            <img src="https://img.icons8.com/color/40/000000/guest-female.png"
            width="30"
            class="img1"/>
        </div>
        <div class="ps-2 pe-1">
          <span class="name">${elem.email}</span>
          <span class="date">(${elem.date})</span>
          <p class="msg">${elem.message}</p>
        </div>
      </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
  document.getElementById("message").value = "";
}

socket.on("products", function (data) {
  renderProducts(data);
});

socket.on("messages", function (data) {
  renderMessages(data);
});

function addProduct(e) {
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("new-product", product);
  return false;
}

function sendMessage(e) {
  const message = {
    email: document.getElementById("user").value,
    message: document.getElementById("message").value,
  };
  socket.emit("new-message", message);
  return false;
}

document.getElementById("product-form").addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct(e);
});

document.getElementById("message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage(e);
});
