const socket = io();

function render(data) {
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

socket.on("products", function (data) {
  render(data);
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

document.getElementById("product-form").addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct(e);
});
