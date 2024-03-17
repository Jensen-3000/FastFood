import { menuModel } from "./menuModel.js";
import { menuView } from "./menuView.js";

// Controller
export const menuController = {
  addToCart: function (item) {
    menuModel.cart.items.push(item);
    menuView.updateCart();
  },

  removeFromCart: function (index) {
    menuModel.cart.items.splice(index, 1);
    menuView.updateCart();
  },

  confirmOrder: function () {
    const itemsList = [];
    menuModel.cart.items.forEach((item) => {
      itemsList.push(`${item.name} - ${item.price.toFixed(2)} kr.`);
    });

    // Confirmation dialog
    const orderTotal = menuModel.cart.total;
    const confirmation = confirm(
      `${itemsList.join("\n")}
      \nTotal: ${orderTotal.toFixed(2)} kr.\n\n Tryk OK for at bekræfte ordren.`
    );

    // Update only if confirmation is true and cart is not empty
    if (confirmation && menuModel.cart.items.length > 0) {
      const orderNumber = document.getElementById("order-number");
      orderNumber.textContent = parseInt(orderNumber.textContent) + 1;

      const totalRevenue = document.getElementById("total-revenue");
      totalRevenue.textContent = `${(
        parseFloat(totalRevenue.textContent) + menuModel.cart.total
      ).toFixed(2)} kr.`;
    }

    // Clear cart
    menuModel.cart.items = [];
    menuView.updateCart();
  },
};
