'use strict';
/* global shoppingList, store, $, api, Item*/

$(document).ready(function() {
  shoppingList.bindEventListeners();
  shoppingList.render();
});

store.items.push(Item.create('apples'));

// create new item
api.createItem('pears', (newItem) => {
  // fetch all items and log them out
  api.getItems((items) => {
    console.log(items);
  });
});