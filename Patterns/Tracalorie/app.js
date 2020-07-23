const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    items: [
      //   { id: 0, name: "Steak Dinner", calories: 1200 },
      //   { id: 1, name: "Cookie", calories: 400 },
      //   { id: 2, name: "Egg", calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let id;
      if (data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 0;
      }
      calories = parseInt(calories);
      const newItem = new Item(id, name, calories);
      data.items.push(newItem);
      return newItem;
    },
    logData: function () {
      return data;
    },
  };
})();

const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
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
    getSelectors: function () {
      return UISelectors;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: function (item) {
      document.querySelector(UISelectors.itemList).style.display = "block";
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em
          ><a href="#" class="secondary-content"
            ><i class="edit-item fa fa-pencil"></i
          ></a>
        `;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
  };
})();

const App = (function (ItemCtrl, UICtrl) {
  const loadEventListeners = function () {
    UISelectors = UICtrl.getSelectors();
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };
  const itemAddSubmit = function (e) {
    const input = UICtrl.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);
      UICtrl.clearInput();
    }
    e.preventDefault();
  };
  return {
    init: function () {
      const items = ItemCtrl.getItems();
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateList(items);
      }
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
