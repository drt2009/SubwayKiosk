$(document).ready(function() {

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
    $('table.order').html(html);
    $('.orderTotal').html(total.toFixed(2));
  };

  $('section.menuItemButton').click(function(e) {
    e.preventDefault();
    var menuItemAttributes = $(this).data('attributes');
    if (!menuItemAttributes.isCondiment) {
      currentMenuItem.condiments.push(menuItemAttributes.name);
    } else {
      var menuItem = menuItems.push(new MenuItem(menuItems.length, menuItemAttributes));
      if (!menuItemAttributes.hasCondiments) currentMenuItem = menuItem;
    }
    rebuildOrder();
  });
});