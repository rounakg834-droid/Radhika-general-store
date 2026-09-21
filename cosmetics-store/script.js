let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Purane products ko quantity = 1 dena
cart = cart.map(function(item) {
    return {
        ...item,
        quantity: item.quantity || 1
    };
});


// ADD TO CART
const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product = button.closest(".product");

        const name = product.querySelector("h3").textContent;
        const price = Number(
            product.querySelector(".price").textContent.replace("₹", "")
        );
        const image = product.querySelector("img").src;

        const existingProduct = cart.find(function(item) {
            return item.name === name;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        saveCart();
        updateCartCount();

        alert("Product added to cart!");
    });

});


// SAVE CART
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// CART COUNT
function updateCartCount() {

    const cartButton = document.querySelector(".cart-button");

    if (cartButton) {
        const totalItems = cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);

        cartButton.textContent = "🛒 Cart (" + totalItems + ")";
    }
}


// SHOW CART
function showCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) {
        return;
    }

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart.</p>
            </div>
        `;

        cartTotal.innerHTML = "";

        return;
    }

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach(function(item, index) {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <p><strong>Subtotal: ₹${subtotal}</strong></p>
                </div>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <button class="remove" onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;
    });

   if (total >= 500) {

    cartTotal.innerHTML = `
        <div class="total">
            <div>Subtotal: ₹${total}</div>
            <div>Delivery Charge: ₹30</div>
            <hr>
            <div>Total: ₹${total + 30}</div>
        </div>

        <button class="checkout">
            Proceed to Checkout
        </button>
    `;

} else {

    cartTotal.innerHTML = `
        <div class="total">
            <div>Subtotal: ₹${total}</div>
            <div>Delivery Charge: ₹30</div>
            <hr>
            <div>Total: ₹${total + 30}</div>

            <p style="color:red; font-weight:bold; margin-top:15px;">
                ₹500 ya usse zyada ka product add karo to order place kar sakte ho.
            </p>
        </div>

        <button class="checkout" disabled
            style="background:#ccc; cursor:not-allowed;">
            Proceed to Checkout
        </button>
    `;

}
}


// PLUS
function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();
    showCart();
    updateCartCount();
}


// MINUS
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    saveCart();
    showCart();
    updateCartCount();
}


// REMOVE
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
    showCart();
    updateCartCount();
}


// START
updateCartCount();
showCart();

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText = searchInput.value.toLowerCase().trim();
            let found = false;
            const products = document.querySelectorAll(".product");

            products.forEach(function (product) {

                const productName = product.querySelector("h3");

                if (!productName) return;

                const name = productName.textContent.toLowerCase();

                                product.style.display = "";
               if (name.includes(searchText)) {
    product.style.display = "";
    found = true;
} else {
    product.style.display = "none";
}
    

            });
            let notFound = document.getElementById("notFound");

if (!notFound) {
    notFound = document.createElement("p");
    notFound.id = "notFound";
    notFound.style.textAlign = "center";
    notFound.style.fontSize = "20px";
    notFound.style.margin = "30px";
    document.querySelector(".products").appendChild(notFound);
}

if (searchText !== "" && !found) {
    notFound.textContent = "🔍 Product Not Found";
} else {
    notFound.textContent = "";
}

        });

    }
function filterCategory(category) {

    const products = document.querySelectorAll(".product");

    products.forEach(function(product) {

        const productCategory =
            product.getAttribute("data-category");

        if (productCategory === category) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });

    const productSection =
        document.getElementById("products");

    if (productSection) {
        productSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}
function addSavedProductToCart(button) {

    const product = button.closest(".product");

    if (!product) {
        alert("Product nahi mila!");
        return;
    }

    const name = product.querySelector("h3").textContent.trim();

    const price = Number(
        product.querySelector(".price").textContent
            .replace("₹", "")
            .trim()
    );

    const image = product.querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(function(item) {
        return item.name === name;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product added to cart!");
}
function addToWishlist(button) {

    const product = button.closest(".product");

    if (!product) {
        alert("Product nahi mila!");
        return;
    }

    const name = product.querySelector("h3").textContent.trim();

    const price = Number(
        product.querySelector(".price").textContent
            .replace("₹", "")
            .trim()
    );

    const image = product.querySelector("img").src;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadySaved = wishlist.find(function(item) {
        return item.name === name;
    });

    if (alreadySaved) {
        alert("Product already wishlist me hai!");
        return;
    }

    wishlist.push({
        name: name,
        price: price,
        image: image
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert("Product wishlist me add ho gaya!");
}