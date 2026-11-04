// list of products
var products = [
  {
    id: 1,
    name: "Wooden ABC Blocks",
    age: "1-3",
    price: 799,
    image: "images/block.jpg",
    description: "Wooden blocks with letters and bright colours. Easy for small hands to hold and stack."
  },
  {
    id: 2,
    name: "Rainbow Stacking Rings",
    age: "1-3",
    price: 549,
    image: "images/rings.jpeg",
    description: "Colourful rings that stack on a pole. Helps toddlers learn sizes and colours."
  },
  {
    id: 3,
    name: "Picture Puzzle Set",
    age: "4-6",
    price: 649,
    image: "images/puzzle.jpeg",
    description: "Thick jigsaw puzzle pieces with animal pictures. Good for matching shapes and solving problems."
  },
  {
    id: 4,
    name: "Bead Counting Frame",
    age: "4-6",
    price: 899,
    image: "images/abacus.jpeg",
    description: "A simple abacus with sliding beads. Helps children learn counting and basic addition."
  },
  {
    id: 5,
    name: "Mini Science Lab Kit",
    age: "7-10",
    price: 1499,
    image: "images/science.jpeg",
    description: "A kit with a flask and test tubes for easy and safe experiments at home."
  },
  {
    id: 6,
    name: "Build-a-Robot Kit",
    age: "7-10",
    price: 1999,
    image: "images/Build-a-Robot kit.jpeg",
    description: "Snap-together robot with 120 pieces. Helps with logical thinking and following instructions."
  }
];

// cart holds objects like { id: 1, qty: 2 }
var cart = [];

function getProduct(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      return products[i];
    }
  }
}

// show products on the page (filtered by age group)
function filterProducts(age) {
  var output = "";
  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    if (age == "all" || p.age == age) {
      output += '<div class="product">';
      output += '<img src="' + p.image + '" alt="' + p.name + '">';
      output += '<h3>' + p.name + '</h3>';
      output += '<p class="age">Age group: ' + p.age + ' years</p>';
      output += '<p class="price">Rs. ' + p.price + '</p>';
      output += '<button onclick="showDetails(' + p.id + ')">View Details</button>';
      output += '<button onclick="addToCart(' + p.id + ')">Add to Cart</button>';
      output += '</div>';
    }
  }
  document.getElementById("product-list").innerHTML = output;
}

// show details of one product
function showDetails(id) {
  var p = getProduct(id);
  var output = '<div class="detail">';
  output += '<img src="' + p.image + '" alt="' + p.name + '">';
  output += '<div>';
  output += '<h3>' + p.name + '</h3>';
  output += '<p>Age group: ' + p.age + ' years</p>';
  output += '<p>Price: Rs. ' + p.price + '</p>';
  output += '<p>' + p.description + '</p><br>';
  output += '<button onclick="addToCart(' + p.id + ')">Add to Cart</button>';
  output += '</div></div>';
  document.getElementById("detail-box").innerHTML = output;
  document.getElementById("details").scrollIntoView();
}

function addToCart(id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart[i].qty++;
      showCart();
      return;
    }
  }
  cart.push({ id: id, qty: 1 });
  showCart();
}

function changeQty(id, amount) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart[i].qty += amount;
      if (cart[i].qty <= 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }
  showCart();
}

function removeFromCart(id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart.splice(i, 1);
      break;
    }
  }
  showCart();
}

// draw the cart table and update the total
function showCart() {
  var total = 0;
  var count = 0;

  if (cart.length == 0) {
    document.getElementById("cart-box").innerHTML = "<p>Your cart is empty.</p>";
  } else {
    var output = "<table>";
    output += "<tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th>Remove</th></tr>";
    for (var i = 0; i < cart.length; i++) {
      var p = getProduct(cart[i].id);
      var subtotal = p.price * cart[i].qty;
      total += subtotal;
      count += cart[i].qty;
      output += "<tr>";
      output += "<td>" + p.name + "</td>";
      output += "<td>Rs. " + p.price + "</td>";
      output += '<td><button onclick="changeQty(' + p.id + ', -1)">-</button> ' + cart[i].qty + ' <button onclick="changeQty(' + p.id + ', 1)">+</button></td>';
      output += "<td>Rs. " + subtotal + "</td>";
      output += '<td><button onclick="removeFromCart(' + p.id + ')">X</button></td>';
      output += "</tr>";
    }
    output += "</table>";
    document.getElementById("cart-box").innerHTML = output;
  }

  document.getElementById("cart-total").innerText = total;
  document.getElementById("cart-count").innerText = count;
}

// run when page loads
filterProducts("all");
showCart();
