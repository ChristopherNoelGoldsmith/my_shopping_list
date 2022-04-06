(function () {
  //CONSTRUCTORS
  //LIST ITEM CONST
  const ListItem = function (price, item) {
    this.price = price;
    this.item = item;
  };
  //LIST OBJECT CONST
  const MakeList = function (list) {
    this.list = list;
  };

  //ON LOAD

  const newList = new MakeList([]);

  //

  MakeList.prototype.deleteFromList = function (el) {
    //nth child slice from list;
    $(`#${el}`).parent().remove();
  };

  MakeList.prototype.createListItem = function () {
    const item = $('#add-item').val();
    const price = $('#add-price').val();

    $('#add-price').add('#add-item').val('');

    const newItem = new ListItem(price, item);
    newItem.makeTemplate();
    newItem.addToList();
    newList.list.push(newItem);
  };

  //ORGANIZES LIST BY PRICE BOTH ACENDING AND DECENDING
  MakeList.prototype.organize = function (type) {
    const priceAcending = () => {
      this.list.sort(function (a, b) {
        return a.price - b.price;
      });
    };

    const priceDecending = () => {
      this.list.sort(function (a, b) {
        return b.price - a.price;
      });
    };

    console.log(this);

    if (type == 'acending') priceAcending();
    if (type == 'decending') priceDecending();

    $('#list').children().remove();

    this.list.forEach((el) => {
      $(el.template).appendTo('#list');
    });
  };

  //Creates list html element
  ListItem.prototype.addToList = function () {
    console.log(this);
    $(this.template).appendTo('#list');
  };

  //HTML LIST TEMPLATE
  ListItem.prototype.makeTemplate = function () {
    return (this.template = `<div class='li-parent'>
        <div class='price'>$${this.price}</div>
        <div class='item'>${this.item}</div>
        <div class="fa-solid fa-circle-minus" id='delete-btn'></div>
        </div>`);
  };

  //CONTEXT SENSITIVE EVENT ACTIVATOR USING HTML TAGS
  $(document).on('click', function (event) {
    const target = event.target.id;
    console.log(event.target.id);
    if (target == 'delete-btn') newList.deleteFromList(target);
    if (target == 'add-btn') newList.createListItem(target);
    if (target == 'acending' || target == 'decending') newList.organize(target);
  });
})();
