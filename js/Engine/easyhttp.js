"use strict";

/*EasyHttp Library
* Library for making HTTP requests
* Version 1.0
*
*
*/
// URL addresse to database
const baseURL = "https://health-tracker-841f9.firebaseio.com/0.json"
// const baseURL = "https://react-my-burger-2-6c057.firebaseio.com/ingredients.json"

//get information
async function getData() {
  // await response of the fetch call
  const response = await fetch(baseURL);

  // Only proceed once it's resolved
  const data = await response.json();
  // Only proceed once second promise is resolved
  return data;
}

getData().then(data => console.log(data));
