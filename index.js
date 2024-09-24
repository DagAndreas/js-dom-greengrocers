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
}

const storeList = document.querySelector(".store--item-list")

const cartList = document.querySelector(".cart--item-list")

function renderStore() {
  state.items.forEach((item) => {
    let newItem = document.createElement("li")

    let newItemDiv = document.createElement("div")

    let newItemDivImage = document.createElement("img")
    newItemDivImage.src = `assets/icons/${item.id}.svg`

    let newItemButton = document.createElement("button")
    newItemButton.textContent = "Add to cart"
    newItemButton.addEventListener("click", function(){
      onCartButtonClick(item)
    })

    // add childs
    newItemDiv.appendChild(newItemDivImage)
    newItem.appendChild(newItemDiv)
    newItem.appendChild(newItemButton)
    storeList.appendChild(newItem)
  })
}
renderStore()


function onCartButtonClick(item) {
  // Create list item (li)
  let cartItem = document.createElement('li')

  // Create the image element
  let cartItemImage = document.createElement('img')
  cartItemImage.classList.add('cart--item-icon')
  cartItemImage.src = `assets/icons/${item.id}.svg`
  cartItemImage.alt = item.name

  // Create the paragraph element for the item name
  let cartItemParagraph = document.createElement('p')
  cartItemParagraph.textContent = item.name

  // Create the remove button (-)
  let cartItemRemoveButton = document.createElement('button')
  cartItemRemoveButton.classList.add('quantity-btn', 'remove-btn', 'center')
  cartItemRemoveButton.textContent = '-'
  // TODO: Add remove-from-cart button click event handler here

  // Create the span element to display the quantity
  let cartItemSpan = document.createElement('span')
  cartItemSpan.classList.add('quantity-text', 'center')
  cartItemSpan.textContent = '1' // Default quantity set to 1

  // Create the add button (+)
  let cartItemAddButton = document.createElement('button')
  cartItemAddButton.classList.add('quantity-btn', 'add-btn', 'center')
  cartItemAddButton.textContent = '+'
  // TODO: Add add-to-cart button click event handler here

  // Append children to the list item
  cartItem.appendChild(cartItemImage)
  cartItem.appendChild(cartItemParagraph)
  cartItem.appendChild(cartItemRemoveButton)
  cartItem.appendChild(cartItemSpan)
  cartItem.appendChild(cartItemAddButton)

  // Add the list item to the cart
  // TODO: check for duplicates
  cartList.appendChild(cartItem)
}
