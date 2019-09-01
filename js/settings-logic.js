"use strict";
/*
 * We are using here the MVO: Model View Octopus or MVC, MVVM, MVP and so on.
 * Additionally: we build it using the JavaScript Pattern: Module Revealing Pattern!
 * Why? I think it is a great way to organize the code that brings a lot of benefits!
 */
// Basic sctructure: BLUE PRINT of Module Revealing Pattern!
// See, that these are immediately-invoked function expression or IIFE (pronounced iffy).
// The syntax might seem a bit odd, but all we're doing is wrapping a function in parentheses,
// then adding a pair of parentheses at the end of that to invoke it!
// The Revealing Module Pattern
// The underlying philosophy of the Revealing Module Pattern is that, while we still maintain encapsulation (as in the Module Pattern), we also reveal certain properties (and methods). The key ingredients to the Revealing Module Pattern are:
//
// 1) An IIFE (wrapper)
// 2) The module content (variables, methods, objects, etc.)
// 3) A returned object literal

// (function() {
//   // Declare private vars and functions
//
//   return {
//     // Declare public var and functions
//   }
//
// })();

function settings() {

  /*
   * MODEL DATA: StorageCtrl
   */
  const StorageCtrl = (function() {
    // Declare private vars and functions
    let links = {
      small: "./style/styleSmall.css",
      normal: "./style/style.css",
      big: "./style/styleBig.css"
    };

    return {
      // Declare public var and functions
      // return the links of styles
      getLinks: function() {
        return links;
      },
      // load the CSS Style stored in Local Storage
      loadData: function(link) {
        // Check local storage
        if (localStorage.getItem("link") === null) {
          // add to localStorage
          // localStorage.setItem("links", JSON.stringify(currentLink));
          localStorage.setItem("link", links.normal);
          return links.normal;
        } else {
          // get and return the saved information from localStorage
          // return  JSON.parse(localStorage.getItem("links"));
          return  localStorage.getItem("link");
        }
      },
      // Save the style in local storage
      saveData: function(link) {
        // localStorage.setItem("links", JSON.stringify(currentLink));
        localStorage.setItem("link", link);
      }
    }
  })();


  /*
 * VIEW MODEL: UICtrl
 */
  // UICtrl
  const UICtrl = (function() {
    // Declare private vars and functions
    const UISelectors = {
      bigView: "#bigView",
      normalView: "#normalView",
      smallView: "#smallView",
      actualView: "#actualView"
    }
    return {
      getSelectors: function() {
        return UISelectors;
      },
      updateView: function(link, actualView = "Normal View") {
        document.querySelector("#pagestyle").setAttribute("href", link);

        if(document.querySelector("#actualView") !== null) {
          // important to reload the page
          document.querySelector("#actualView").textContent = actualView;
        }

      }
    }
  })();

    /*
   * OCTOPUS MODEL: AppCrl
   */
  // Adding the event listeners for buttons
  const AppCtrl = (function(StorageCtrl, UICtrl) {

    // Variables
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    // Get the styles saved in StorageCtrl
    const links = StorageCtrl.getLinks();

    // load event listeners
    const loadEventListeners = function() {
    // Add EventListeners for buttons
    // small view button
    document.querySelector(UISelectors.smallView).addEventListener("click", smallView);
    // normal view button
    document.querySelector(UISelectors.normalView).addEventListener("click", normalView);
    // big view button
    document.querySelector(UISelectors.bigView).addEventListener("click", bigView);

    };
    // for small button
    const smallView = function () {
      // Update View
      UICtrl.updateView(links.small, "Small View");
      // Save Data
      StorageCtrl.saveData(links.small);
      // reload the page
      location.reload();
    };
    // for small button
    const normalView = function () {
      // Update View
      UICtrl.updateView(links.normal, "Normal View");
      // Save Data
      StorageCtrl.saveData(links.normal);
      // reload the page
      location.reload();
    };
    // for small button
    const bigView = function () {
      // Update View
      UICtrl.updateView(links.big, "Big View");
      // Save Data
      StorageCtrl.saveData(links.big);
      // reload the page
      location.reload();
    };

    const initialize = function() {
      const link = StorageCtrl.loadData();
      let view = "normal"
      switch (link) {
        case "./style/styleBig.css":
        view = "Big View";
        break;
        case "./style/style.css":
        view = "Normal View";
        break;
        case "./style/styleSmall.css":
        view = "Small View";
        break;
        default:
        view = "Normal View";
      }
      // Update View
      UICtrl.updateView(link, view);
    }

    return {
      // Initialize the UI
      init: function() {
        // get and load link
        initialize();
      },
      loadEventListeners: function() {
        // load Event Listeners
        loadEventListeners();
      }
    }

  })(StorageCtrl, UICtrl);


  AppCtrl.init();

  if( document.querySelector("#smallView") !== null) {
    AppCtrl.loadEventListeners();
  }

}

settings();
