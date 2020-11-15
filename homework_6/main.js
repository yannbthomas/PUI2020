
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
    console.log(orderSize)
    document.getElementById("buns").innerHTML = orderSize
}

// Storing glaze type, quantity & price when "ADD" is selected 
function addOrigBuns() {
    // Check that customer isn't exceeding order size
    if (bunQuant > totalBuns) {
        alert("Oops! Looks like that's more buns that your current order size. Head back to the Order Size tab to add more!")
    
    } else { /* Core functionality */
        // Number of original buns, selected in the popout's number input
        var bunQuant = document.getElementById('originalQuant').value
        // Size of order, based on selection made in bunSize
        var totalBuns = parseFloat(document.getElementById('buns').innerText)
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
        document.getElementById('buns').innerHTML = totalBuns - bunQuant ;
        document.getElementById('price').innerHTML = (totalPrice + bunPrice) / 1;

        // Add new bun to fulllOrder array, and store
        var newBun = new Bun("Original", glazeType, bunQuant, bunPrice);
        fullOrder.push(newBun);
        localStorage.setItem("fullOrder", JSON.stringify(fullOrder));

        var para = document.createElement("p");
        var node = document.createTextNode("Jus a test");
        para.appendChild(node);
        var element = document.getElementById("summary");
        element.appendChild(para);
        
        togAndClear();
    }
    

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

function test() {
    var order = JSON.parse(localStorage.getItem("fullOrder"))
    console.log(order);
}






