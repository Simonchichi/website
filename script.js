const buttons = document.querySelectorAll(".add-to-cart");
// Select all "Add to Cart" buttons on the product page

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // Get product info from data attributes

    const product = {
      name: this.dataset.name,
      price: parseInt(this.dataset.price),
      image: this.dataset.image,
    };
    //Gets the product information from the data.

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Saves the cart in local storage.

    cart.push(product);
    // Add the product to the cart array

    localStorage.setItem("cart", JSON.stringify(cart));
    //Saves the updated cart back to local storage.

    alert(product.name + " added to cart!");
  });
});

const cartContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const purchaseBtn = document.getElementById("purchase-btn");
//calls the elements in the cart page where the items and total price will be displayed
if (cartContainer) {
  //Makes sure to only take from the cart page.
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    //Shows the itmes in the cart.
    cartContainer.innerHTML = "";
    //Makes sure items dont duplicate.
    let total = 0;
    //starting price

    cart.forEach((item, index) => {
      //Makes it so we can remove things without them being weird
      const itemDiv = document.createElement("div");
      itemDiv.style.display = "flex";
      itemDiv.style.alignItems = "center";
      itemDiv.style.gap = "15px";
      itemDiv.style.marginBottom = "15px";

      const img = document.createElement("img");
      img.src = item.image;
      img.style.width = "60px";
      img.style.height = "60px";
      img.style.objectFit = "cover";

      const info = document.createElement("div");
      info.textContent = `${item.name} - $${item.price}`;
      // Name + Price

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      // Remove Button

      removeBtn.addEventListener("click", function () {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        //Makes it so i can remove things and updates so items are actually removed.
      });

      itemDiv.appendChild(img);
      itemDiv.appendChild(info);
      itemDiv.appendChild(removeBtn);
      //makes it display correctly

      cartContainer.appendChild(itemDiv);

      total += item.price;
    });

    totalPriceElement.textContent = "Total: $" + total;
    //tot price
  }

  renderCart();

  purchaseBtn.addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
      // Makes sure you cant purchase with an empty cart.
    }

    alert("Thank you for your purchase! 🐄");

    localStorage.removeItem("cart");
    cart = [];
    renderCart();
  });
}
