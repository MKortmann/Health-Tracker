"use strict";

/*EasyHttp Library
* Library for making HTTP requests
* Version 1.0
*
*
*/

// URL addresse to database
const baseURL = "https://health-tracker-841f9.firebaseio.com/"

class EasyHTTP {
  // Make AN HTTP REQUEST!!!: getting data from a server
  //get information
  async getWithCallback(url, callback) {
    // await response of the fetch call
    const response = await fetch(url);
    // Only proceed once it's resolved
    const resData = await response.json();
    // Only proceed once second promise is resolved
    callback(resData);
  }

  //get information
  async get(url) {
    // await response of the fetch call
    const response = await fetch(url);
    // Only proceed once it's resolved
    const resData = await response.json();
    // Only proceed once second promise is resolved
    return resData;
  }

  //MAKE AN HTTP POST: send data to a server
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    // Only proceed once it's resolved
    const resData = await response.json();
    // Only proceed once second promise is resolved
    return resData;
  }

  // MAKE AN HTTP PUT REQUEST: send data to server to create or update resource
  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    // Only proceed once it's resolved
    const resData = await response.json();
    // Only proceed once second promise is resolved
    return resData;
  }

  // MAKE AN HTTP DELETE REQUEST: removing data
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    });
    // Only proceed once it's resolved
    const resData = await "Resource Deleted";
    // Only proceed once second promise is resolved
    return resData;
  }

}
// const data
// const dataToSubmit = {
//   BMI: "50.25",
//   ID: 10,
//   date: "2019-08-20",
//   dateEdit: "",
//   height: "178",
//   heightEdit: "178",
//   time: "11:36",
//   timeEdit: "",
//   weight: "80",
//   weightEdit: "80"
// };

//Example of how to call it in your program!
// const http = new EasyHTTP();
// getting the data
// http.get(baseURL + ".json")
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// posting data
// http.post(baseURL + ".json", dataToSubmit)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));


// posting data
// http.put(baseURL, dataToSubmit)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// deleting data
// http.delete("https://health-tracker-841f9.firebaseio.com/0.json")
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
