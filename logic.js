$(document).ready(function() {
  var container = $(".container");
  var buttonContainer = $(".buttonContainer");
  var currentTimeout = null;

  //should be main menu later
  buttonContainer.html($(".buttonDiv.mainMenu").html());

  var currentMenuItem = null;
  var menuItems = [];
  var ids = 0;

  function MenuItem(options) {
    this.id = ids++;
    this.price = options.price;
    this.name = options.name;
    this.condiments = (options.condiments || []);
  }

  var rebuildOrder = function () {
    var html = "";
    var total = 0;
    for (var i = 0; i < menuItems.length; i++) {
      total += parseFloat(menuItems[i].price);
      html += "<tr>" +
        "<td><a class='btn btn-danger delete' data-index='" + i + "'>X</a></td>" +
        "<td><a class='btn btn-success duplicate' data-index='" + i + "'>+</a></td>" +
        "<td class='name'>" + menuItems[i].name + "</td>" +
        "<td class='price'><b>$ " + menuItems[i].price + "</b></td></tr>";

      if (menuItems[i].condiments.length > 0) {
        for (var j = 0; j < menuItems[i].condiments.length; j++) {
          html += "<tr><td></td><td></td><td class='name'><i>" + menuItems[i].condiments[j] + "</i></td><td class='price'></td></tr>";
        }
      }
    }
    $('table.order').html(html);
    $('.orderTotal').html("<b>TOTAL: $" + total.toFixed(2) + "</b>");
  };

  rebuildOrder();

  container.on("click", '.menuItemButton', function (e) {
    e.preventDefault();
    var menuItemAttributes = $(this).data('attributes');
    if(menuItemAttributes) {
      if (menuItemAttributes.isCondiment === "true") {
        var input = $(this).find("input");
        if (input.length > 0) {
          if (input.prop("checked")) {
            var index = currentMenuItem.condiments.indexOf(menuItemAttributes.name);
            currentMenuItem.condiments.splice(index, 1);
            input.prop("checked", false);

          } else {
            currentMenuItem.condiments.push(menuItemAttributes.name);
            input.prop("checked", true);
          }
        } else {
          currentMenuItem.condiments.push(menuItemAttributes.name);
        }
      } else {
        var menuItem = new MenuItem(menuItemAttributes);
        menuItems.push(menuItem);
        if (menuItemAttributes.hasCondiments === "true") currentMenuItem = menuItem;
      }
    }
    var next = ($(this).data("next") || $(this).closest(".nextDiv").data("next"));
    if (next) buttonContainer.html($(".buttonDiv." + next).html());
    if (next === "mainMenu") currentMenuItem = null;

    rebuildOrder();
  });

  container.on("click", 'a.delete', function (e) {
    e.preventDefault();
    menuItems.splice(parseInt($(this).data("index"), 10), 1);
    rebuildOrder();
  });

  container.on("click", 'a.duplicate', function (e) {
    console.log("jhhit")
    e.preventDefault();
    var copyItem = menuItems[parseInt($(this).data("index"), 10)];
    var menuItem = new MenuItem({price: copyItem.price, name: copyItem.name, condiments: copyItem.condiments});
    menuItems.push(menuItem);
    rebuildOrder();
  });

  $('.placeOrder').click(function (e) {
    buttonContainer.html($(".buttonDiv.confirmation").html());
    buttonContainer.find(".confirmationMessage").html("Are you sure you want to finish your order?");
  });

  $('.cancelOrder').click(function (e) {
    buttonContainer.html($(".buttonDiv.confirmation").html());
    buttonContainer.find(".confirmationMessage").html("Are you sure you want to cancel your order?");
  });

  container.on("click",'.clearOrder', function (e) {
    menuItems = [];
    rebuildOrder();
    currentTimeout = setTimeout(function() {buttonContainer.html($(".buttonDiv.mainMenu").html());}, 5000);
  });

  container.on("click",'.clearTimeout', function (e) {
    if (currentTimeout !== null) {
      clearTimeout(currentTimeout);
      currentTimeout = null;
    }
  });
});