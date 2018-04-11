'use strict';

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/cam';

  function getItems(callback) {
    callback('api module works');
  }

  // This method will POST request on /items, send JSON in the request body, and return the response callback
  function createItem(name, callback) {
    const newItem = JSON.stringify({
      name: name,
    });
  }

  return {
    getItems,
    createItem,
  };
}());