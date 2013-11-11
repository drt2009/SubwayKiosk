$( document ).ready(function() {
  $('a.menuItemButton').click(function(e) {
    e.preventDefault();
    var menuItemAttributes = $(this).data('attributes');
    var row = $('tr.menuItemDisplay');
    row.find('.itemID').html("1");
    row.find('.itemName').html(menuItemAttributes.name);
    row.find('.itemPrice').html(menuItemAttributes.price);
  });
});