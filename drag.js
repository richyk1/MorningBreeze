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
    var id = ev.dataTransfer.getData("text/plain");
    var name = document.getElementById(id).getAttribute("name");

    if (myInclude(itemsInCheckout, name)) {
        console.log("apelsin");
      for (var i = 0; i < itemsInCheckout.length; i++)
      {
        if (itemsInCheckout[i].name == name) {
          console.log("kiwi");
          var quantity = parseInt(itemsInCheckout[i].quantity) + 1;
          document.getElementById("cart-input-"+id).value = quantity ;
          itemsInCheckout[i].quantity = quantity;
          break;
        }
      }
    }
    else {
      console.log("banan");
      var price = (document.getElementById(id).getAttribute("price"));
      itemsInCheckout.push({"name" : name , "price" : price , "quantity" : "1"})

      itemToCart(name, price, id);
      cartTotal();
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