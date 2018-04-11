'use strict';
/*global $*/

const api = (function() {
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
      url: BASE_URL, // + '/items', // BASE_URL variable on line 5
      method: 'POST', // POST http method
      contentType: 'application/json', // JSON format
      data: newItem, // JSON.stringified variable on line 13
      success: callback, // callback function parameter on success
    });
  }

  return {
    getItems,
    createItem,
  };
}());