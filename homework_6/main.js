/* Running total of order price */
var totalPrice = 0

/* Storing glaze type, quantity & prize when "ADD" is selected */

function addBuns() {
    var bunQuant = document.getElementById('originalQuant').value
    var bunPrice = (bunQuant * 109) / 100

    var glazes = document.getElementsByName('glaze'); 
      
    for(i = 0; i < glazes.length; i++) { 
        if(glazes[i].checked) 
        var glazeType = glazes[i].value
    } 

    document.getElementById('price').innerHTML = totalPrice + bunPrice;
    alert(bunQuant + ' buns, price is $' + bunPrice + '. Glaze is ' + glazeType);
    location.replace("bunSelect.html")
}