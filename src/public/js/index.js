//FRONT
const socket = io();

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const thumbnailInput = document.getElementById("thumbnail");
const codeInput = document.getElementById("code");
const stockInput = document.getElementById("stock");
const categoryInput = document.getElementById("category");

const form = document.getElementById("form-product");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (titleInput.value === "" ||
    descriptionInput.value === "" ||
    codeInput.value === "" ||
    stockInput.value == 0  ||
    priceInput.value == 0
  ) {
    alert("You must to complete all the fields");
  } else {
    
    const product = {
      title: titleInput.value,
      description: descriptionInput.value,
      price: parseInt(priceInput.value),
      thumbnails: '['+thumbnailInput.value+']',
      code: codeInput.value,
      stock: parseInt(stockInput.value),
      category: categoryInput.value,
    };

    socket.emit("newProduct", product);
    alert("Product Added");
  }
});


socket.on("refresh-product", async (products) => {
  let htmlcontent = "";
  products.forEach((element) => {
    htmlcontent += "<ul id='list-products' class='list-group'>";
    htmlcontent +=
      "<li class='list-group-item list-group-item-info'>ID: " +
      element.id +
      "</li>";
    htmlcontent +=
      "<li class='list-group-item'>Product: " + element.title + "</li>";
    htmlcontent +=
      "<li class='list-group-item'>Price: " + element.price + "</li>";
    htmlcontent +=
      "<li class='list-group-item'>Stock: " + element.stock + " </li>";
    htmlcontent += "</ul><br>";
  });
  const productlist = document.getElementById("list-products");
  productlist.innerHTML = htmlcontent;
});

socket.on("newProduct", async (products) => {
  let htmlcontent = "";
  products.forEach((element) => {
    htmlcontent += "<ul id='list-products' class='list-group'>";
    htmlcontent +=
      "<li class='list-group-item list-group-item-info'>ID: " +
      element.id +
      "</li>";
    htmlcontent +=
      "<li class='list-group-item'>Product: " + element.title + "</li>";
    htmlcontent +=
      "<li class='list-group-item'>Price: " + element.price + "</li>";
    htmlcontent +=
      "<li class='list-group-item'>Stock: " + element.stock + " </li>";
    htmlcontent += "</ul><br>";
  });
  const productlist = document.getElementById("list-products");
  productlist.innerHTML = htmlcontent;
});
