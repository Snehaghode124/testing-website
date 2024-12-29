document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Handle adding to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('h2').innerText;
            const productPrice = product.querySelector('p').innerText;

            const cartItem = { id: productId, name: productName, price: productPrice };

            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`Item has been added to your cart`);
        });
    });

    // Handle viewing product details
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('h2').innerText;
            const productPrice = product.querySelector('p').innerText;
            const productImage = product.querySelector('img').src;
            const productDescription = "This is a detailed description of the product.";

            localStorage.setItem('productDetails', JSON.stringify({ id: productId, name: productName, price: productPrice, image: productImage, description: productDescription }));

            window.location.href = 'product.html';
        });
    });

    // Load product details
    if (window.location.pathname.endsWith('product.html')) {
        const productDetails = JSON.parse(localStorage.getItem('productDetails'));
        if (productDetails) {
            document.getElementById('product-image').src = productDetails.image;
            document.getElementById('product-name').innerText = productDetails.name;
            document.getElementById('product-price').innerText = productDetails.price;
            document.getElementById('product-description').innerText = productDetails.description;

            document.getElementById('add-to-cart').addEventListener('click', () => {
                cart.push(productDetails);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`Item has been added to your cart`);
            });
        }
    }

    // Handle login form submission
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'sneha' && password === '1234') {
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Load cart items
    if (document.getElementById('cart-items')) {
        const cartItemsContainer = document.getElementById('cart-items');
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.price}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Handle clearing the cart
    if (document.getElementById('clear-cart')) {
        document.getElementById('clear-cart').addEventListener('click', () => {
            localStorage.removeItem('cart');
            alert('Cart has been cleared');
            window.location.reload();
        });
    }
});
