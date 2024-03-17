import { menuData } from "./menuData.js";
import { menuController } from "./menuController.js";
import { menuModel } from "./menuModel.js";

// View
export const menuView = {
  // Renders menu items to the DOM
  renderMenuItems: function (category, containerId) {
    const container = document.getElementById(containerId);

    menuData[category].forEach((item) => {
      const card = menuView.createCard(item);
      container.appendChild(card);
    });
  },

  // Renders the cart to the DOM
  renderCart: function () {
    const cartContainer = document.getElementById("cart");

    const cart = menuView.createCart();
    cartContainer.appendChild(cart);
  },

  // Creates the layout for a card, used for menu items
  createCard: function (item) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.image;
    card.appendChild(img);

    const h1 = document.createElement("h1");
    h1.textContent = item.name;
    card.appendChild(h1);

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = item.price.toFixed(2) + " kr.";
    card.appendChild(price);

    const description = document.createElement("p");
    description.textContent = item.description;
    card.appendChild(description);

    const button = document.createElement("button");
    button.textContent = "Tilføj til kurv";
    button.onclick = () => menuController.addToCart(item);
    card.appendChild(button);

    return card;
  },

  // Creates the layout for the cart
  createCart: function () {
    const cart = document.createElement("div");
    cart.className = "cart";
    cart.id = "cart";

    const h2 = document.createElement("h2");
    h2.textContent = "Kurv";
    cart.appendChild(h2);

    const cartItems = document.createElement("ul");
    cartItems.id = "cart-items";
    cart.appendChild(cartItems);

    const cartTotal = document.createElement("p");
    cartTotal.id = "cart-total";
    cartTotal.textContent = "0.00 kr.";
    cart.appendChild(cartTotal);

    const confirmOrderButton = document.createElement("button");
    confirmOrderButton.id = "confirm-order";
    confirmOrderButton.textContent = "Gå til kassen";
    confirmOrderButton.onclick = () => menuController.confirmOrder();
    cart.appendChild(confirmOrderButton);

    return cart;
  },

  // Updates the cart in the DOM
  updateCart: function () {
    const cartItemsElement = document.getElementById("cart-items");
    cartItemsElement.innerHTML = "";
    menuModel.cart.total = 0;

    menuModel.cart.items.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - ${item.price.toFixed(2)} kr.`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "X";
      removeButton.onclick = () => menuController.removeFromCart(index);

      listItem.appendChild(removeButton);
      cartItemsElement.appendChild(listItem);

      menuModel.cart.total += parseFloat(item.price);
    });
    document.getElementById("cart-total").textContent =
      menuModel.cart.total.toFixed(2) + " kr.";
  },
};
