'use strict';
/* global shoppingList, store, $, api, Item*/

$(document).ready(function() {
  shoppingList.bindEventListeners();
  // When the DOM is ready, we fetch all the items
  api.getItems((items) => {
    // Iterate over EACH of items in the response
    // and re-render
    items.forEach((item) => {
      store.addItem(item);
      shoppingList.render();
    });
  });
});

// Remove code that creates test data in the store.
// store.items.push(Item.create('apples'));

/*
// API MODULE TEST
api.getItems(data => {
  console.log(data);
})

console.log(api.BASE_URL);
*/

/*
// 3. createItem TEST
// create new item
api.createItem('pears', (newItem) => {
  // console.log(newItem);
  // fetch all items and log them out
  api.getItems((items) => {
    console.log(items);
  });
});
*/

// api.getItems((items) => {
//   const item = items[0];

//   api.updateItem(item.id, {name: 'foobar'}, () => {
//     console.log('Updated!');
//   });
// });

/*
// TEST adding an item to the front of the list in the dom
api.getItems((items) => {
  const item = items[0];

  api.updateItem(item.id, {name: 'foobar'}, () => {
    console.log('Updated!');
  });
});
*/