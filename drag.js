var itemsInCheckout = [];

function allowDrop(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
  console.log("endddd");
}
  
  //function drag(ev) {
    //ev.preventDefault();
    //ev.dataTransfer.setData("text", ev.target.id);
    //console.log(ev.target.id);
  //}

  function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    console.log("start");
  }
  
  function drop(ev) {
    ev.preventDefault();
    var checkout = document.createElement("div");
    var data = ev.dataTransfer.getData("text/plain");
    var name = document.getElementById(data).getAttribute("name");
    var quantity = "1";

    if (myInclude(itemsInCheckout, name)) {
      for (var i = 0; i < itemsInCheckout.length; i++)
      {
        if (itemsInCheckout[i].name == name) {
          itemsInCheckout[i].quantity = (parseInt(itemsInCheckout[i].quantity) + 1).toString();
          var str = "q-"+name;
          document.getElementById(str).innerHTML = "";
          document.getElementById(str).innerHTML = itemsInCheckout[i].quantity;
          break;
        }
      }
    }
    else {
      var price = (document.getElementById(data).getAttribute("price"));
      itemsInCheckout.push({"name" : name , "price" : price , "quantity" : quantity})
      for (var i = 0; i < itemsInCheckout.length; i++)
      {
        var namediv = document.createElement("div");
        namediv.appendChild(document.createTextNode(itemsInCheckout[i].name));
        var price = document.createElement("div");
        price.appendChild(document.createTextNode(itemsInCheckout[i].price));
        var quantity = document.createElement("div");
        quantity.id = "q-"+name;
        quantity.appendChild(document.createTextNode(itemsInCheckout[i].quantity));
        checkout.appendChild(namediv);
        checkout.appendChild(price);
        checkout.appendChild(quantity);
        ev.target.appendChild(checkout);       
      }
    }

    function myInclude (array, name) {
      for (var i = 0; array.length > i; i++)
      {
        if (array[i].name == name) {
        return true;
        }
      }
      return false;
    }

    
    console.log("end");
    console.log(itemsInCheckout);

    //var sprite = document.getElementById(data);
    //var container = document.createElement("div");
    //container.className = "chosen-sprite";
    //container.appendChild(name);
    //container.appendChild(price);
    //container.appendChild(quantity);
    //ev.target.appendChild(container);

  }
  
  $(document).ready(function() {
});