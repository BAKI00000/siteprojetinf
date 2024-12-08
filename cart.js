// Fonction pour afficher les articles du panier dans cart.html
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalElement = document.getElementById('cart-total');
    cartContainer.innerHTML = '';

    // Vérifier si le panier est vide
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Votre panier est vide.</p>';
        totalElement.textContent = '0 €';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Crée un élément de panier
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image || 'default-image.jpg'}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h2>${item.name} (Taille: ${item.size || 'Unique'})</h2>
                <p>Prix unitaire : ${item.price.toFixed(2)} €</p>
                <div class="cart-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="remove-item-btn" onclick="removeItem('${item.id}')">Retirer</button>
            </div>
            <div class="item-total">
                ${itemTotal.toFixed(2)} €
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    totalElement.textContent = `${total.toFixed(2)} €`;
}

// Mise à jour de la quantité d'un article
function updateQuantity(itemId, quantityChange) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === itemId);

    if (item) {
        item.quantity += quantityChange;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== itemId);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartIcon(); // Mise à jour de l'icône du panier
}

// Supprime un article du panier
function removeItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartIcon();
}

// Mise à jour de l'icône du panier
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.textContent = `🛒 Panier (${itemCount})`;
    }
    console.log('Mise à jour de l\'icône du panier avec', itemCount, 'articles');
}

// Redirige vers la page de checkout
function redirectToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        window.location.href = "checkout.html";
    } else {
        alert("Votre panier est vide, vous ne pouvez pas passer à la caisse.");
    }
}

// Charge le panier lors du chargement de cart.html
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cart-container')) {
        displayCartItems();
    }
    updateCartIcon();
});
