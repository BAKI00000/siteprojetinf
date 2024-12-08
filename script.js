// Fonction pour ajouter un article au panier avec image et taille
console.log("script.js est chargé correctement.");
function addToCart(itemName, itemPrice, itemImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            image: itemImage
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${itemName} a été ajouté au panier !`);
    updateCartIcon();
    animateCartIcon();
}

// Fonction pour mettre à jour l'icône du panier
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-link').textContent = `🛒 Panier (${itemCount})`;
        console.log('Mise à jour de l\'icône du panier avec', itemCount, 'articles');  // Log pour vérifier la mise à jour de l'icône

}

// Fonction pour afficher une notification toast
function showToast(message) {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Fonction pour créer le conteneur de toast
function createToastContainer() {
    const container = document.createElement('div');
    container.classList.add('toast-container');
    document.body.appendChild(container);
    return container;
}

// Fonction pour animer l'icône du panier
function animateCartIcon() {
    const cartLink = document.querySelector('.cart-link');
    cartLink.classList.add('bounce');

    cartLink.addEventListener('animationend', () => {
        cartLink.classList.remove('bounce');
    }, { once: true });
}

// Mise à jour de l'icône au chargement de la page
window.onload = updateCartIcon;

// Fonction pour basculer la visibilité du mot de passe (si besoin)
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

// Indicateur de force du mot de passe
document.getElementById('password')?.addEventListener('input', function () {
    const strengthIndicator = document.querySelector('.password-strength');
    const value = this.value;

    strengthIndicator.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    if (value.length > 8 && /[A-Z]/.test(value) && /[0-9]/.test(value)) {
        strengthIndicator.classList.add('strength-strong');
        strengthIndicator.textContent = "Force : Fort";
    } else if (value.length >= 6) {
        strengthIndicator.classList.add('strength-medium');
        strengthIndicator.textContent = "Force : Moyen";
    } else {
        strengthIndicator.classList.add('strength-weak');
        strengthIndicator.textContent = "Force : Faible";
    }
});

// Validation de l'email en direct
document.getElementById('email')?.addEventListener('input', function () {
    const emailInput = this;
    const errorMessage = document.querySelector('.error-message');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value === "") {
        errorMessage.style.display = 'none';
    } else if (!emailPattern.test(emailInput.value)) {
        errorMessage.classList.add('show');
    } else {
        errorMessage.classList.remove('show');
    }
});

// Gestion du bouton de soumission avec feedback de chargement
document.querySelector('.submit-button')?.addEventListener('click', function(e) {
    e.preventDefault();
    const submitButton = this;
    submitButton.textContent = 'En cours...';
    submitButton.disabled = true;

    setTimeout(() => {
        submitButton.textContent = 'Créer mon compte';
        submitButton.disabled = false;
        alert("Votre compte a été créé avec succès !");
    }, 2000);
});

// Liste des produits pour la recherche avec images et prix
const products = [
    { name: "Sweat Blanc", url: "product-detail.html", image: "Front (8).png", price: "25.99 €" },
    { name: "Bob Orange", url: "bob-orange.html", image: "Frontj.png", price: "19.99 €" },
    { name: "Sweat Noir", url: "product_black.html", image: "Back (4).png", price: "25.99 €" },
    { name: "Bas Blanc", url: "bas_blanc.html", image: "Front (1).png", price: "9.99 €" },
    { name: "Bas Noir", url: "bas_noir.html", image: "Front (4).png", price: "9.99 €" },
    { name: "Casquette Blanche", url: "casquette_blanche.html", image: "Front (10).png", price: "15.99 €" },
    { name: "Casquette Noire", url: "casquette_noire.html", image: "Front (11).png", price: "15.99 €" },
    { name: "Chaussettes Confort", url: "chaussettes.html", image: "Flat Left Side (2).png", price: "7.99 €" }
];

// Gestion de la recherche
const searchInput = document.querySelector('input[type="search"]');
const suggestionsContainer = document.createElement('div');
suggestionsContainer.classList.add('suggestions');
searchInput.parentElement.appendChild(suggestionsContainer);

// Écouteur d'événements pour la recherche
searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';

    if (query) {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
        
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                
                suggestionItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="suggestion-image">
                    <div class="suggestion-details">
                        <p class="suggestion-name">${product.name}</p>
                        <p class="suggestion-price">${product.price}</p>
                    </div>
                `;
                
                suggestionItem.addEventListener('click', () => {
                    window.location.href = product.url;
                });

                suggestionsContainer.appendChild(suggestionItem);
            });
            suggestionsContainer.style.display = 'block';
        }
    }
});

// Fermer le conteneur de suggestions si on clique en dehors
document.addEventListener('click', function (event) {
    if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
        suggestionsContainer.style.display = 'none';
    }
});

// Initialisation du carrousel Swiper
document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1440: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        },
        on: {
            init: function () {
                // Nouvelle tentative de forçage de l'alignement initial
                const swiperInstance = this;
                swiperInstance.slideTo(0, 0); // Forcer à revenir au début
                setTimeout(() => {
                    swiperInstance.slideTo(swiperInstance.slides.length - 1, 1000); // Animation rapide
                }, 500);
            }
        }
    });
});
