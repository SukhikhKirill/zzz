const getData = (str) => {
    return fetch(`https://test-b63a4-default-rtdb.firebaseio.com/goods.json?${str ? `search=${str}` : ''}`)
  .then(response => {
      return response.json();
  });
};

export default getData;