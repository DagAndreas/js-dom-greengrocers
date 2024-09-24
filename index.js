const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      category: "greens",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.31,
      category: "greens",
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.37,
      category: "fruit",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.39,
      category: "fruit",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.34,
      category: "fruit",
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      category: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.39,
      category: "greens",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.38,
      category: "berry",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.34,
      category: "berry",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.29,
      category: "greens",
    },
  ],
  cart: [],
}


const storeList = document.querySelector(".store--item-list")

const cartList = document.querySelector(".cart--item-list")

const categoryFilter = document.getElementById("categoryFilter")

const sortFilter = document.getElementById("sortFilter")

// Filter items based on the selected category
categoryFilter.addEventListener("change", function () {
  const selectedCategory = categoryFilter.value
    const selectedOrder = sortFilter.value

  if (selectedCategory === "all") {
    renderStore((item) => true, selectedOrder)
  } else {
    renderStore((item) => item.category === selectedCategory, selectedOrder)
  }
})


sortFilter.addEventListener("change", function () {
  const selectedFilter = categoryFilter.value
  const selectedOrder = sortFilter.value

  if (selectedFilter === "all") {
    renderStore((item) => true, selectedOrder)
  } else {
    renderStore((item) => item.category === selectedCategory, selectedOrder)
  }
})




function renderStore(filter, order) {

  let itemsList = state.items

  switch (order) {
    case 'alphabetical':
      itemsList.sort((a, b) => a.name.localeCompare(b.name))
      break
      
      case 'asc':
        itemsList.sort((a, b) => a.price - b.price)
        break
        
        case 'desc':
      itemsList.sort((a, b) => b.price - a.price)
      break
  }


  storeList.innerHTML = ""

  itemsList.forEach((item) => {
    if (!filter(item)){
      return
    }

    let newItem = document.createElement("li")

    let newItemDiv = document.createElement("div")

    let newItemDivImage = document.createElement("img")
    newItemDivImage.src = `assets/icons/${item.id}.svg`

    let newItemButton = document.createElement("button")
    newItemButton.textContent = "Add to cart"
    newItemButton.addEventListener("click", function () {
      onCartButtonClick(item)
    })

    // add childs
    newItemDiv.appendChild(newItemDivImage)
    newItem.appendChild(newItemDiv)
    newItem.appendChild(newItemButton)
    storeList.appendChild(newItem)
  })
}


renderStore((x) => true, 'asc')

function onCartButtonClick(item) {

  // check if already exists
  const existingCartItem = cartList.querySelector(`[data-id="${item.id}"]`)

  if (existingCartItem) {
    const cartItemSpan = existingCartItem.querySelector(".quantity-text")
    const currentAmount = parseInt(cartItemSpan.textContent, 10)
    cartItemSpan.textContent = currentAmount + 1

    updatePrice(item.price)
    return
  }

  // Create a new cart item if it doesn't exist
  let cartItem = document.createElement("li")
  cartItem.setAttribute("data-id", item.id)

  let cartItemImage = document.createElement("img")
  cartItemImage.classList.add("cart--item-icon")
  cartItemImage.src = `assets/icons/${item.id}.svg`
  cartItemImage.alt = item.name

  let cartItemParagraph = document.createElement("p")
  cartItemParagraph.textContent = item.name

  let cartItemRemoveButton = document.createElement("button")
  cartItemRemoveButton.classList.add("quantity-btn", "remove-btn", "center")
  cartItemRemoveButton.textContent = "-"
  cartItemRemoveButton.addEventListener("click", function () {
    removeFromCart(cartItem, item)
  })

  let cartItemSpan = document.createElement("span")
  cartItemSpan.classList.add("quantity-text", "center")
  cartItemSpan.textContent = "1"

  let cartItemAddButton = document.createElement("button")
  cartItemAddButton.classList.add("quantity-btn", "add-btn", "center")
  cartItemAddButton.textContent = "+"
  cartItemAddButton.addEventListener("click", function () {
    addToCart(cartItem, item)
  })

  // Append children to the list item
  cartItem.appendChild(cartItemImage)
  cartItem.appendChild(cartItemParagraph)
  cartItem.appendChild(cartItemRemoveButton)
  cartItem.appendChild(cartItemSpan)
  cartItem.appendChild(cartItemAddButton)

  // Add the list item to the cart
  cartList.appendChild(cartItem)

  // Update the total price
  updatePrice(item.price)
}


function removeFromCart(cartItem, item) {
  // get amount in cart
  const cartItemSpan = cartItem.querySelector(".quantity-text")
  const currentAmount = parseInt(cartItemSpan.textContent, 10)

  if (currentAmount > 1) {
    cartItemSpan.textContent = currentAmount - 1
    return
  }

  // remove dom
  cartItem.remove()

  updatePrice(0 - item.price)
}

function addToCart(cartItem, item) {
  // get current amount
  const cartItemSpan = cartItem.querySelector(".quantity-text")
  const currentAmount = parseInt(cartItemSpan.textContent, 10)

  cartItemSpan.textContent = currentAmount + 1

  updatePrice(item.price)
}

const priceSpan = document.querySelector(".total-number")
function updatePrice(deltaPrice) {
  const currPriceText = priceSpan.textContent.replace('£', '').trim()
  const currPrice = parseFloat(currPriceText, 10)

  const newPrice = currPrice + deltaPrice

  priceSpan.textContent = "£" + newPrice.toFixed(2)
}



