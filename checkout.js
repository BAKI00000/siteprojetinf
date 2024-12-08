// Validation et simulation de commande
function placeOrder() {
    const fullName = document.getElementById('full-name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;
    const country = document.getElementById('country').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Vérification des champs requis
    if (!fullName || !address || !city || !postalCode || !country || !cardNumber || !expiryDate || !cvv) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Validation du format de la carte et des dates (simple)
    const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!cardNumberPattern.test(cardNumber)) {
        alert("Numéro de carte invalide. Utilisez le format 1234 5678 9012 3456.");
        return;
    }

    if (!expiryPattern.test(expiryDate)) {
        alert("Date d'expiration invalide. Utilisez le format MM/AA.");
        return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
        alert("CVV invalide. Il doit contenir 3 chiffres.");
        return;
    }

    // Confirmation de la commande
    alert("Commande validée ! Merci pour votre achat.");
    window.location.href = "confirmation.html"; // Redirection vers une page de confirmation
}

// Validation en temps réel
const cardNumberInput = document.getElementById('card-number');
const expiryDateInput = document.getElementById('expiry-date');
const cvvInput = document.getElementById('cvv');

cardNumberInput?.addEventListener('input', function () {
    const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardNumberPattern.test(cardNumberInput.value)) {
        cardNumberInput.setCustomValidity("Numéro de carte invalide. Utilisez le format 1234 5678 9012 3456.");
    } else {
        cardNumberInput.setCustomValidity("");
    }
});

expiryDateInput?.addEventListener('input', function () {
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryPattern.test(expiryDateInput.value)) {
        expiryDateInput.setCustomValidity("Date d'expiration invalide. Utilisez le format MM/AA.");
    } else {
        expiryDateInput.setCustomValidity("");
    }
});

cvvInput?.addEventListener('input', function () {
    if (cvvInput.value.length !== 3 || isNaN(cvvInput.value)) {
        cvvInput.setCustomValidity("CVV invalide. Il doit contenir 3 chiffres.");
    } else {
        cvvInput.setCustomValidity("");
    }
});

// Affiche le résumé de la commande sur `checkout.html`
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummaryContainer = document.getElementById('order-items');
    const totalElement = document.getElementById('order-total');
    orderSummaryContainer.innerHTML = '';

    if (cart.length === 0) {
        orderSummaryContainer.innerHTML = '<p>Votre panier est vide.</p>';
        totalElement.textContent = '0 €';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const orderItem = document.createElement('p');
        orderItem.textContent = `${item.name} - ${item.price.toFixed(2)} € x ${item.quantity}`;
        orderSummaryContainer.appendChild(orderItem);
    });

    totalElement.textContent = `${total.toFixed(2)} €`;
}

// Charge les informations lors du chargement de `checkout.html`
window.onload = function() {
    if (document.getElementById('order-items')) {
        displayOrderSummary();
    }
    updateCartIcon();
};

// Mise à jour de l'icône du panier
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-link').textContent = `🛒 Panier (${itemCount})`;
}
