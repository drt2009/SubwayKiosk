$(document).ready(function() {
  var buttonContainer = $(".buttonContainer");

  //should be main menu later
  buttonContainer.html($(".buttonDiv.top").html());

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
        "<td>" + (menuItems[i].id + 1) + "</td>" +
        "<td>" + menuItems[i].name + "</td>" +
        "<td>$ " + menuItems[i].price + "</td></tr>";

      if (menuItems[i].condiments.length > 0) {
        for (var i = 0; i < menuItems[i].condiments.length; i++) {
          html += "<tr><td></td><td>" + menuItems[i].condiments[i] + "</td><td></td></tr>";
        }
      }
    }
    $('table.order tbody').html(html);
    $('.orderTotal').html(total.toFixed(2));
  };

  buttonContainer.on("click", 'section.menuItemButton', function (e) {
    e.preventDefault();
    var menuItemAttributes = $(this).data('attributes');
    if(menuItemAttributes) {
      if (!menuItemAttributes.isCondiment) {
        currentMenuItem.condiments.push(menuItemAttributes.name);
      } else {
        var menuItem = menuItems.push(new MenuItem(menuItems.length, menuItemAttributes));
        if (!menuItemAttributes.hasCondiments) currentMenuItem = menuItem;
      }
    }

    var next = ($(this).data("next") || $(this).closest(".buttonDiv").data("next"));
    if (next) buttonContainer.html($(".buttonDiv." + next).html());

    rebuildOrder();
  });
});