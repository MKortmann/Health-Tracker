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


function loadBodyWeight() {
  // trying to fix jquery problems
  (function() {
      let startingTime = new Date().getTime();
      // Load the script
      let script = document.createElement("SCRIPT");
      let script2 = document.createElement("SCRIPT");
      script.src = "./lib/jquery/jquery-3.3.1.js";
      script2.src = "./lib/bootstrap/bootstrap.js";
      // script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
      // script2.src = '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>';
      script.onload = function() {
      	let $ = window.jQuery;
        $(function() {
              let endingTime = new Date().getTime();
              let tookTime = endingTime - startingTime;
              console.log("jQuery & Bootstrap is loaded dinamically, after " + tookTime + " milliseconds!" + "Test function only to try to solve github load problem.");
          });
      };
      document.getElementsByTagName("head")[0].appendChild(script2);
      document.getElementsByTagName("head")[0].appendChild(script);

  })();

  /*
   * MODEL DATA: StorageCtrl
   */
  const StorageCtrl = (function() {
    // Declare private vars and functions
    let currentItem = null;
    // Start as a standard value
    let data = [];

    return {
      // Declare public var and functions

      saveData: function(item) {
        let items;
        // Check local storage
        if (localStorage.getItem("items") === null) {
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
        // update LocalData
        StorageCtrl.data = items;
      },
      // It returns the start value of the id!
      getNextID: function() {
        if (localStorage.getItem("items") === null) {
          return 0;
        } else {
          const items = JSON.parse(localStorage.getItem("items"));
          return items.length;
        }
      },
      getLastWeight: function() {
        if (localStorage.getItem("items") !== null) {
          const items = JSON.parse(localStorage.getItem("items"));
          const weight = items[items.length - 1].weight;
          return weight;
        } else {
          return 0;
        }
      },
      getLSData: function() {
        StorageCtrl.data = JSON.parse(localStorage.getItem("items"))
        return StorageCtrl.data;
      },
      uploadDataToLS: function() {
        // add to localStorage
        localStorage.setItem("items", JSON.stringify(StorageCtrl.data));
      },
      getLocalData: function() {
        return StorageCtrl.data;
      },
      clearAllItems: function() {
        data = [];
      },
      clearItemsFromStorage: function() {
        localStorage.removeItem("items");
      },
      downloadVideosToJSON: function() {
        // Save as JSON file
        const weightData = StorageCtrl.getLSData();
        const fileJSON = JSON.stringify(weightData);

        // let dataUri = 'data:./storage/json;charset=utf-8,'+ encodeURIComponent(fileJSON);
        let dataUri = 'data:storage/json;charset=utf-8,' + encodeURIComponent(fileJSON);

        let exportFileDefaultName = 'table.json';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        linkElement.remove();
      },
      // The method XMLhttpRequest works only if you have a server installed.
      // easier way: go to your project file throught prompt command and type:
      // npm install -g live-server
      // run it typing: live-server
      loadJSONFile: function() {
        var xhttp = new XMLHttpRequest();
        // we will use now onload instead of onreadystatechange. So we do not need
        // to check for this.readyState
        xhttp.onload = function() {
          // xhttp.onreadystatechange = function() {
          // readyState 4: the response has been capture and can be used
          // status: http status of 200 means that everything is ok
          var itemList = "";
          // if (this.readyState == 4 && this.status == 200) {
          if (this.status == 200) {
            // Convert the json to and object
            let items = JSON.parse(xhttp.responseText);

            // Storing the table in the Local Storage
            localStorage.setItem("items", JSON.stringify(items));
          }
        };
        xhttp.open("GET", "./storage/table.json", true);
        xhttp.onerror = function() {
          console.log("Request error in XMLHttpRequest...");
          return false;
        }
        xhttp.send();
        // if works, returns true. The true flag, tells that we are reloading
        // data, and the table should be cleared!
        return true;
      }
    }
  })();

  /*
   * VIEW MODEL: UICtrl and UICanvas
   */
  // UICtrl
  const UICtrl = (function() {
    // Declare private vars and functions
    const UISelectors = {
      height: "#height",
      startWeight: "#startWeight",
      actualWeight: "#actualWeight",
      diffWeight: "#diffWeight",
      actualBMI: "#actualBMI",
      submitBtn: "#submit",
      weight: "#weight",
      date: "#date",
      tableBody: "tbody",
      editBtn: "#editBtn",
      backBtn: "#backBtn",
      deleteBtn: "#deleteBtn",
      deleteAllBtn: "#deleteAllBtn",
      deleteAllAskBtn: "#deleteAllAskBtn",
      saveBtn: "#saveBtn",
      loadJSONBtn: "#loadJSONBtn"
    }

    return {
      // Declare public var and functions
      showAlert: function(message, className) {
        //create div
        const div = document.createElement("div");
        //add classes: the class alert is used to be able to remove it afterwards!
        div.className = `alert ${className} text-center  p-0 m-0`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get the element to be insert it
        const container = document.querySelector("#formInputs1");
        // get the element in which the div will be insert before it
        const form = document.querySelector("#formInputs2");
        // insert alert
        container.appendChild(div, form);

        //the message should disappear after 3 seconds
        setTimeout(function() {
          document.querySelector(".alert").remove();
        }, 3000);
      },
      // return the UI Selectors
      getSelectors: function() {
        return UISelectors;
      },
      // return the weight and date from the inputs
      getWeightDateHeight: function() {
        // return an object with the weight and date
        return {
          weight: document.querySelector(UISelectors.weight).value,
          date: document.querySelector(UISelectors.date).value,
          height: document.querySelector(UISelectors.height).value
        }
      },
      // populate the inputs: diffWeight and BMI
      populateInputs: function() {
        // Update actual weight
        // In case that we do not have any data!
        if (StorageCtrl.data === null) {
          document.querySelector(UISelectors.actualWeight).value = 80;
        } else {
          document.querySelector(UISelectors.actualWeight).value = ItemCtrl.getWeight(StorageCtrl.data.length - 1);
        }
        // Get the first start weight getFirstWeight
        document.querySelector(UISelectors.startWeight).value = ItemCtrl.getWeight(0);
        // diffW = startWeight - actualWeight
        const diffW = document.querySelector(UISelectors.startWeight).value -
          document.querySelector(UISelectors.actualWeight).value;
        document.querySelector(UISelectors.diffWeight).value = diffW;
        // if diffW > 0 green color if diffW < 0 red!
        if (diffW > 0) {
          document.querySelector(UISelectors.diffWeight).classList.add("text-info");
          document.querySelector(UISelectors.diffWeight).classList.remove("text-danger");
        } else {
          document.querySelector(UISelectors.diffWeight).classList.add("text-danger");
          document.querySelector(UISelectors.diffWeight).classList.remove("text-info");
        }
        // bmi = ( bodyweightIn: (Kg) ) / (height (m))^2
        const bmi = ItemCtrl.getBMI(document.querySelector(UISelectors.actualWeight).value, document.querySelector(UISelectors.height).value);
        document.querySelector(UISelectors.actualBMI).value = bmi;

        // Let's populate the weight input with the last weight value
        document.querySelector(UISelectors.date).value = ItemCtrl.getActualDate();
        // Let's populate the date input with the actual date
        if (StorageCtrl.data !== null) {
          document.querySelector(UISelectors.weight).value = ItemCtrl.getWeight(StorageCtrl.data.length - 1);
        }
      },
      // We will fill the complete table from the data of LocalStorage
      populateTable: function(items) {
        // The first item in the table should the the last added
        // let itemsReverse = items.reverse();
        items.forEach(function(item, index) {
          UICtrl.updateTable(item);
        });

      },
      updateTable: function(item, updateOnlyOneLine = false) {
        // if updateOnlyOneLine of table is false it means that we will call it
        // many times populating the table!
        const link = ItemCtrl.BMIResultLink(item.BMI);

        if (!updateOnlyOneLine) {
          const table = document.querySelector(UISelectors.tableBody);
          const row = document.createElement("tr");

          row.innerHTML = `
              <tr>
                <td scope="row" class="align-middle">${item.ID}</td>
                <td class="align-middle d-none d-sm-table-cell">${item.date}</td>
                <td class="align-middle">${item.weight}  kg</td>
                <td class="align-middle">${item.BMI} <span class="d-none d-md-inline-block"> kg/m&sup2;</span></td>
                <a href="#" id="${item.ID}">
                <img src=${link} class="float-left img-fluid mt-2 edit d-none d-md-block align-middle"></img>
                <img src="./icons/edit.svg" class="float-right img-fluid mt-2 edit"></img>
                </a>
              </tr>
              `;
          table.insertBefore(row, document.querySelector("tbody").firstElementChild);
          // table.appendChild(row);
        } else {
          // Here means that you want to update only one line of the table!
          const rowToBeReplaced = document.getElementById(item.ID).parentNode;
          rowToBeReplaced.innerHTML = `
              <tr>
                <td scope="row" class="align-middle">${item.ID}</td>
                <td class="align-middle d-none d-sm-table-cell">${item.date}</td>
                <td class="align-middle">${item.weight}  kg</td>
                <td class="align-middle">${item.BMI} <span class="d-none d-md-inline-block"> kg/m&sup2;</span></td>
                <a href="#" id="${item.ID}">
                <img src=${link} class="float-left img-fluid mt-2 edit d-none d-md-block align-middle"></img>
                <img src="./icons/edit.svg" class="float-right img-fluid mt-2 edit"></img>
                </a>
              </tr>
              `;
        }
      },
      deleteTable: function(id) {
        document.querySelector("tbody").innerHTML = "";
      },
      hideButtons: function() {
        // We will hide these buttons
        document.querySelector(UISelectors.editBtn).style.display = "none";
        document.querySelector(UISelectors.backBtn).style.display = "none";
        document.querySelector(UISelectors.deleteBtn).style.display = "none";
        // And unhide the submit button
        if (document.querySelector(UISelectors.submitBtn).hasAttribute("style")) {
          document.querySelector(UISelectors.submitBtn).removeAttribute("style");
        }
        if (document.querySelector(UISelectors.deleteAllBtn).hasAttribute("style")) {
          document.querySelector(UISelectors.deleteAllBtn).removeAttribute("style");
        }
        if (document.querySelector(UISelectors.deleteAllAskBtn).hasAttribute("style")) {
          document.querySelector(UISelectors.deleteAllAskBtn).removeAttribute("style");
        }

      },
      reloadItem: function(item) {
        // Reload the Date and Weight Input
        document.querySelector(UISelectors.weight).value = item.weight;
        document.querySelector(UISelectors.date).value = item.date;
        // hide the submit button
        document.querySelector(UISelectors.submitBtn).style.display = "none";
        document.querySelector(UISelectors.deleteAllBtn).style.display = "none";
        document.querySelector(UISelectors.deleteAllAskBtn).style.display = "none";
        // Show the edit and back buttons
        document.querySelector(UISelectors.editBtn).removeAttribute("style");
        document.querySelector(UISelectors.backBtn).removeAttribute("style");
        document.querySelector(UISelectors.deleteBtn).removeAttribute("style");
        // Update the pointer for the edit and back buttons
        // document.querySelector("#editBtn").style.cursor = "pointer";
        // document.querySelector("#backBtn").style.cursor = "pointer";
        // document.querySelector("#deleteBtn").style.cursor = "pointer";
        // document.querySelector("#deleteAllBtn").style.cursor = "pointer";
      }

    }

  })();
  // UICanvas TO BE DONE
  const UICanvas = (function() {
    // Declare private vars and functions
    const UICanvasSelectors = {
      oneWeekBtn: "#oneWeekBtn",
      twoWeeksBtn: "#twoWeeksBtn",
      oneMonthBtn: "#oneMonthBtn",
      twoMonthsBtn: "#twoMonthsBtn",
      threeMonthsBtn: "#threeMonthsBtn",
      sixMonthsBtn: "#sixMonthsBtn",
      oneYearBtn: "#oneYearBtn",
      AllMeasureBtn: "AllMeasureBtn"
    }
    // Initialize Canvas
    let canvas = document.getElementById("canvasWeight");
    // /*We need to specific write the kind of environment we are
    // working: is it 2D or 3D!*/
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    let canvasWidth = 900;
    let invertYAxis = 220;
    let invertYAxisText = 210;
    let deltaX = 20;
    let displayAmountOfMeasurements = 45;
    let StartYlines = [
      [0, 190],
      [0, 150],
      [0, 110],
      [0, 70],
      [0, 40]
    ];
    let EndYlines = [
      [canvasWidth, 190],
      [canvasWidth, 150],
      [canvasWidth, 110],
      [canvasWidth, 70],
      [canvasWidth, 40]
    ];
    let colorLines = ["gray"]
    // Canvas Y: start from 0 (top) and goes to 150 (bottom)
    // Canvas X: start from 0 (left) and goes to 300 (right)
    // So we will plot y between (5 and 145);
    // And we will plot x between (5 and 295);

    return {
      // Declare public var and functions
      // return the UI Selectors
      getSelectors: function() {
        return UICanvasSelectors;
      },
      plotXLines: function() {
        let startPos, endPos;
        for (let i = 0; i < StartYlines.length; i++) {
          startPos = StartYlines[i];
          endPos = EndYlines[i];
          UICanvas.drawStraightLine(startPos, endPos, colorLines);
          UICanvas.drawText(startPos[1], startPos, "gray", invertYAxisText + 8);
        }
      },
      plotYDate: function(data, deltaX) {
        let posX = 15;
        let measurements = data.length - 1;
        let middlePos = 0;
        if (measurements % 2 === 0) {
          middlePos = measurements / 2;
        } else {
          middlePos = (measurements - 1) / 2;
        }
        // Pretty challenge! We want to show only 3 x-measurements in accord with
        // the x-values positions respective to the y-measurements (weight)
        for (let i = 0; i < data.length; i++) {
          // get the start and middle position: necessary to ajust the text on canvsa
          if ((posX === 15) || (posX === 15 + deltaX * middlePos)) {
            // if(posX === 15 || mesurements === 195|| posX === 395 ||
            //    posX === 595|| posX === 795 ) {
            UICanvas.drawText(data[i].date, [posX - 10, 12], "gray", invertYAxisText);
          } else if ((posX === 15 + deltaX * measurements)) {
            // get the end position: necessary to ajust the text on canvas
            // the last data to plot we remove the year!
            let newData = data[i].date;
            newData = newData.split("-");
            newData = newData[1] + "-" + newData[2];
            if (measurements <= 30) {
              UICanvas.drawText(newData, [posX - 10, 12], "gray", invertYAxisText);
            } else {
              UICanvas.drawText(newData, [posX - 35, 12], "gray", invertYAxisText);
            }
          }
          posX = posX + deltaX;
        }
      },
      plotGraph: function(data) {
        UICanvas.eraseCanvas();
        UICanvas.plotXLines();
        let xPos = 15;
        let startPos, endPos, weightArray = [];
        // extract from data an weight array with only weight data
        data.forEach(function(item, index) {
          weightArray.push(parseInt(item.weight));
        });

        // if there a lot of data, we will hide the text!
        let hideText = false;
        if (data.length > 60) {
          hideText = true;
        }

        deltaX = UICanvas.returnStepXDelta(weightArray);
        UICanvas.plotYDate(data, deltaX);

        weightArray.forEach(function(item, index) {
          startPos = [xPos, weightArray[index]];
          if ((index + 1) !== weightArray.length) {
            endPos = [xPos + deltaX, weightArray[index + 1]];
            UICanvas.drawStraightLine(startPos, endPos, "black");
            UICanvas.drawCircle(startPos);
            if (!hideText) {
              UICanvas.drawText(startPos[1], startPos, "blue", invertYAxisText);
            }
            // we plot here the last point!
            if ((index + 2) === weightArray.length) {
              UICanvas.drawCircle(endPos);
              if (!hideText) {
                UICanvas.drawText(endPos[1], endPos, "blue", invertYAxisText);
              }
            }
            // deltaX
            xPos = xPos + deltaX;
          }
        })
      },
      drawStraightLine: function(startPos, endPos, color) {
        // we need to invert the y-axis
        ctx.beginPath(); // Start a new path
        ctx.moveTo(startPos[0], invertYAxis - startPos[1]); // Move the pen to (30, 50)
        ctx.strokeStyle = color;
        ctx.imageSmoothingEnabled = false;
        ctx.lineTo(endPos[0], invertYAxis - endPos[1]); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
      },
      drawCircle: function(startPos) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.imageSmoothingEnabled = false;
        ctx.arc(startPos[0], invertYAxis - startPos[1], 3, Math.PI * 2, false);
        ctx.stroke();
      },
      // drawText inputs: data = data, startPos = the x,y position
      drawText: function(data, startPos, color, invertYAxisText) {
        // ctx.font = "64px serif";
        ctx.imageSmoothingEnabled = false;
        ctx.font = "14px serif";
        ctx.fillStyle = color;
        ctx.fillText(data, startPos[0], invertYAxisText - startPos[1]);
      },
      eraseCanvas: function() {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 900, 200);
      },
      returnStepXDelta: function(data) {
        switch (data.length) {
          case 7:
            return Math.floor(canvasWidth / 7);
            break;
          case 14:
            return Math.floor(canvasWidth / 14);
            break;
          case 30:
            return Math.floor(canvasWidth / 30);
            break;
          case 60:
            return Math.floor(canvasWidth / 60);
            break;
          case 90:
            return Math.floor(canvasWidth / 90);
            break;
          case 180:
            return Math.floor(canvasWidth / 180);
            break;
          case 360:
            return Math.floor(canvasWidth / 180);
            break;
          default:
            return Math.floor(canvasWidth / data.length);
        }
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
        const heightInMeter = height / 100;
        const bmi = weight / (Math.pow(heightInMeter, 2));
        return bmi.toFixed(2);
      },
      // return the link of the
      BMIResultLink: function(bmi) {
        let bmiInt = parseInt(bmi);
        let bmiValue = bmiInt.toFixed(1);
        console.log(bmiValue);
        // To improve this!
        if (bmiValue >= 18.5 && bmiValue < 22) {
          let link = "./icons/fastsmile.svg"
          return link;
        } else if (bmiValue >= 22 && bmiValue <= 25) {
          let link = "./icons/smile.svg"
          return link;
        } else if (bmiValue > 25 && bmiValue <= 30) {
          let link = "./icons/fastsmile.svg"
          return link;
        } else {
          let link = "./icons/sad.svg"
          return link;
        }

      },
      // Generator function to generate IDs
      genIDs: function*() {
        let index = parseInt(StorageCtrl.getNextID());
        while (true) {
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
      getWeight: function(index) {
        if (StorageCtrl.data !== null) {
          return StorageCtrl.data[index].weight;
        } else {
          return 80;
        }
      },
      getItemById: function(id) {
        const data = StorageCtrl.getLSData();
        let found = null;

        if (data[id - 1]) {
          StorageCtrl.currentItem = data[id - 1];
          return (data[id - 1]);
        } else {
          return found;
        }
      },
      // Important after deleting an element
      updateIds: function() {
        StorageCtrl.data.forEach(function(item, id) {
          item.ID = id + 1;
        });
      }
    }
  })();

  // AppCtrl
  const AppCtrl = (function(StorageCtrl, UICtrl, UICanvas, ItemCtrl) {
    // Declare private vars and functions

    // Load event listeners
    const loadEventListeners = function() {

      // Get UI Selectors
      const UISelectors = UICtrl.getSelectors();
      const UICanvasSelectors = UICanvas.getSelectors();

      // Add Event Listener to the inputs in case of the value change
      // height:
      document.querySelector(UISelectors.height).addEventListener("change", UICtrl.populateInputs);
      // Start Weight:
      document.querySelector(UISelectors.startWeight).addEventListener("change", UICtrl.populateInputs);
      // Actual Weight:
      document.querySelector(UISelectors.actualWeight).addEventListener("change", UICtrl.populateInputs);
      // For the tbody
      document.querySelector(UISelectors.tableBody).addEventListener("click", clickedToEdit);
      // For the edit button
      document.querySelector(UISelectors.editBtn).addEventListener("click", btnEdit);
      // For the back button
      document.querySelector(UISelectors.backBtn).addEventListener("click", btnBack);
      // For the delete button
      document.querySelector(UISelectors.deleteBtn).addEventListener("click", btnDelete);
      // For the delete All button
      document.querySelector(UISelectors.deleteAllBtn).addEventListener("click", btnDeleteAll);
      // Add Event Listener To Save button
      document.querySelector(UISelectors.saveBtn).addEventListener("click", StorageCtrl.downloadVideosToJSON);
      // Add Event Listener To Load JSON file
      document.querySelector(UISelectors.loadJSONBtn).addEventListener("click", loadDataAndPopulateUI);
      // Disable submit on enter
      document.addEventListener("keypress", function(e) {
        if (e.keyCode === 13 || e.which === 13) {
          e.preventDefault();
          return false;
        }
      });
      // EventListeners for Canvas buttons
      document.querySelector(".buttonGroup").addEventListener("click", function(e) {
        // const btnClicked = e.path[0].id;
        switch (e.target.id) {
          case "oneWeekBtn":
            groupCanvasBtn(7);
            break;
          case "twoWeeksBtn":
            groupCanvasBtn(14);
            break;
          case "oneMonthBtn":
            groupCanvasBtn(30);
            break;
          case "twoMonthsBtn":
            groupCanvasBtn(60);
            break;
          case "threeMonthsBtn":
            groupCanvasBtn(90);
            break;
          case "sixMonthsBtn":
            groupCanvasBtn(180);
            break;
          case "oneYearBtn":
            groupCanvasBtn(360);
            break;
          default:
            let dataArray = StorageCtrl.getLSData();
            groupCanvasBtn(dataArray.length);
            break;
        }
      });
      // Submit button
      document.querySelector(UISelectors.submitBtn).addEventListener("click", itemToSubmit);

    }
    // delete All
    const btnDeleteAll = function() {
      // Clear data array
      StorageCtrl.clearAllItems();
      // Clear LocalStorage
      StorageCtrl.clearItemsFromStorage();
      // Clear graphic
      UICanvas.eraseCanvas();
      // Clear table
      UICtrl.deleteTable();
      // Sending a message to the user!
      UICtrl.showAlert("All Items deleted!", "alert alert-danger");
    }
    // canvas buttons
    const groupCanvasBtn = function(amount) {
      // get the hole array: we need to get the data from LocalStorage!
      // if not, if we use StorageCtrl.data. Splice will point to it and change
      // the original array!
      let dataArray = StorageCtrl.getLSData();
      if (amount > dataArray.length) {
        UICanvas.plotGraph(dataArray);
        // Sending a message to the user!
        UICtrl.showAlert("Not enough data!", "alert alert-danger");
      } else {
        // we will here get the last 7 days measured!
        let hacked = dataArray.splice(dataArray.length - amount, amount);
        // Plot graphics
        // let's plot the horizontal lines
        UICanvas.plotGraph(hacked);
      }
    }

    // Start UI: we populate UI with the necessary information
    const loadDataAndPopulateUI = function() {
      // if true, means that we will get the JSON file and write in LS
      // we will deactived here for now because it does not work in github
      if (StorageCtrl.loadJSONFile()) {
        // Clear table
        UICtrl.deleteTable();
      }
      // Hide the Edit and back buttons
      UICtrl.hideButtons();
      // Get the data from LocalStorage
      const items = StorageCtrl.getLSData();
      // We populate the table and input only if there is a data!
      if (items !== null) {
        // Populate the inputs
        UICtrl.populateInputs();
        // Populate the table
        UICtrl.populateTable(items);
        // Plot graphics
        plotGraph();
      }
      // Update input: display actual weight
      UICtrl.populateInputs();

    }

    const plotGraph = function() {
      // let's plot the horizontal lines
      UICanvas.plotGraph(StorageCtrl.data);
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
      // Update graphic
      plotGraph();
      // Sending a message to the user!
      UICtrl.showAlert("item added!", "alert alert-primary");
      // FINESHED: UI is updated!
    }

    // Edit the actual item
    const clickedToEdit = function(e) {
      // check if he has click at the icon
      if (e.target.classList.contains("edit")) {
        // Get the id of the item
        const listID = parseInt(e.target.parentNode.id);
        // Update the current Item (to be used in case of delete)
        StorageCtrl.currentItem = StorageCtrl.data[listID - 1];
        // Get the element to be edited
        const item = ItemCtrl.getItemById(listID);
        // Reload the UI with the values of the item to be edited
        UICtrl.reloadItem(item);
        // Show ready to edit
        // Sending a message to the user!
        UICtrl.showAlert("Ready to Edit!", "alert alert-success");
      }
    }

    const btnEdit = function() {
      // Get the new Date and new Weight
      const dataToBeUpdated = UICtrl.getWeightDateHeight();
      // Update the current Item that updates direct the data!
      // The currentItem is kind of a pointer to the data array!
      StorageCtrl.currentItem.weight = dataToBeUpdated.weight;
      StorageCtrl.currentItem.date = dataToBeUpdated.date;
      // Load Current Data Array to the localStorage
      StorageCtrl.uploadDataToLS();
      // Hide Edit and Back buttons
      UICtrl.hideButtons();
      // Update the specific line on the table
      UICtrl.updateTable(StorageCtrl.currentItem, true);
      // Update input: actual weight
      UICtrl.populateInputs();
      // Update graphic
      plotGraph();
      // Sending a message to the user!
      UICtrl.showAlert("Item Edited!", "alert alert-info");
    }

    const btnBack = function() {
      // Hide Edit and Back buttons
      UICtrl.hideButtons();
      // Populate the inputs!
      UICtrl.populateInputs();
      // Sending a message to the user!
      UICtrl.showAlert("No changes!", "alert alert-warning");
    }

    const btnDelete = function() {
      // Delete the item from the StorageCtrl.data
      StorageCtrl.data.splice(StorageCtrl.currentItem.ID - 1, 1);
      // Update the items IDs from StorageCtrl
      ItemCtrl.updateIds();
      // Save to local Storage
      StorageCtrl.uploadDataToLS();
      // We need to delete this line from the table UI
      // UICtrl.deleteTableLine(StorageCtrl.currentItem.ID);
      // We have to repopulate the table because of the IDs!!!
      // Before populate, let's delete the tableBody
      UICtrl.deleteTable();
      // Populate the table
      UICtrl.populateTable(StorageCtrl.data);
      // Update input: actual weight
      UICtrl.populateInputs();
      // Now, let's comeback to the normalState
      // Hide Edit and Back buttons
      UICtrl.hideButtons();
      // Populate the inputs!
      UICtrl.populateInputs();
      // Update graphic
      plotGraph();
      // Sending a message to the user!
      UICtrl.showAlert("Item deleted!", "alert alert-danger");

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

  })(StorageCtrl, UICtrl, UICanvas, ItemCtrl);


  // Initialize App
  AppCtrl.init();

  // //The lines below was used only to check the graphic position for debugging
  let canvas = document.getElementById("canvasWeight");
  let ctx = canvas.getContext("2d");
  // Mouse event click in canvas
  document.querySelector("#canvasWeight").addEventListener("click", function(e) {

    const rect = canvas.getBoundingClientRect();
    // const x = event.pageX - rect.left;
    // const y = event.pageY - rect.top;
    // let scaleX = canvas[0].width / rect.width;
    // let scaleY = canvas[0].height / rect.height;

    const x = (event.pageX - rect.left);
    const y = (event.pageY - rect.top);
    console.log(`X position: ${x}, Y position: ${y}`);
    console.log(e);
  });
}
