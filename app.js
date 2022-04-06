(function () {
  //CONSTRUCTORS
  //LIST ITEM CONST
  const ListItem = function (price, item, id) {
    this.id = id;
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
    const delTarget = $(`#${el}`).parent().attr('id');

    this.list.every((el) => {
      if (el.id === delTarget) {
        const delIndex = this.list.indexOf(el);
        this.list.splice(delIndex, 1);
        return false;
      }
    });
    //nth child remove from list;
    return $(`#${el}`).parent().remove();
  };

  MakeList.prototype.createListItem = function () {
    const item = $('#add-item').val();
    const price = $('#add-price').val();
    if (item == '' || price == '') return;
    const id = `${item}-${Math.floor(Math.random() * 1000)}`;

    $('#add-price').add('#add-item').val('');

    const newItem = new ListItem(price, item, id);
    newItem.makeTemplate();
    newItem.addToList();
    newList.list.push(newItem);
  };

  MakeList.prototype.getTotal = function () {
    let total = 0;

    this.list.forEach((el) => {
      el.price *= 1;
      total += el.price;
    });

    return $('#total span').text(`$${total}`);
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

    if (type == 'acending') priceAcending();
    if (type == 'decending') priceDecending();

    $('#list').children().remove();

    this.list.forEach((el) => {
      $(el.template).appendTo('#list');
    });
  };

  //Creates list html element
  ListItem.prototype.addToList = function () {
    $(this.template).appendTo('#list');
  };

  //HTML LIST TEMPLATE
  ListItem.prototype.makeTemplate = function () {
    return (this.template = `<div id=${this.id} class='li-parent'>
        <div class='price'><i class="fa fa-money"></i> $${this.price}</div>
        <div class='item'>${this.item}</div>
        <div class="del" id='delete-btn'>Delete<i id='delete-btn' class="fa-solid fa-trash"></i></div>
        </div>`);
  };

  //CONTEXT SENSITIVE EVENT ACTIVATOR USING HTML TAGS
  $(document).on('click', function (event) {
    const target = event.target.id;
    console.log(event.target.id);
    switch (target) {
      case 'delete-btn':
        newList.deleteFromList(target);
        break;
      case 'add-btn':
        newList.createListItem(target);
        break;
      case 'acending':
        newList.organize(target);
        break;
      case 'decending':
        newList.organize(target);
        break;
    }
    newList.getTotal();
  });
})();
