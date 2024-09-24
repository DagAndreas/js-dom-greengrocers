const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
    },
  ],
  cart: [],
};

const storeList = document.querySelector(".store--item-list");

const cartList = document.querySelector(".cart--item-list");

function renderStore() {
  state.items.forEach((item) => {
    let newItem = document.createElement("li");

    let newItemDiv = document.createElement("div");

    let newItemDivImage = document.createElement("img");
    newItemDivImage.src = `assets/icons/${item.id}.svg`;

    let newItemButton = document.createElement("button");
    newItemButton.textContent = "Add to cart";
    newItemButton.addEventListener("click", function () {
      onCartButtonClick(item);
    });

    // add childs
    newItemDiv.appendChild(newItemDivImage);
    newItem.appendChild(newItemDiv);
    newItem.appendChild(newItemButton);
    storeList.appendChild(newItem);
  });
}
renderStore();

function onCartButtonClick(item) {
  let cartItem = document.createElement("li");

  let cartItemImage = document.createElement("img");
  cartItemImage.classList.add("cart--item-icon");
  cartItemImage.src = `assets/icons/${item.id}.svg`;
  cartItemImage.alt = item.name;

  let cartItemParagraph = document.createElement("p");
  cartItemParagraph.textContent = item.name;

  let cartItemRemoveButton = document.createElement("button");
  cartItemRemoveButton.classList.add("quantity-btn", "remove-btn", "center");
  cartItemRemoveButton.textContent = "-";
  cartItemRemoveButton.addEventListener("click", function () {
    removeFromCart(cartItem, item);
  });

  let cartItemSpan = document.createElement("span");
  cartItemSpan.classList.add("quantity-text", "center");
  cartItemSpan.textContent = "1";

  let cartItemAddButton = document.createElement("button");
  cartItemAddButton.classList.add("quantity-btn", "add-btn", "center");
  cartItemAddButton.textContent = "+";
  cartItemAddButton.addEventListener("click", function () {
    addToCart(cartItem, item);
  });

  // Append children to the list item
  cartItem.appendChild(cartItemImage);
  cartItem.appendChild(cartItemParagraph);
  cartItem.appendChild(cartItemRemoveButton);
  cartItem.appendChild(cartItemSpan);
  cartItem.appendChild(cartItemAddButton);

  // Add the list item to the cart
  // TODO: check for duplicates?
  cartList.appendChild(cartItem);

  updatePrice(item.price)
}

function removeFromCart(cartItem, item) {
  // get amount in cart
  const cartItemSpan = cartItem.querySelector(".quantity-text");
  const currentAmount = parseInt(cartItemSpan.textContent, 10);

  if (currentAmount > 1) {
    cartItemSpan.textContent = currentAmount - 1;
    return;
  }

  // remove dom
  cartItem.remove();

  updatePrice(0 - item.price);
}

function addToCart(cartItem, item) {
  // get current amount
  const cartItemSpan = cartItem.querySelector(".quantity-text");
  const currentAmount = parseInt(cartItemSpan.textContent, 10);

  cartItemSpan.textContent = currentAmount + 1;

  updatePrice(item.price);
}

const priceSpan = document.querySelector(".total-number");
function updatePrice(deltaPrice) {
  const currPriceText = priceSpan.textContent.replace('£', '').trim();
  const currPrice = parseFloat(currPriceText, 10);

  const newPrice = currPrice + deltaPrice;

  priceSpan.textContent = "£" + newPrice.toFixed(2);
}
