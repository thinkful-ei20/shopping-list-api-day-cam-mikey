'use strict';
/*global $*/

const api = (function() {
  // Need /items on the BASE_URL to make the ajax calls work below
  // template string didn't work for /item but worked for /${id}
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/cam/items';

  function getItems(callback) {
    // 2. GET request on /items and return callback on success
    $.getJSON(BASE_URL, callback);
  }

  // This method will POST request on /items, send JSON in the request body, and return the response callback
  function createItem(name, callback) {
    const newItem = JSON.stringify({
      name: name,
    });

    $.ajax({
      url: BASE_URL, // BASE_URL variable on line 5
      method: 'POST', // POST http method
      contentType: 'application/json', // JSON format
      data: newItem, // JSON.stringified variable on line 13
      success: callback, // callback function parameter on success
    });
  }

  // Update an item
  function updateItem(id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`, // Template string to extend the endpoint
      method: 'PATCH', // PATCH method for updating a pre-existing piece of an object
      contentType: 'application/json', // JSON format
      data: JSON.stringify(updateData), // stringify the new data into JSON
      success: callback, /// callback is used on successful request
    });
  }

  function deleteItem(id, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
    });
  }

  return {
    getItems,
    createItem,
    updateItem,
    deleteItem,
  };
}());