var myLocation = {
  latitude: 21.296830,
  longitude: -157.856553
};

var products = getProducts(myLocation);

console.log(products);

/**
 * Returns the device's current location.
 * @return {object} The device's current location
 */
function requestProductsByCurrentPosition () {
  /* The `getCurrentPosition` takes a function as it's first argument.
   * This function is referred to as a "callback" function, because it is
   * called when the result (current location) is found.
   */
  navigator.geolocation.getCurrentPosition(/* your function name goes here */);
}

/**
 * Sends a request to the server to get Uber products based on passed in
 * latitude and longitude positions.
 * @param  {number} lat The location's latitude value
 * @param  {number} lng The location's longitude value
 * @return {[Products]]} The Uber products available at the queried location
 */
function getProductsByLocation (lat, lng) {
  var location = {
    /* location object */
  };
  var products = getProducts(location);
  return products;
}

/**
 * Gets the products from a certain location.
 * @param  {object} The location object to query
 * @return {[Product]]} An array of products
 */

// 1. return inner products array
// response.responseJSON.products[0].display_name

// function to return value array
function grabArray () {
  var productsArray = products.responseJSON.products;
  return productsArray;
  }

var grabArray = grabArray();
console.log(grabArray);

// create container element and give id
var container = document.createElement('div');
container.id = 'container';

// function to create product elements, give ids, give innerHTML value, append to container
// create element for each item in array
function createElements (displayId, nestedElementType, capacityId, descriptionId, priceId, imageId, priceElementType) {
  for (var i = 0; i < grabArray.length; i++) {
    // create element with id for display name
    var displayElement = document.createElement('h3');
    displayElement.id = displayId + i;

    // create element for unordered list for main info
    var mainList = document.createElement('ul');

    // give innerHTML for each display name
    var displayName = grabArray[i].display_name;
    displayElement.innerHTML = displayName;

    // create nested elements for each display name
    var capacityElement = document.createElement(nestedElementType);
    capacityElement.id = capacityId + i;

    var descriptionElement = document.createElement(nestedElementType);
    descriptionElement.id = descriptionId + i;

    var priceElement = document.createElement(nestedElementType);
    priceElement.id = priceId + i;

    var imageElement = document.createElement(nestedElementType);
    imageElement.id = imageId + i;

    // create elements to be nested in price element
    var baseFeeElement = document.createElement(priceElementType);
    var cancellationFee = document.createElement(priceElementType);
    var costPerDistance = document.createElement(priceElementType);
    var costPerMin = document.createElement(priceElementType);
    var currencyCode = document.createElement(priceElementType);
    var distanceUnit = document.createElement(priceElementType);
    var minCost = document.createElement(priceElementType);
    var serviceFees = document.createElement(priceElementType);

    // give elements innerHTML
    capacityElement.innerHTML = '<li>' + 'Capacity: ' + grabArray[i].capacity + '</li>';
    descriptionElement.innerHTML = '<li>' + 'Description: ' + grabArray[i].description + '</li>';
    priceElement.innerHTML = '<li>' + 'Price:' + '</li>';
    imageElement.innerHTML ='<li>' + '<img src="' + grabArray[i].image + '">' + '</li>';

    // create var to access price details values
    var priceDetailObj = grabArray[i].price_details;

    // give elements nested in price element innerHTML value
    if (priceDetailObj !== null) {

      // create price list if price not null
      var priceList = document.createElement('ul');

      // give price list innerHTML value if price not null
      baseFeeElement.innerHTML = priceDetailObj.base;
      cancellationFee.innerHTML = priceDetailObj.cancellation_fee;
      costPerDistance.innerHTML = priceDetailObj.cost_per_distance;
      costPerMin.innerHTML = priceDetailObj.cost_per_minute;
      currencyCode.innerHTML = priceDetailObj.currency_code;
      distanceUnit.innerHTML = priceDetailObj.distance_unit;
      minCost.innerHTML = priceDetailObj.minimum;
    }

    // append elements to price element
    priceList.appendChild(baseFeeElement);
    priceList.appendChild(cancellationFee);
    priceList.appendChild(costPerDistance);
    priceList.appendChild(costPerMin);
    priceList.appendChild(currencyCode);
    priceList.appendChild(distanceUnit);
    priceList.appendChild(minCost);
    priceList.appendChild(serviceFees);
    priceElement.appendChild(priceList);

    // append nested elements to display element
    displayElement.appendChild(capacityElement);
    displayElement.appendChild(descriptionElement);
    displayElement.appendChild(priceElement);
    displayElement.appendChild(imageElement);
    mainList.appendChild(displayElement);

    // append to container
    container.appendChild(mainList);
  }
}

createElements('display', 'p', 'capacity', 'description', 'price', 'image', 'li');

// append to body
document.body.appendChild(container);

function getProducts (locationObject) {
  var response = $.ajax({
    type: "GET",
    data: locationObject,
    url: '/products',
    async: false
  });

  return response; // return inner products array instead
}
