'use strict';
/* global store, $, api */

// eslint-disable-next-line no-unused-vars
const shoppingList = (function(){

  function generateItemElement(item) {
    let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
    if (!item.checked) {
      itemTitle = `
        <form id="js-edit-item">
          <input class="shopping-item type="text" value="${item.name}" />
        </form>
      `;
    }
  
    return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  }
  
  
  function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  
  function render() {
    // Filter item list if store prop is true by item.checked === false
    let items = store.items;
    if (store.hideCheckedItems) {
      items = store.items.filter(item => !item.checked);
    }
  
    // Filter item list if store prop `searchTerm` is not empty
    if (store.searchTerm) {
      items = store.items.filter(item => item.name.includes(store.searchTerm));
    }
  
    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateShoppingItemsString(items);
  
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  }
  
  
  function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      // Call to the api object, add item to store object, and rerender the dom to show it in the list
      api.createItem(newItemName, (newItem) => {
        console.log('New Item being added to store and DOM: ' + newItemName);
        store.addItem(newItem);
        render();
      });
      $('.js-shopping-list-entry').val('');
      // store.addItem(newItemName);
      // render();
    });
  }
  
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  
  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      // update the store object checked prop
      store.findAndToggleChecked(id);
      const updatedObject = store.findById(id);
      // call the api.updateItem, pass Id, patch new versions of the name and checked properties of the item in the store object, then render
      api.updateItem(id, {name: updatedObject.name, checked: updatedObject.checked}, () => {
        render();
      });
    });
  }
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);

      api.deleteItem(id, () => {
        api.getItems(() => {
          store.findAndDelete(id);
          render();
          console.log(store.items);
        });
      });
    });
  }
  
  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '#js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget).find('.shopping-item').val();
      // Use the api to update the state of the store object and re-render
      api.updateItem(id, (itemName) => {
        store.findAndUpdateName(id, itemName);
        render();
      });
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }
  
  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.setSearchTerm(val);
      render();
    });
  }
  
  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
    handleShoppingListSearch();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
