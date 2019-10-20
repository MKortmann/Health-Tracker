"use strict"
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

// THIS IS THE MAIN MODULE: loadBodyWeight THAT WILL BE DINAMICALLY LOAD!
// We will have five mains object: the model object is represented by the StorageCtrl, the
// octopus divided into two: the ItemCtrl and the AppCtrl. The Item Ctrl is responsible
// to control each item, the AppCtrl controls the App (eventlisteners and so on) and
// the last is the view Model that will be diveded into:  UICtrl responsible to control the user interface and the UICanvas responsible to control the canvas!
// Anonymous "self-invoking" function


function loadSignUpLogic() {

  // document.querySelector(".signUp").addEventListener("click", (e) => {
  //   debugger
  //   e.preventDefault();
  //   alert("clicked!");
  // });
  const StorageServerCtrl = (function() {
    // Declare private vars and functions
    let currentItem = null;

    return {
      // Get Item ID from Firebase
      getIDFromServer: function() {

      },
    }
  })();

  /*
 * VIEW MODEL: UICtrl and UICanvas
 */
  // UICtrl
  const UICtrl = (function() {
    // Declare private vars and functions
    let currentItem = null;

    const UISelectors = {
      signUpBtn: ".signUpBtn"
    }

    return {
      // Declare public var and functions
// return the UI Selectors
      getSelectors: function() {
        return UISelectors;
      },
    }
  })();

  const AppCtrl = (function(StorageServerCtrl, UICtrl) {
    // Declare private vars and functions
    let currentItem = null;

    // Variables
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // load event listeners
    const loadEventListeners = function() {
    // Add EventListeners for buttons
    document.querySelector(UISelectors.signUpBtn).addEventListener("click", signUp);
    };

    const signUp = function(e) {
      e.preventDefault();
      alert("clicked here! Worked!");
    };

    return {
      // Get Item ID from Firebase
      init: () => {
        loadEventListeners();
      }
    }
  })(StorageServerCtrl, UICtrl);

  AppCtrl.init();

}
