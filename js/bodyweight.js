"use strict"
// Basic sctructure: BLUE PRINT

// (function() {
//   // Declare private vars and functions
//
//   return {
//     // Declare public var and functions
//   }
//
// })();

// window.addEventListener("load", function() {
//   document.querySelector("#height").value = 10;
// });

// THIS IS THE MAIN MODULE: loadBodyWeight THAT WILL BE DINAMICALLY LOAD!
// We will have tree mains object: the model object called StorageCtrl, the
// octopus divided into two: the ItemCtrl and the AppCtrl. The Item Ctrl is responsible
// to control each item, the AppCtrl controls the App (eventlisteners and so on) and
// the last is the view Model that will be diveded into:  UICtrl responsible to control the user interface and the CanvasCtrl responsible to control the canvas!
function loadBodyWeight() {

/*
 * MODEL DATA: StorageCtrl
 */
  // StorageCtrl
  const StorageCtrl = (function() {
    // Declare private vars and functions

    return {
      // Declare public var and functions
    }

  })();

  /*
   * VIEW MODEL: UICtrl and CanvasCtrl
   */

   // ItemCtrl
   const UICtrl = (function() {
     // Declare private vars and functions
     const UISelectors = {
       height: "#height",
       startWeight: "#startWeight",
       actualWeight: "#actualWeight",
       diffWeight: "#diffWeight",
       actualBMI: "#actualBMI"
     }

     return {
       // Declare public var and functions
       // return the UI Selectors
       getSelectors: function() {
         return UISelectors;
       },
       // populate the inputs: diffWeight and BMI
       populateInputs: function() {
        // diffW = startWeight - actualWeight
        const diffW = document.querySelector(UISelectors.startWeight).value -
                      document.querySelector(UISelectors.actualWeight).value;
        document.querySelector(UISelectors.diffWeight).value = diffW;
        // if diffW > 0 green color if diffW < 0 red!
        if(diffW > 0) {
          document.querySelector(UISelectors.diffWeight).classList.add("text-info");
          document.querySelector(UISelectors.diffWeight).classList.remove("text-danger");
        } else {
          document.querySelector(UISelectors.diffWeight).classList.add("text-danger");
          document.querySelector(UISelectors.diffWeight).classList.remove("text-info");
        }
        // bmi = ( bodyweightIn: (Kg) ) / (height (m))^2
        const heightInMeter = (document.querySelector(UISelectors.height).value)/100;
        const bmi = document.querySelector(UISelectors.actualWeight).value /
                    Math.pow(heightInMeter,2);
        document.querySelector(UISelectors.actualBMI).value = bmi.toFixed(2);
       }
     }

   })();

  /*
   * OCTOPUS MODEL: ItemCtrl And AppCtrl
   */

   // ItemCtrl
   const ItemCtrl = (function() {
     // Declare private vars and functions

     return {
       // Declare public var and functions
     }

   })();

   // AppCtrl
   const AppCtrl = (function() {
     // Declare private vars and functions

     // Load event listeners
     const loadEventListeners = function() {

       // Get UI Selectors
       const UISelectors = UICtrl.getSelectors();

      // Add Event Listener to the inputs in case of the value change
      // height:
      document.querySelector(UISelectors.height).addEventListener("change", UICtrl.populateInputs);
      // Start Weight:
      document.querySelector(UISelectors.startWeight).addEventListener("change", UICtrl.populateInputs);
      // Actual Weight:
      document.querySelector(UISelectors.actualWeight).addEventListener("change", UICtrl.populateInputs);
     }

     // Start UI: we populate UI with the necessary information
     const populateUI = function() {
       // Populate the inputs
       UICtrl.populateInputs();
     }

     return {
       // Declare public var and functions
       init: function() {
         loadEventListeners();
         populateUI();
       }
     }

   })();


// Initialize App
AppCtrl.init();

}
