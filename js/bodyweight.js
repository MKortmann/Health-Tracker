"use strict"
/*
 * We are using here the MVO: Model View Octopus or MVC, MVVM, MVP and so on.
 * Additionally: we build it using the JavaScript Pattern: Module Revealing Pattern!
 * Why? I think it is a great way to organize the code that brings a lot of benefits!
 */
// Basic sctructure: BLUE PRINT of Module Revealing Pattern!

// (function() {
//   // Declare private vars and functions
//
//   return {
//     // Declare public var and functions
//   }
//
// })();

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
      saveData: function(item) {
        let items;
        // Check local storage
        if(localStorage.getItem("items") === null) {
          items = [];
          // add the new item
          items.push(item);
          // add to localStorage
          localStorage.setItem("items", JSON.stringify(items));
        } else {
          // get the saved information from localStorage
          items = JSON.parse(localStorage.getItem("items"));
          // add the new item
          items.push(item);
          // add to localStorage
          localStorage.setItem("items", JSON.stringify(items));
        }
      },
      getLSData: function() {
        return JSON.parse(localStorage.getItem("items"));
      },
      // It returns the start value of the id!
      getNextID: function() {
        if(localStorage.getItem("items") === null) {
          return 0;
        } else {
          const items = JSON.parse(localStorage.getItem("items"));
          return items.length;
        }
      },
      getLastWeight: function() {
        if(localStorage.getItem("items") !== null) {
          const items = JSON.parse(localStorage.getItem("items"));
          const weight = items[items.length-1].weight;
          return weight;
        } else {
          return 0;
        }
      }
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
       actualBMI: "#actualBMI",
       btnSubmit: "#submit",
       weight: "#weight",
       date: "#date",
       tableBody: "tbody",
       editBtn: "#editBtn",
       backBtn: "#backBtn"
     }

     return {
       // Declare public var and functions
       // return the UI Selectors
       getSelectors: function() {
         return UISelectors;
       },
       // return the weight and date from the inputs
       getWeightDateHeight: function() {
        // return an object with the weight and date
        return {
          weight: document.querySelector(UISelectors.weight).value,
          date:   document.querySelector(UISelectors.date).value,
          height: document.querySelector(UISelectors.height).value
        }
       },
       // populate the inputs: diffWeight and BMI
       populateInputs: function() {
        // Update actual weight
        document.querySelector(UISelectors.actualWeight).value = StorageCtrl.getLastWeight();
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
        const bmi = ItemCtrl.getBMI(document.querySelector(UISelectors.actualWeight).value, document.querySelector(UISelectors.height).value);
        document.querySelector(UISelectors.actualBMI).value = bmi;

        // Let's populate the date input with the actual date
        document.querySelector(UISelectors.date).value = ItemCtrl.getActualDate();
      },
        // We will fill the complete table from the data of LocalStorage
        populateTable: function(items) {
          items.forEach(function(item, index) {
            UICtrl.updateTable(item);
          });

        },
        updateTable: function(item) {

          const table = document.querySelector(UISelectors.tableBody);
          const row = document.createElement("tr");

            row.innerHTML = `
            <tr>
              <td scope="row" class="align-middle">${item.ID}</td>
              <td class="align-middle">${item.date}</td>
              <td class="align-middle">${item.weight} kg</td>
              <td class="align-middle">${item.BMI} kg/m&sup2;</td>
              <a href="#" id="${item.ID}">
              <img src="../icons/edit.svg" class="float-right mt-2 edit"></img>
              </a>
            </tr>
            `;
          table.appendChild(row);
        },
        hideButtons: function() {
          // We will hide these buttons
          document.querySelector(UISelectors.editBtn).style.display = "none";
          document.querySelector(UISelectors.backBtn).style.display = "none";
        },
        reloadItem: function(item) {
          // Reload the Date and Weight Input
          document.querySelector(UISelectors.weight).value = item.weight;
          document.querySelector(UISelectors.date).value = item.date;
          // hide the submit button
          document.querySelector(UISelectors.btnSubmit).style.display = "none";
          // Show the edit and back buttons
          document.querySelector(UISelectors.editBtn).removeAttribute("style");
          document.querySelector(UISelectors.backBtn).removeAttribute("style");
          // Update the pointer for the edit and back buttons
          document.querySelector("#editBtn").style.cursor = "pointer";
          document.querySelector("#backBtn").style.cursor = "pointer";
        }

     }

   })();

  /*
   * OCTOPUS MODEL: ItemCtrl: Control the items AND AppCtrl: control the general behaviour
   */

   // ItemCtrl
   const ItemCtrl = (function() {
     // Declare private vars and functions

     return {
       // Declare public var and functions
       getBMI: function(weight, height) {
         // bmi = ( bodyweightIn: (Kg) ) / (height (m))^2
         const heightInMeter = height/100;
         const bmi = weight / (Math.pow(heightInMeter,2));
         return bmi.toFixed(2);
       },
       // Generator function to generate IDs
       genIDs: function* () {
         let index = parseInt(StorageCtrl.getNextID());
         while(true) {
           yield ++index;
         }
       },
       getActualDate: function() {
         //easiest way to get the date
         const today = new Date();
         let month = today.getMonth();
         let day = today.getDate();
         // we have to add one to the month because zero is january!
         month++;
         month = (month < 10) ? `0${month}` : month;
         day = (day < 10) ? `0${day}` : day;
         return `${today.getFullYear()}-${month}-${day}`;
       },
       getItemById: function(id) {
         const data = StorageCtrl.getLSData();
         let found = null;

         if(data[id-1]) {
           return (data[id-1]);
         } else {
           return found;
         }
       }
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
      // For the tbody
      document.querySelector(UISelectors.tableBody).addEventListener("click", itemToEdit);
      // For the edit button
      document.querySelector(UISelectors.editBtn).addEventListener("click", itemToEditStep2);

      // Submit button
      document.querySelector(UISelectors.btnSubmit).addEventListener("click", itemToSubmit);

     }

     // Start UI: we populate UI with the necessary information
     const loadDataAndPopulateUI = function() {
       // Hide the Edit and back buttons
       UICtrl.hideButtons();
       // Populate the inputs
       UICtrl.populateInputs();
       // Get the data from LocalStorage
       const items = StorageCtrl.getLSData();
       // Populate the table
       UICtrl.populateTable(items);

     }

     // Data submit
     const itemToSubmit = function() {
       //START: GET AND PREPARE THE DATA
       // Get the data from UI
       const dataToSubmit = UICtrl.getWeightDateHeight();
       // Generate IDs
       const ID = ItemCtrl.genIDs().next().value;
       // Add ID to the data
       dataToSubmit.ID = ID;
       // Calculate BMI
       const bmi = ItemCtrl.getBMI(dataToSubmit.weight, dataToSubmit.height);
       // Add BMI to the data
       dataToSubmit.BMI = bmi;
       // FINISHED: THE DATA IS FORMATED AND PREPARED TO BE SAVED!
       // Save data to local Storage
       StorageCtrl.saveData(dataToSubmit);
       // START: UPDATE UI
       // UpdateUI
       UICtrl.updateTable(dataToSubmit);
       // Update input: actual weight
       UICtrl.populateInputs();
       // FINESHED: UI is updated!
     }

     // Edit the actual item
     const itemToEdit = function(e) {
      // check if he has click at the icon
      if(e.target.classList.contains("edit")) {
        // Get the id of the item
        const listID = parseInt(e.target.parentNode.id);
        // Get the element to be edited
        const item = ItemCtrl.getItemById(listID);
        // Reload the UI with the values of the item to be edited
        UICtrl.reloadItem(item);
      }
     }

     const itemToEditStep2 = function() {
       console.log(	"edit clicked");
     }

     return {
       // Declare public var and functions
       init: function() {
         // Load all the event listeners in the page
         loadEventListeners();
         // Load the actual data to fill the UI
         loadDataAndPopulateUI();
       }
     }

   })();


// Initialize App
AppCtrl.init();

}
