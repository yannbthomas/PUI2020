
/*********** orderSize ************/

// Storing number of buns selected
function oneBun() {
    var orderSize = 1
    var orderSizeString = orderSize.toString()
    localStorage.setItem('bunsLeft', orderSizeString)
}

function threeBuns() {
    var orderSize = 3
    var orderSizeString = orderSize.toString()
    console.log(orderSizeString)
    localStorage.setItem('bunsLeft', orderSizeString)
}

function sixBuns() {
    var orderSize = 6
    var orderSizeString = orderSize.toString()
    localStorage.setItem('bunsLeft', orderSizeString)
}

function dozenBuns() {
    var orderSize = 12
    var orderSizeString = orderSize.toString()
    localStorage.setItem('bunsLeft', orderSizeString)
}

/*********** selectOriginal ************/

const fullOrder = []

function Bun(type, glaze, num, price) {
    this.type = type;
    this.glaze = glaze; 
    this.num = num; 
    this.price = price;
}

// Dynamically loads the order size into selectOriginal "Buns left" area
function bunLoad() {
    var orderSize = Number(localStorage.getItem('bunsLeft'))
    document.getElementById("buns").innerHTML = orderSize
}

// Storing glaze type, quantity & price when "ADD" is selected 
function addOrigBuns() {
    // Number of original buns, selected in the popout's number input
    var bunQuant = document.getElementById('originalQuant').value
    // Size of order, based on selection made in bunSize
    var totalBuns = parseFloat(document.getElementById('buns').innerText)

    // Check that customer isn't exceeding order size
    if (bunQuant > totalBuns) {
        alert("Oops! Looks like that's more buns that your current order size. Head back to the Order Size tab to add more!")
    
    } else { /* Core functionality */
        var bunPrice = (bunQuant * 109) / 100
        // Collects $0.00 total price from selectOriginal
        var totalPrice = parseFloat(document.getElementById('price').innerText)
        var glazes = document.getElementsByName('glaze'); 
        
        // Checks popup to assign bun glazing
        for(i = 0; i < glazes.length; i++) { 
            if(glazes[i].checked) 
            var glazeType = glazes[i].value;
        } 

        // Remaining buns
        var newBunsLeft = totalBuns - bunQuant;

        // Add price of new original buns to the price in the order summary
        var newPrice = totalPrice + bunPrice;

        // Write in new values into selectOriginal
        document.getElementById('buns').innerHTML = newBunsLeft;

        if (newPrice < 10) {
            document.getElementById('price').innerHTML = newPrice.toPrecision(3);
        } else {
            document.getElementById('price').innerHTML = newPrice;
        }
        

        // Add new bun to fulllOrder array, and store
        var newBun = new Bun("Original", glazeType, bunQuant, bunPrice);
        fullOrder.push(newBun);
        localStorage.setItem("fullOrder", JSON.stringify(fullOrder));
        
        if (bunQuant == 1) {
            var bunLab = "Bun"
        } else if (bunQuant > 1) {
            var bunLab = "Buns"
        }

        var para = document.createElement("p");
        var node = document.createTextNode(bunQuant + " " + newBun.type + " " + bunLab + " / " + glazeType + " Glaze");
        para.appendChild(node);
        var element = document.getElementById("summary");
        element.appendChild(para);
 
        togAndClear();
    }
}

// Link to cart page, store final price
function addToCart () {
    // Optional: Check that customer has ordered all buns, based on order size

    var finalPrice = document.getElementById('price').innerHTML
    var priceAsString = finalPrice.toString()
    localStorage.setItem('finalPrice', priceAsString)
    window.location.href='cart.html';
}

// Clear and toggle popup
function togAndClear() {
    var glazes = document.getElementsByName('glaze'); 
    // Toggles popup display after clicking
    var popup = document.getElementById("popup");
    popup.style.display = "none";

    // Clear radion buttons
    for(i=0; i < glazes.length; i++)
        glazes[i].checked = false;

    // Clear number input
    document.getElementById('originalQuant').value = '';
}

// Toggle the view of the ADD popup
function toggle() {
    var popup = document.getElementById("popup");
    if (popup.style.display === "block") {
      popup.style.display = "none";
    } else {
      popup.style.display = "block";
    }
}

/*********** cart ************/

function loadCart() {
    console.log(JSON.parse(localStorage.getItem("fullOrder")));
    var orderSum = JSON.parse(localStorage.getItem("fullOrder"));

    // Dynamically load total order size, optional if extra time
    // var orderSize = Number(localStorage.getItem('bunsLeft'))
    // document.getElementById("totBuns").innerHTML = orderSize

    // Dynamically load total order price
    var orderPrice = Number(localStorage.getItem('finalPrice'))
    document.getElementById("totPrice").innerHTML = orderPrice

    
    for (i=0; i < orderSum.length; i++) {
        var type = orderSum[i].type
        var num = orderSum[i].num
        var glaze = orderSum[i].glaze
        var price = orderSum[i].price

        if (num == 1) {
            var bunLab = "Bun"
        } else if (num > 1) {
            var bunLab = "Buns"
        }

        // Writes order information into the cart summary section
        var span = document.createElement("span");
        var node = document.createTextNode("$" + price + " / " + num + " " + type + " " + 
                    bunLab + " / " + glaze + " Glaze  / ")
        span.appendChild(node);

        // Create Remove button
        var btn = document.createElement("button");
        btn.innerHTML = "Delete"
        btn.onclick = function Remove() {
            console.log("This worked")
            orderSum.splice(i, i+1)
            console.log(orderSum)
        }

        var br = document.createElement("br");
        var br2 = document.createElement("br");

        var element = document.getElementById("fullSum");
        element.appendChild(span);
        element.appendChild(btn);
        element.appendChild(br);
        element.appendChild(br2);

    }
    

}

// Ight so my sense is, we repeat the code from the order summary section
// Just make it an onload function the loads the info in

// But the delete buttons! Here's a guess: add a command that also generates a delete button beside each order item






