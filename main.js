const hamburgerMenu = $("#Hamburger-menu");
const quantityNotification = $("#quantity-notification");
const cart = $("#cart-icon");
const cartDetails = $("#cart-card");
const navigation = $("nav");
const nextImage = $("#next");
const previousImage = $("#previous");
const fullProductImageContainer = $("figure");
const fullProductImage = $(".full-product-image");
const thumbnails = $(".thumbnails");
const thumbnail = $(".thumbnails div");
const minus = $("#less");
const plus = $("#more");
const productQunatity = $("#product-quantity");
const addToCart = $("#add-to-cart-button");

const blackBackground = $("<div class='black'></div>");

let currentImage = 0;
let productQuantityCounter = 0;
let cartDetailsStatut = false;
let $window = $(window);

cartDetails.html(cartDetail());
cartDetails.hide();

// Hamburger Menu intercation
hamburgerMenu.click(function () {
  navigation.toggleClass("open");
  if (navigation.hasClass("open")) {
    blackBackground.insertBefore(navigation);
    $("body").css("overflow", "hidden");
  } else {
    $(".black").remove();
    $("body").css("overflow", "scroll");
  }
});

// Gallery mobile navigation
nextImage.click(function () {
  if (currentImage != fullProductImage.length - 1) {
    currentImage++;
  } else {
    currentImage = 0;
  }
  fullProductImageContainer.css("left", "-" + currentImage * 100 + "vw");
});

previousImage.click(function () {
  if (currentImage != 0) {
    currentImage--;
  } else {
    currentImage = fullProductImage.length - 1;
  }
  fullProductImageContainer.css("left", "-" + currentImage * 100 + "vw");
});

// Gallery Desktop navigation
thumbnail.click(function () {
  const thumbIndex = thumbnail.index(this);
  fullProductImageContainer.css("left", "-" + thumbIndex * 30 + "vw");
  for (let i = 0; i < thumbnail.length; i++) { //Remove Active class from all thumbnails
    $(thumbnail[i]).removeClass("active");
  }
  $(this).addClass("active");
});

// Product quantity selection
minus.click(function () {
  productQuantityCounter > 0 ? productQuantityCounter-- : 0;
  productQunatity.text(productQuantityCounter);
});

plus.click(function () {
  productQuantityCounter++;
  productQunatity.text(productQuantityCounter);
});

addToCart.click(function () {
  if (productQuantityCounter > 0) {
    cartDetails.html(cartDetail());
    quantityNotification.text(productQuantityCounter);
    quantityNotification.css("display", "inherit");
  }
});

// Display cart details
cart.click(function () {
  cartDetails.html(cartDetail());
  const emptyCart = $("#trash-icon");
  //   Empty cart function
  emptyCart.click(function () {
    productQuantityCounter = 0;
    cartDetails.html(cartDetail());
    quantityNotification.css("display", "none");
    productQunatity.text("0");
  });
  if (cartDetailsStatut) {
    cartDetails.hide();
    cartDetailsStatut = false;
  } else if (!cartDetailsStatut) {
    cartDetails.show();
    cartDetailsStatut = true;
  }
});

function cartDetail() {
  if (productQuantityCounter > 0) {
    return `
        <p>Cart</p>
        <hr />
        <div class="cart-details">
            <img src="./images/image-product-1-thumbnail.jpg" alt="product-tuhmbnail">
            <p>Fall Limited Edition Sneakers</p>
            <p>$125.00 x ${productQuantityCounter} <span id="cart-total">$${(
      125 * productQuantityCounter
    ).toFixed(2)}</span></p>
            <img src="./images/icon-delete.svg" alt="trash-icon" id='trash-icon'>
        </div>
        <button>Checkout</button>
        `;
  } else {
    return `
        <p>Cart</p>
        <hr />
        <p class='empty-cart'>Your cart is empty.</p>
        `;
  }
}

// Hide cart detail
$(document).on("click", function (e) {
  if (
    !$(e.target).closest(cartDetails).length &&
    !$(e.target).closest(cart).length
  ) {
    cartDetails.hide();
    cartDetailsStatut = false;
  }
});

// Check screen width for image Gallery inner HTML
// function checkWidth() {
//   var windowsize = $window.width();
//   if (windowsize > 1023) {
//     fullProductImageContainer.html(`
//         <img
//         class="full-product-image"
//         src="./images/image-product-1.jpg"
//         alt="image-product-1"
//       />
//         `);
//   } else {
//     fullProductImageContainer.html(`
//         <img
//         class="full-product-image"
//         src="./images/image-product-1.jpg"
//         alt="image-product-1"
//       />
//       <img
//         class="full-product-image"
//         src="./images/image-product-2.jpg"
//         alt="image-product-2"
//       />
//       <img
//         class="full-product-image"
//         src="./images/image-product-3.jpg"
//         alt="image-product-3"
//       />
//       <img
//         class="full-product-image"
//         src="./images/image-product-4.jpg"
//         alt="image-product-4"
//       />
//         `);
//   }
// }