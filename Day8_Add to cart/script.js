// Initialize cart
let cart = [];

// Function to update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    
    // Clear previous items
    cartItems.innerHTML = '';
    
    // Calculate total
    let total = 0;
    
    // Add items to cart display
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });
    
    // Update total amount
    totalAmount.textContent = `Total: $${total}`;
}

// Event listener for add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        // Add item to cart
        cart.push({ name, price });
        
        // Update cart display
        updateCart();
    });
});

// Event listener for checkout button
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Thank you for your purchase!');
        cart = []; // Clear cart
        updateCart(); // Update display
    } else {
        alert('Your cart is empty!');
    }
});