const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    items: [
      { id: 0, name: "Steak Dinner", calories: 1200 },
      { id: 1, name: "Cookie", calories: 400 },
      { id: 2, name: "Egg", calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    getItems: function () {
      return data.items;
    },
    logData: function () {
      return data;
    },
  };
})();

const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
  };

  return {
    populateList: function (items) {
      let html = "";
      items.forEach((item) => {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}:</strong> <em>${item.calories} Calories</em
          ><a href="#" class="secondary-content"
            ><i class="edit-item fa fa-pencil"></i
          ></a>
        </li>
        `;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
  };
})();

const App = (function (ItemCtrl, UICtrl) {
  return {
    init: function () {
      const items = ItemCtrl.getItems();
      UICtrl.populateList(items);
    },
  };
})(ItemCtrl, UICtrl);

App.init();
