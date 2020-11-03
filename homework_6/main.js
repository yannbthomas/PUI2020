/* orderSize: storing number of buns selected */

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


// selectOriginal: Dynamically loads the order size into selectOriginal "Buns left" area
function bunLoad() {
    var orderSize = Number(localStorage.getItem('bunsLeft'))
    console.log(orderSize)
    document.getElementById("buns").innerHTML = orderSize
}


/* selectOriginal: Storing glaze type, quantity & price when "ADD" is selected */
function addBuns() {
    var bunQuant = document.getElementById('originalQuant').value
    
    var totalBuns = parseFloat(document.getElementById('buns').innerText)
    

    var bunPrice = (bunQuant * 109) / 100
    var totalPrice = parseFloat(document.getElementById('price').innerText)
    

    var glazes = document.getElementsByName('glaze'); 
      
    for(i = 0; i < glazes.length; i++) { 
        if(glazes[i].checked) 
        var glazeType = glazes[i].value
    } 

    var popup = document.getElementById("popup");
    popup.style.display = "none";

    /* Update price/quantity totals in storage */
    var newBunsLeft = totalBuns - bunQuant
    var newPrice = totalPrice + bunPrice

    console.log(newBunsLeft)
    console.log(newPrice)
    

    document.getElementById('buns').innerHTML = totalBuns - bunQuant;
    document.getElementById('price').innerHTML = totalPrice + bunPrice;
}

/* selectOriginal: Toggle the view of the ADD popup */ 
function toggle() {
    var popup = document.getElementById("popup");
    if (popup.style.display === "block") {
      popup.style.display = "none";
    } else {
      popup.style.display = "block";
    }
}