$(document).ready(function() {
  var container = $(".container");
  var buttonContainer = $(".buttonContainer");

  //should be main menu later
  buttonContainer.html($(".buttonDiv.mainMenu").html());

  function MenuItem(id, options) {
    this.id = id;
    this.price = options.price;
    this.name = options.name;
    this.condiments = (options.condiments || []);
  }

  var currentMenuItem = null;
  var menuItems = [];

  var rebuildOrder = function () {
    var html = "";
    var total = 0;
    for (var i = 0; i < menuItems.length; i++) {
      total += parseFloat(menuItems[i].price);
      html += "<tr>" +
        "<td><a class='btn btn-danger delete' data-index='" + i + "'>X</a></td>" +
        "<td class='number'>" + (i + 1) + "</td>" +
        "<td class='name'>" + menuItems[i].name + "</td>" +
        "<td class='price'>$ " + menuItems[i].price + "</td></tr>";

      if (menuItems[i].condiments.length > 0) {
        for (var j = 0; j < menuItems[i].condiments.length; j++) {
          html += "<tr><td></td><td class='number'></td><td class='name'>" + menuItems[i].condiments[j] + "</td><td class='price'></td></tr>";
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
        var menuItem = new MenuItem(menuItems.length, menuItemAttributes);
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
    console.log(menuItems);
    rebuildOrder();
  });
});