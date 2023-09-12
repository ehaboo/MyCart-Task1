loadProductsList();

function loadProductsList() {
  const productsList = getProductsListFromStorage();
  displayProduct(productsList);
}

function addProduct() {
  const valid = validation();
  if (!valid) return;

  const product = getProduct();

  const productsList = getProductsListFromStorage();

  productsList.push(product);

  saveProductsListToStorage(productsList);

  displayProduct(productsList);

  clearValues();
}

function validation() {
  const productNameBox = document.getElementById("productNameBox");
  const priceBox = document.getElementById("priceBox");
  const categoryBox = document.getElementById("categoryBox");
  const imageLinkBox = document.getElementById("imageLinkBox");
  const productNameBoxErr = document.getElementById("productNameBoxErr");
  const priceBoxErr = document.getElementById("priceBoxErr");
  const categoryBoxErr = document.getElementById("categoryBoxErr");
  const imageLinkBoxErr = document.getElementById("imageLinkBoxErr");

  const productName = productNameBox.value;
  const price = priceBox.value;
  const category = categoryBox.value;
  const imageLink = imageLinkBox.value;

  productNameBoxErr.innerText = "";
  priceBoxErr.innerText = "";
  categoryBoxErr.innerText = "";
  imageLinkBoxErr.innerText = "";

  if (productName === "") {
    productNameBoxErr.innerText = "Missing Product Name!";
    productNameBox.focus();
    return false;
  }
  if (price === "" || price < 0) {
    priceBoxErr.innerText = "Invalid Product Price!";
    priceBox.focus();
    return false;
  }
  if (category === "") {
    categoryBoxErr.innerText = "Please Choose Category!";
    categoryBox.focus();
    return false;
  }
  if (imageLink === "") {
    imageLinkBoxErr.innerText = "Enter Product Image Link!";
    imageLinkBox.focus();
    return false;
  }
  return true;
}

function getProduct() {
  const productNameBox = document.getElementById("productNameBox");
  const priceBox = document.getElementById("priceBox");
  const categoryBox = document.getElementById("categoryBox");
  const imageLinkBox = document.getElementById("imageLinkBox");

  const productName = productNameBox.value;
  const price = priceBox.value;
  const category = categoryBox.value;
  const imageLink = imageLinkBox.value;

  const product = {
    productName,
    price,
    category,
    imageLink,
  };

  return product;
}

function getProductsListFromStorage() {
  const productsListStr = localStorage.getItem("productsList");

  const productsList =
    productsListStr === null ? [] : JSON.parse(productsListStr);

  return productsList;
}

function saveProductsListToStorage(productsList) {
  const productsListStr = JSON.stringify(productsList);

  localStorage.setItem("productsList", productsListStr);
}

function displayProduct(productsList) {
  const tableBodyBox = document.getElementById("tableBodyBox");

  tableBodyBox.innerHTML = "";

  let index = 0; 

  for (const product of productsList) {
    const productRow = `
            <tr> 
                <td>
                    ${product.productName}
                </td>
                <td>
                    ${product.price} &#8362;
                </td>
                <td>
                    ${product.category}
                </td>
                <td>
                    <img src="${product.imageLink}">
                </td>
                <td>
                    <button type="button" onclick="deleteRow(${index})">Remove</button>
                </td>
            </tr> 
        
        `;


    tableBodyBox.innerHTML += productRow;

    index++;
  }
}

function clearValues() {
  document.getElementById("productNameBox").value = "";
  document.getElementById("priceBox").value = "";
  document.getElementById("categoryBox").value = "";
  document.getElementById("imageLinkBox").value = "";

  document.getElementById("productNameBox").focus();
}


function deleteRow(index) {

  if(!confirm("Are you sure you want to delete?")) return;
  
  const productsList = getProductsListFromStorage();

  productsList.splice(index, 1);

  saveProductsListToStorage(productsList);

  displayProduct(productsList);


}
