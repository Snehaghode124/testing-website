document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update the cart display
    const updateCartDisplay = () => {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = ''; // Clear previous items

        //let totalAmount = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.price}</p>
                <button class="delete-item" data-index="${index}">Delete</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            // Add item price to total amount
           // totalAmount += parseFloat(item.price.replace('$', ''));
        });

        //document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart.splice(index, 1); // Remove item from cart
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                updateCartDisplay(); // Update display
            });
        });
    };

    // Initial cart display
    if (document.getElementById('cart-items')) {
        updateCartDisplay();
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
