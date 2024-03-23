// Function to create a new order section
function createOrderSection() {
    var container = document.querySelector('.container');

    // Create new elements for the order section
    var newOrder = document.createElement('div');
    newOrder.classList.add('orders');
    newOrder.innerHTML = `
        <form>
            <label><p>Choice</p></label>
            <select name="foods" class="foodie">
                <option value="60">Burger</option>
                <option value="50">Fries</option>
                <option value="20">Fishbol</option>
                <option value="25">Kikiam</option>
            </select>          
            <label><p>Quantity</p></label>
            <input type="number" class="foodies"><br><br>
        </form>
    `;

    // Append the new order section to the container
    container.appendChild(newOrder);
}

// Function to handle finalizing the order
function finalizeOrder() {
    var orders = document.querySelectorAll('.orders');
    var totalValue = 0;

    // Check if there are any orders
    if (orders.length === 0) {
        alert("Please add at least one item to finalize the order");
        return;
    }

    // Loop through each order
    orders.forEach(function(order) {
        var select = order.querySelector('.foodie');
        var input = order.querySelector('.foodies');

        // Check if select and input exist
        if (!select || !input) {
            alert("Error: Order elements not found");
            return;
        }

        var quantity = parseInt(input.value, 10);
        var price = parseFloat(select.value);

        // Check if any field is empty or not a number
        if (isNaN(price) || isNaN(quantity)) {
            alert("Please fill all fields with valid numbers");
            return;
        }

        // Calculate the total value for each order and add to the total
        totalValue += price * quantity;
    });

    // Display the total value
    alert("Total: " + totalValue.toFixed(2));

    // Store the total value in a data attribute for later use
    document.getElementById('totalValue').setAttribute('data-total-value', totalValue);
}

// Function to handle the payment process
function processPayment() {
    // Get the customer's cash
    var customerCashInput = document.getElementById('payment');
    var customerCash = parseFloat(customerCashInput.value);

    // Check if the customer's cash is a valid number
    if (isNaN(customerCash)) {
        alert("Please enter a valid amount for customer's cash");
        return;
    }

    // Ensure the total order value has been calculated
    var totalValue = parseFloat(document.getElementById('totalValue').getAttribute('data-total-value'));
    if (isNaN(totalValue)) {
        alert("Please finalize the order first");
        return;
    }

    // Check if the customer's cash is sufficient
    if (customerCash < totalValue) {
        alert("Customer's cash is insufficient");
        return;
    }

    // Calculate the change
    var change = customerCash - totalValue;

    // Display the change in an alert
    alert("Change: " + change.toFixed(2));
}

// Add event listener to "Add a food item" button
document.getElementById('add').addEventListener('click', function() {
    // Create a new order section
    createOrderSection();
});

// Add event listener to "Finalize order" button
document.getElementById('finalize').addEventListener('click', function() {
    // Finalize the order
    finalizeOrder();
});

// Add event listener to "Pay" button
document.getElementById('pay').addEventListener('click', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Process the payment
    processPayment();
});
