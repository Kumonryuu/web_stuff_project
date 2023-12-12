$('.open-cart').magnificPopup({
    type:'inline',
    closeBtnInside: false,
    midClick: true
});

$(document).ready(function() {
    let cartItems = {};

    $(document).on('input', '.item-quantity', function() {
        const itemName = $(this).data('item-name');
        const quantity = parseInt($(this).val());
        const price = cartItems[itemName].price;
        cartItems[itemName].quantity = quantity;
        cartItems[itemName].totalPrice = quantity * price;
        updateCart();
    });

    $('.product-item button').click(function() {
        const button = $(this);
        const product = button.closest('.product-item');
        const productName = product.find('h3').text();
        const productPrice = parseFloat(product.find('.price').text().replace('$', ''));
        const productImage = product.find('img').attr('src');

        if (cartItems[productName]) {
            cartItems[productName].quantity += 1;
            cartItems[productName].totalPrice += productPrice;
        } else {
            cartItems[productName] = {
                price: productPrice,
                quantity: 1,
                totalPrice: productPrice,
                image: productImage
            };
        }

        button.addClass('added').text('Added!');
        setTimeout(function() {
            button.removeClass('added').text('Add to Cart');
        }, 3000);

        updateCart();
    });

    function updateCart() {
        let popupContent;
        let subtotal = 0;

        if (Object.keys(cartItems).length === 0) {
            popupContent = '<p class="cart-empty">Your cart is empty.</p>';
        } else {
            popupContent = '<table><tr><th></th><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr>';

            for (let item in cartItems) {
                popupContent += '<tr><td><img src="' + cartItems[item].image + '" width="50" height="50"></td><td>' + item + '</td><td><input type="number" min="0" class="item-quantity" data-item-name="' + item + '" value="' + cartItems[item].quantity + '"></td><td>$' + cartItems[item].price.toFixed(2) + '</td><td>$' + cartItems[item].totalPrice.toFixed(2) + '</td></tr>';
                subtotal += cartItems[item].totalPrice;
            }

            popupContent += '<tr><td colspan="4">Subtotal</td><td>$' + subtotal.toFixed(2) + '</td></tr></table>';
            popupContent += '<button class="checkout">Checkout</button>';
        }

        $('.white-popup').html(popupContent);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    $(document).on('input', '.item-quantity', function() {
        const input = $(this);
        const itemName = input.data('item-name');
        const quantity = parseInt(input.val());

        if (quantity > 0) {
            cartItems[itemName].quantity = quantity;
            cartItems[itemName].totalPrice = cartItems[itemName].price * quantity;
        } else {
            delete cartItems[itemName];
        }

        updateCart();
    });

    updateCart();
});