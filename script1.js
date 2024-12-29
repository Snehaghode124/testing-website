document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('h2').innerText;
            const productPrice = product.querySelector('p').innerText;

            const cartItem = { id: productId, name: productName, price: productPrice };

            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} has been added to your cart`);
        });
    });

    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'user' && password === 'password') {
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

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

    if (document.getElementById('clear-cart')) {
        document.getElementById('clear-cart').addEventListener('click', () => {
            localStorage.removeItem('cart');
            alert('Cart has been cleared');
            window.location.reload();
        });
    }
});
