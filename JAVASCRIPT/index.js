window.onload = () => {
  getdata();
};

var extra = [];

const getdata = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      showData(json);
    })
    .catch((err) => console.log("Error =>", err));
};
const product = document.querySelector("#product-section");

const showData = (getValues) => {
  getValues.map((getValue) => {
    var container = document.createElement("div");
    container.setAttribute("class", "container");

    var img = document.createElement("img");
    img.id = "image";
    img.setAttribute("src", `${getValue.image}`);

    var div1 = document.createElement("div");
    div1.setAttribute("class", "name-rate");

    var span1 = document.createElement("span");
    span1.id = "title";
    span1.innerText = `${getValue.category}`;

    var span2 = document.createElement("span");
    span2.id = "price";
    span2.innerText = `$${getValue.price}`;

    var div2 = document.createElement("div");
    div2.setAttribute("class", "rate-add");

    var span3 = document.createElement("span");
    span3.id = "rating";
    span3.innerHTML = `${getValue.rating.rate}`;
    span3.innerHTML += "☆";

    var btnAdd = document.createElement("input");
    btnAdd.setAttribute("type", "button");
    btnAdd.setAttribute("class", "btnAdd");
    btnAdd.value = "Add to cart";
    btnAdd.name = `${getValue.id}`;

    btnAdd.addEventListener("click", (e) => {
      localStorage.setItem("id", JSON.stringify(e.target.name));
      storData();
      e.preventDefault();
    });

    product.appendChild(container);
    container.appendChild(img);
    container.appendChild(div1);
    container.appendChild(div2);

    div1.appendChild(span1);
    div1.appendChild(span2);

    div2.appendChild(span3);
    div2.appendChild(btnAdd);
  });
};

console.log("id =>>", JSON.parse(localStorage.getItem("id")));

// Cart Implementation
var cart = document.querySelector(".cart");
var backgroundImages = document.querySelector(".content");
var cartDetails = document.querySelector("#cart-details");
var searchSection = document.querySelector("#search-section");
var footerSection = document.querySelector("#footer-section");
const cartData = (extra) => {
  cart.innerText = `cart - ${extra.length}`;
  cart.style.cursor = "pointer";
};

cart.addEventListener("click", (e) => {
  // console.log("vALUE =>", extra);
  // console.log("Cart");
  backgroundImages.style.background = "none";
  backgroundImages.style.height = "100px";
  cartDetails.style.display = "flex";
  product.style.display = "none";
  searchSection.style.display = "none";
  footerSection.style.display = "none";

  var div = document.createElement("div");
  div.setAttribute("class", "left");

  var addressBtn = document.createElement("button");
  addressBtn.setAttribute("class", "address");
  var addressText = document.createTextNode("Add new address");
  addressBtn.value = "Add new address";
  addressBtn.appendChild(addressText);

  var paymentBtn = document.createElement("button");
  paymentBtn.setAttribute("class", "payment");
  var paymentText = document.createTextNode("Select payment");
  paymentBtn.value = "Select payment";
  paymentBtn.appendChild(paymentText);

  div.appendChild(addressBtn);
  div.appendChild(paymentBtn);

  cartDetails.appendChild(div);

  var summaryDiv = document.createElement("div");
  summaryDiv.setAttribute("class", "summary");

  var summarySpan = document.createElement("span");
  summarySpan.setAttribute("class", "sum");
  summarySpan.innerText = "Summary";

  summaryDiv.appendChild(summarySpan);

  var addressSpan = document.createElement("span");
  addressSpan.setAttribute("class", "add");
  addressSpan.innerText = "Address";

  summaryDiv.appendChild(addressSpan);

  cartDetails.appendChild(summaryDiv);

  var list = document.createElement("ul");
  list.setAttribute("class", "list-Items");

  var li;
  var span1, span2, span3;
  var div1, div2;
  var btn, orderBtn;
  for (var i = 0; i < extra.length; i++) {
    li = document.createElement("li");
    li.setAttribute("class", "item");

    div1 = document.createElement("div");

    span1 = document.createElement("span");
    span1.setAttribute("class", "name");
    span1.innerText = `${extra[i].category}`;

    span2 = document.createElement("span");
    span2.setAttribute("class", "price");
    span2.innerText = `${extra[i].price}`;

    div1.appendChild(span1);
    div1.appendChild(span2);

    div2 = document.createElement("div");

    btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "input-btn");
    btn.value = "-- 1 +";

    span3 = document.createElement("span");
    span3.setAttribute("class", "total-price");
    span3.innerText = "$ (n * price)";

    div2.appendChild(btn);
    div2.appendChild(span3);

    li.appendChild(div1);
    li.appendChild(div2);

    // console.log("Cart =>", cartDetails);
    // console.log("List =>", li);

    orderBtn = document.createElement("input");
    orderBtn.setAttribute("type", "button");
    orderBtn.setAttribute("class", "order-btn");
    orderBtn.value = "Place order";

    list.appendChild(li);
  }
  summaryDiv.appendChild(list);
  summaryDiv.appendChild(orderBtn);
  cartDetails.appendChild(summaryDiv);
  console.log("summaryDiv =>", summaryDiv);
  extra = [];
  cart.style.display = "none";
});

var storData = () => {
  var val = JSON.parse(localStorage.getItem("id"));
  fetch(`https://fakestoreapi.com/products/${val}`)
    .then((res) => res.json())
    .then((json) => {
      extra = [...extra, json];
      cartData(extra);
    });
};

// Modal work

var signUp = document.querySelector("#open-signup");
var signIn = document.querySelector("#open-signin");
var modal = document.querySelector(".modal-container");
var modal2 = document.querySelector(".modal-container2");
var close = document.querySelector(".close");
var close2 = document.querySelector(".close2");
signUp.addEventListener("click", () => {
  var nameError = document.querySelectorAll(".modal-form-control div");
  for (var i = 0; i < nameError.length; i++) {
    nameError[i].style.display = "none";
  }

  modal.style.display = "block";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  e.target == modal ? (modal.style.display = "none") : false;
});

signIn.addEventListener("click", () => {
  modal2.style.display = "block";
});

close2.addEventListener("click", () => {
  modal2.style.display = "none";
});

window.addEventListener("click", (e) => {
  e.target == modal2 ? (modal2.style.display = "none") : false;
});

// Modal sign up work
var getSignUp = document.querySelector(".sub-btn");
var signUpInVal = document.querySelectorAll(".form-input");

console.log("getSignUp =>", getSignUp);
var storeData = {};
getSignUp.addEventListener("click", (e) => {
  localStorage.clear();
  let nameError = document.querySelector(".nameError");
  let emailError = document.querySelector(".emailError");
  let passwordError = document.querySelector(".passwordError");
  let isEmpaty = 1;
  if (signUpInVal[0].value == "") {
    nameError.style.display = "block";
    nameError.innerText = "Fill the name";
    isEmpaty = 0;
  } else {
    nameError.style.display = "none";
  }

  if (signUpInVal[1].value == "") {
    emailError.style.display = "block";
    emailError.innerText = "Fill email address";
    isEmpaty = 0;
  } else {
    emailError.style.display = "none";
  }

  if (signUpInVal[2].value == "") {
    passwordError.style.display = "block";
    passwordError.innerText = "Fill password";
    isEmpaty = 0;
  } else {
    passwordError.style.display = "none";
  }

  storeData.name = signUpInVal[0].value;
  storeData.email = signUpInVal[1].value;
  storeData.pass = signUpInVal[2].value;

  console.log(
    " EMpty => ",
    isEmpaty
      ? localStorage.setItem("signUpData", JSON.stringify(storeData))
      : null
  );

  console.log("getItem =>", localStorage.getItem("signUpData"));

  console.log("storeData =>", storeData);
  e.preventDefault();
});

var searchbtn = document.querySelector(".search-btn");
var searchValue = document.querySelector(".input-search");

searchbtn.addEventListener("click", (e) => {
  console.log("search-item =>", this.searchValue.value);
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      let searchResult = json.filter((data) => {
        return data.category.match(searchValue.value.toLowerCase());
      });
      const content = document.querySelectorAll(".container");
      content.forEach((removeData) => removeData.remove());
      showData(searchResult);
    })
    .catch((err) => console.log("Error =>", err));
  e.preventDefault();
});

var filterbtn = document.querySelector(".filter-btn");
filterbtn.setAttribute("title", "Filter product > 4 star");
filterbtn.addEventListener("click", (e) => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      console.log("Json =>", json);
      let filterData = json.filter((data) => data.rating.rate > 4);
      const content = document.querySelectorAll(".container");
      content.forEach((removeData) => removeData.remove());
      showData(filterData);
      console.log("sorted =>", filterData);
    })
    .catch((err) => console.log("Error =>", err));
  e.preventDefault();
});
