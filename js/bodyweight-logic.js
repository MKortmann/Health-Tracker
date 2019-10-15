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
  // (function() {
  //     let startingTime = new Date().getTime();
  //     // Load the script
  //     let script = document.createElement("SCRIPT");
  //     let script2 = document.createElement("SCRIPT");
  //     script.src = "./lib/jquery/jquery-3.3.1.js";
  //     script2.src = "./lib/bootstrap/bootstrap.js";
  //
  //     script.onload = function() {
  //     	let $ = window.jQuery;
  //       $(function() {
  //             let endingTime = new Date().getTime();
  //             let tookTime = endingTime - startingTime;
  //             console.log("jQuery & Bootstrap is loaded dinamically, after " + tookTime + " milliseconds!" + "Test function only to try to solve github load problem.");
  //         });
  //     };
  //     document.getElementsByTagName("head")[0].appendChild(script2);
  //     document.getElementsByTagName("head")[0].appendChild(script);
  //
  // })();

  /*
   * MODEL DATA: Storage Server Ctrl: used to delete, upload, and get data from
   * server. In this case is the firebase!
   */
  const StorageServerCtrl = (function() {
    // Declare private vars and functions
    let currentItem = null;
    // Start as a standard value
    let data = [];
    // // JSON file name
    // let jsonFileName = "";

    return {
      // Get Item ID from Firebase
      getIDFromServer: function(id) {
          let idServer = 0;
          const http = new EasyHTTP();
          // // getting the data
          http.getWithCallback(baseURL + ".json", function(response) {
            let items = Object.entries(response);
            items.forEach((item, index) => {
                if(item[index, 1].ID === id) {
                  console.log(item[0]);
                  idServer = item[1];
                  idServer.BMI = "0";
                  StorageServerCtrl.updateData(idServer, `${item[0]}.json`);
                }
            })
          })
      },
      // Principle of offline first!!!
      loadData2: function(callback) {
        const http = new EasyHTTP();
        // // getting the data
        http.get(baseURL + ".json")
          .then(data => {
            // transforming an object with objects in an array with objects!!!
            // if is null, should be an empty array to avoid errors
            callback(data);
          });
      },
      // Declare public var and functions
      deleteData: function(extension) {
        const http = new EasyHTTP();
        // // posting the data
        http.delete(baseURL + extension)
          .then(
            data => {
              console.log(data);
            }
          )
          .catch(err => console.log(err));
      },
      updateData: function(dataToSubmit, extension = ".json") {
        debugger
        const http = new EasyHTTP();
        // // posting the data
        http.post(baseURL + extension, dataToSubmit)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      },
      uploadData: function(dataToSubmit, extension = ".json") {
        const http = new EasyHTTP();
        // // posting the data
        http.post(baseURL + extension, dataToSubmit)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      },
      // Principle of offline first!!!
      loadData: function() {
        let items;
        const http = new EasyHTTP();
        // // getting the data
        http.get(baseURL + ".json")
          .then(data => {
            // transforming an object with objects in an array with objects!!!
            // if is null, should be an empty array to avoid errors
            data === null ? data = {} : data;
            items = Object.values(data);
            // Get the data from LocalStorage to see if we need to update
            let LSItems = [];
            LSItems = StorageCtrl.getLSData();
            // if is null, should be an empty array to avoid errors
            LSItems === null ? LSItems = [] : LSItems;
            // compare LS data with Server Data: if true, let's populate with
            // new data!
            if ( ( items.length  > LSItems.length ) && (items !== null) ) {
              // add to localStorage
              localStorage.setItem("items", JSON.stringify(items));
              // Populate the inputs
              UICtrl.populateInputs();
              // Clear table
              UICtrl.deleteTable();
              // Populate the table
              UICtrl.populateTable(items);
              // Plot graphics
              plotGraph();
              // Update input: display actual weight
              UICtrl.populateInputs();
            }
          })
          .catch(err => {
            console.log("Network Error:" + err);
          });
      }
    }
  })();

  /*
   * MODEL DATA: StorageCtrl
   */
  const StorageCtrl = (function() {
    // Declare private vars and functions
    let currentItem = null;
    // Start as a standard value
    let data = [];
    // // JSON file name
    // let jsonFileName = "";

    return {
      // Declare public var and functions

      saveData: function(item) {
        let items = [];
        // Check local storage
        if (localStorage.getItem("items") === null) {
          // add the new item
          items.push(item);
          // add to localStorage
          localStorage.setItem("items", JSON.stringify(items));
          StorageServerCtrl.uploadData(item);
        } else {
          // get the saved information from localStorage
          items = JSON.parse(localStorage.getItem("items"));
          // add the new item
          items.push(item);
          // add to localStorage
          localStorage.setItem("items", JSON.stringify(items));
          // add Data to server: we add always only the added!
          // One data per time!
          // items.forEach((item) => {
            StorageServerCtrl.uploadData(item);
          // });
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
        const items = StorageCtrl.data;
        // add to localStorage
        localStorage.setItem("items", JSON.stringify(items));
        // add all data to the server!!!
        // we should replace the setTimeout for something more reliable, because
        // we make: async -> delete all and the wee made another async upload all.
        setTimeout((item)=> {
          items.forEach((item) => {
            StorageServerCtrl.uploadData(item);
          });
        }, 5000)

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
      // // Open a file selection to select the json file
      // selectFile: function() {
      //   // open a file selection dialog
      //   const input = document.createElement('input');
      //   input.type = 'file';
      //   // handle the selected file
      //   input.onchange = e => {
      //     const file = e.target.files[0];
      //     return file.name;
      //   }
      //   input.click();
      // },
      // The method XMLhttpRequest works only if you have a server installed.
      // easier way: go to your project file throught prompt command and type:
      // npm install -g live-server
      // run it typing: live-server
      loadJSONFile: function() {
        // get the json file name

        // let fileName = StorageCtrl.selectFile();
        // console.log(`Output filename: ${fileName}`);

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
      heightEdit: "#heightEdit",
      startWeight: "#startWeight",
      actualWeight: "#actualWeight",
      diffWeight: "#diffWeight",
      actualBMI: "#actualBMI",
      submitBtn: "#submit",
      weight: "#weight",
      weightEdit: "#weightEdit",
      time: "#time",
      timeEdit: "#timeEdit",
      date: "#date",
      dateEdit: "#dateEdit",
      tableBody: "tbody",
      editBtn: "#editBtn",
      backBtn: "#backBtn",
      deleteBtn: "#deleteBtn",
      deleteAllBtn: "#deleteAllBtn",
      deleteAllAskBtn: "#deleteAllAskBtn",
      saveBtn: "#saveBtn",
      loadJSONBtn: "#loadJSONBtn",
      dropdownMenuButton: "#dropdownMenuButton",
      dropDownBMI: "#dropDownBMI",
      dropDownDate: "#dropDownDate",
      dropDownTime: "#dropDownTime",
      avgWeight: "#avgWeight",
      avgBMI: "#avgBMI"
    }

    return {
      // Hide hide Highlights
      hideHighlights:  function() {
        document.querySelector(".sectionA").style.display = "none"
        document.querySelector("#canvasWeight").style.display = "none";
        document.querySelector(".sectionBCanvasButtons").style.display = "none";
      },
      // Declare public var and functions
      showAlert: function(message, className) {
        //create 2 div's to display at same time message below canvas and in Input Field
        const divInInput = document.createElement("div");
        const divBelowCanvas = document.createElement("div");
        //add classes: the class alert is used to be able to remove it afterwards!
        divInInput.className = `alert ${className} text-center  p-2 m-0`;
        divBelowCanvas.className = `alert ${className} text-center  p-2 m-0`;
        // Add text
        divInInput.appendChild(document.createTextNode(message));
        divBelowCanvas.appendChild(document.createTextNode(message));
        // Get the elements to be insert it (we insert it in two places:
        // Place 1: Inside Input Field, Place 2: Below the Canvas )
        document.querySelectorAll(".containerToAddAlertMsg").forEach((item, index) => {
          index === 0 ? item.appendChild(divInInput) : item.appendChild(divBelowCanvas)
        })
        // const element = document.querySelector(".containerToAddAlertMsg");
        // // insert alert
        // element.appendChild(div);
        //the message should disappear after 3 seconds
        setTimeout(function() {
          document.querySelectorAll(".alert").forEach((item) => {
            item.remove();
          })
          // document.querySelectorAll("#containerInputToHighlight").forEach((item) => {
          //   item..style.backgroundColor = "";
          // })
        }, 4000);
      },
      // return the UI Selectors
      getSelectors: function() {
        return UISelectors;
      },
      // return the weight and date from the inputs
      getWeightDateHeightTime: function() {
        // return an object with the weight and date
        return {
          weight: document.querySelector(UISelectors.weight).value,
          date: document.querySelector(UISelectors.date).value,
          height: document.querySelector(UISelectors.height).value,
          time: document.querySelector(UISelectors.time).value,
          timeEdit: document.querySelector(UISelectors.timeEdit).value,
          weightEdit: document.querySelector(UISelectors.weightEdit).value,
          dateEdit: document.querySelector(UISelectors.dateEdit).value,
          heightEdit: document.querySelector(UISelectors.heightEdit).value,
        }
      },
      // populate the inputs: diffWeight and BMI
      populateInputs: function() {
        // Update actual weight
        // In case that we do not have any data!
        if (StorageCtrl.data === null || StorageCtrl.data.length === 0) {
          document.querySelector(UISelectors.actualWeight).value = 80;
          // plot a text in the graphic
          // UICanvas.plotWelcome();
          // HIDE HIGHLIGHTS
          UICtrl.hideHighlights();
        } else if (StorageCtrl.data.length === 1) {
          // UICanvas.plotWelcome();
          document.querySelector(".sectionA").style.display = "inline";
        } else {
          document.querySelector(UISelectors.actualWeight).value = ItemCtrl.getWeight(StorageCtrl.data.length - 1);
          document.querySelector("#canvasWeight").style.display = "inline";
          document.querySelector(".sectionBCanvasButtons").style.display = "inline";
        }
        // Filling the time input with the actual time
        document.querySelector(UISelectors.time).value = ItemCtrl.getTime();
        // Get the first start weight getFirstWeight
        document.querySelector(UISelectors.startWeight).value = ItemCtrl.getWeight(0);
        // diffW = startWeight - actualWeight
        const diffW = document.querySelector(UISelectors.startWeight).value -
          document.querySelector(UISelectors.actualWeight).value;
          document.querySelector(UISelectors.diffWeight).value = diffW.toFixed(2);
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

        let averageArray = UICtrl.calcAverageWeightBMI();
        // display the average WEIGHT
        document.querySelector(UISelectors.avgWeight).value = averageArray[0].toFixed(2);
        // display the average BMI
        document.querySelector(UISelectors.avgBMI).value = averageArray[1].toFixed(2);
      },
      calcAverageWeightBMI: function () {
        // e.preventDefault();

        const localData = StorageCtrl.getLSData();

        let avgWeight = 0;
        let avgBMI = 0;

        if(localData !== null)
        {
          localData.forEach(function(item, index) {
            avgWeight += parseInt(item.weight);
            avgBMI += parseInt(item.BMI);
          });

          avgWeight = avgWeight/localData.length;
          avgBMI = avgBMI/localData.length;

          return [avgWeight, avgBMI];
      } else  {

        return [0,0];
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

        let select = document.querySelector(UISelectors.dropdownMenuButton).innerHTML;
        let linkColumn;

        // Control what to display in accord to the text
        switch (select) {
          case "Time":
            linkColumn = item.time;
            break;
          case "BMI":
            linkColumn = item.BMI;
            break;
          default:
            linkColumn = item.date;
        }

        if (!updateOnlyOneLine) {
          const table = document.querySelector(UISelectors.tableBody);
          const row = document.createElement("tr");

          row.innerHTML = `
              <tr>
                <td scope="row" class="align-middle">${item.ID}</td>
                <td class="align-middle">${linkColumn}</td>
                <td class="align-middle d-none d-sm-table-cell">${item.time}</td>
                <td class="align-middle">${item.weight}  kg</td>
                <td class="align-middle d-none d-sm-table-cell">${item.BMI} <span class="d-none d-md-inline-block"> kg/m&sup2;</span></td>
                <a href="#" id="${item.ID}">
                <img src=${link} class="float-left img-fluid edit d-none d-md-block align-middle"></img>
                <img src="./icons/edit.svg" class="float-right img-fluid edit" data-toggle="modal" data-target="#locModal3"></img>
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
                <td class="align-middle">${linkColumn}</td>
                <td class="align-middle d-none d-sm-table-cell">${item.time}</td>
                <td class="align-middle">${item.weight}  kg</td>
                <td class="align-middle d-none d-sm-table-cell">${item.BMI} <span class="d-none d-md-inline-block"> kg/m&sup2;</span></td>
                <a href="#" id="${item.ID}">
                <img src=${link} class="float-left img-fluid edit d-none d-md-block align-middle"></img>
                <img src="./icons/edit.svg" class="float-right img-fluid edit" data-toggle="modal" data-target="#locModal3"></img>
                </a>
              </tr>
              `;
        }
      },
      deleteTable: function(id) {
        document.querySelector("tbody").innerHTML = "";
      },
      reloadItem: function(item) {
        // Reload the Date and Weight Input
        document.querySelector(UISelectors.weightEdit).value = item.weight;
        document.querySelector(UISelectors.dateEdit).value = item.date;
        document.querySelector(UISelectors.timeEdit).value = item.time;
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
      AllMeasureBtn: "AllMeasureBtn",
      zoomInBtn: "#zoomInBtn",
      btnFlagZoomIn: "#btnFlagZoomIn",
      zoomOutBtn: "#zoomOutBtn",
      btnFlagZoomOut: "#btnFlagZoomOut",
      canvasWeight: "#canvasWeight",
      printBtn: "#printBtn",
      hamburgerDown: "#hamburgerDown"

    }
    // Initialize Canvas
    let canvas = document.querySelector(UICanvasSelectors.canvasWeight);
    // /*We need to specific write the kind of environment we are
    // working: is it 2D or 3D!*/
    let ctx = canvas.getContext("2d");
    // very important to make the app responsive! It fits all the draws in accord to the screen width size.
    // the y size is not necessary. For that, we use the variable factor declared below.
    ctx.scale(canvas.width/window.innerWidth,1);
    ctx.lineWidth = 2;

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let invertYAxis = canvas.height+20;
    let invertYAxisText = canvas.height+10;
    // the factor uses to maximixe canvas in the y-axis! The basic unit of the
    // canvas in the y-axis is 200. We have calculated everything using this number!
    let factor = canvasHeight/200;
    // the deltaX determines the step between two measures in the x-axis
    let deltaX;
    // deltaY: used to see the factor zoom
    let deltaY;
    // To plot the graph lines!
    let StartYlines = [[0.5, 190],[0.5, 150],[0.5, 110],[0.5, 70],[0.5, 30]];
    let EndYlines = [
      [canvasWidth+0.5, 190.5],
      [canvasWidth+0.5, 150.5],
      [canvasWidth+0.5, 110.5],
      [canvasWidth+0.5, 70.5],
      [canvasWidth+0.5, 30.5]
    ];
    // Text to write
    let TextYlines = [[0, 190],[0, 150],[0.5, 110],[0, 70],[0, 30]];
    // Offset to correct
    let OffsetYlines = [[0, 190],[0, 150],[0, 110],[0, 70],[0, 30]];
    // flag to show that we have done the zoom
    let flag = false;
    // let colorBackgroundLine = "#6c757d";
    const colorBackgroundLine = "black";
    const colorLine = "#17a2b8";
    const colorText = "#007bff";
    const colorText2 = "#343a40";
    const colorCircle = "#dc3545";
    const colorBackgroundText = "black";
    const textFont = "26px serif";
    // const colorDashedLine = "#17a2b8";
    const colorDashedLine = "#007bff";
    // const colorDashedLine = "#dc3545";
    const setDash = [5,20];

    // Canvas Y: start from 0 (top) and goes to 200 (bottom) [times factor]
    // Canvas X: start from 0 (left) and goes to 1880 (right) [dinamically readjusted]
    // Basic units (these are the basic values!):
    // So we will plot y between (5 and 145);
    // And we will plot x between (5 and 295);

    return {
      // plot welcome text
      plotWelcome: function() {
        UICanvas.drawText("Welcome to Health Track!", [canvasWidth/3,canvasHeight/2], colorText, invertYAxis);
        UICanvas.drawText("After two measures, the graphic will be ploted!", [canvasWidth/3,canvasHeight/2-30], colorText, invertYAxis);
      },
      // printing
      print: function(exportTable) {
        const dataUrl = document.querySelector("#canvasWeight").toDataURL();
        const tableToPrint = document.getElementById("tableContainer");
        let windowContent = '<!DOCTYPE html>';
        windowContent += '<html>'
        windowContent += `<head><title>Health Tracker</title></head>`;
        windowContent += '<body>'
        windowContent += '<h1>Health Tracker</h1><br>'
        windowContent += '<h1>Canvas</h1><br>'
        windowContent += '<img src="' + dataUrl + '">';
        windowContent += `${exportTable}`;
        windowContent += '</body>';
        windowContent += '</html>';
        let printWin = window.open('', '', `width=1880px,height=400px`);
        printWin.document.open();
        printWin.document.write(windowContent);

        //I am using ES6 here instead of jQuery. Do not work with on!
        printWin.document.addEventListener('load', function() {
            printWin.focus();
            printWin.print();
            printWin.document.close();
            printWin.close();
        }, true);
      },
      // zoom canvas
      zoomInCanvas: function(maxValue, minValue, data) {
        let startPos, endPos;

        let stopOrGo = true;

        for (let i = 0; i < StartYlines.length; i++) {
          if( TextYlines[i][1] !== StartYlines[i][1] ) {
            stopOrGo = false;
            break;
          }
        }

        if(stopOrGo) {

          for (let i = 0; i < StartYlines.length; i++) {
            if (maxValue > StartYlines[i][1]) {
              // to be sure that we do not reach more the 190 weight
              if(i-1 >= 0) {
                endPos = StartYlines[i-1][1];
                break;
              } else {
                endPos = StartYlines[i][1];
                break;
              }
            }
          }
          for (let i = 0; i < StartYlines.length; i++) {
            if (minValue >= StartYlines[i][1]) {
                startPos = StartYlines[i][1];
                break;
            }
          }

          UICanvas.readjustYValues(startPos, endPos);
          UICanvas.plotGraph(data);
        }
      },
      zoomOutCanvas: function(data) {
        flag = false;
        // important to reset in this way because JS sometimes save/pass the reference and the values
        // do not match anymore! Why? BECAUSE THESE OBJECTS/ARRAYS ARE REFERENCE TYPE! NOT PRIMITIVES TYPES AS NUMBER, STRING AND SO ON.
        TextYlines = [[0, 190],[0, 150],[0, 110],[0, 70],[0, 30]];
        // We can also use the spread operator. The spread operator create a new object! Spread the proprieties, it will pull out from the object. HOWEVER IT DID NOT WORK IN THIS CASE!
        // OffsetYlines = {...TextYlines};
        // Or use the slice() operator. However, it did not worked because it lost the reference! It is not coping, it is passing the reference.
        OffsetYlines = [[0, 190],[0, 150],[0, 110],[0, 70],[0, 30]];
        UICanvas.plotGraph(data);
      },
      readjustYValues: function(startPos, endPos) {
        deltaY = (endPos-startPos)/4;
        for (let i = 0; i < StartYlines.length; i++) {
          TextYlines[i][1] = endPos-deltaY*i;
          OffsetYlines[i][1] = OffsetYlines[i][1] - TextYlines[i][1];
        }
        flag = true;
      },
      readjustWeightValues: function(weightValue) {
        // flag means that we have done the zoom
        weightValue = parseInt(weightValue);
        // console.log(TextYlines);
        // console.log(OffsetYlines);

        let localAdjustFactor;
        console.log(`DeltaY: ${deltaY}`);
        if( deltaY === 30) {
          localAdjustFactor = 0.5;
        } else if (deltaY === 20) {
          localAdjustFactor = 1;
        } else {
          localAdjustFactor = 2;
        }

        if( flag && deltaY !== 40 ) {
          if(weightValue < TextYlines[3][1]) {
            return (weightValue + parseInt(OffsetYlines[4][1]) + (weightValue-parseInt(TextYlines[4][1]))*localAdjustFactor );
          } else if (weightValue < TextYlines[2][1]) {
            return (weightValue + parseInt(OffsetYlines[3][1]) + (weightValue-parseInt(TextYlines[3][1]))*localAdjustFactor);
          } else if (weightValue < TextYlines[1][1]) {
            return (weightValue + parseInt(OffsetYlines[2][1]) + (weightValue-parseInt(TextYlines[2][1]))*localAdjustFactor);
          } else if (weightValue < TextYlines[0][1]) {
            return (weightValue + parseInt(OffsetYlines[1][1]) + (weightValue-parseInt(TextYlines[1][1]))*localAdjustFactor);
          } else {
            return (weightValue + parseInt(OffsetYlines[0][1]) + (weightValue-parseInt(TextYlines[0][1]))*2);
          }
        } else {
          return weightValue;
        }
      },
      // check the canvas.Width and recorrect data and replot data
      checkCanvas: function() {
        console.log(canvas.Width);
        console.log(canvas.Height);
      },
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
          UICanvas.drawStraightLine(startPos, endPos, colorBackgroundLine);
          // the number 8 only let the text a little higher! Used only here!
          UICanvas.drawText(TextYlines[i][1], startPos, colorBackgroundText, invertYAxisText + 8);
        }
      },
      plotYDate: function(data, deltaX) {
        let posX = 30;
        let measurements = data.length - 1;
        let middlePos = 0;
        // Calc the middle position of the canvas
        if (measurements % 2 === 0) {
          middlePos = measurements / 2;
        } else {
          middlePos = (measurements - 1) / 2;
        }
        // Pretty challenge! We want to show only 3 x-measurements in accord with
        // the x-values positions respective to the y-measurements (weight)
        for (let i = 0; i < data.length; i++) {
          // get the start and middle position: necessary to ajust the text on canvsa
          if ( ( (posX === 30) && (data.length < 70) && (window.innerWidth >= 400) ) || ( (posX === 30 + deltaX * middlePos) && (window.innerWidth >= 400) && (data.length < 70) ) ) {
            // if(posX === 15 || mesurements === 195|| posX === 395 ||
            //    posX === 595|| posX === 795 ) {
            UICanvas.drawText(data[i].date, [posX - 10, 12], colorBackgroundText, invertYAxisText);
            if(posX !== 30) {
              UICanvas.drawStraightLine([posX, 35],[posX, 390], colorDashedLine, setDash);
            }
            // for the first and middle position!
          } else if ( (posX === 30)  || ((posX === 30 + deltaX * middlePos) && data.length < 100) ) {

            // get the end position: necessary to ajust the text on canvas
            // the last data to plot we remove the year!
            let newData = data[i].date;
            newData = newData.split("-");
            newData = newData[1] + "-" + newData[2];

            UICanvas.drawText(newData, [posX - 10, 12], colorBackgroundText, invertYAxisText);
            UICanvas.drawStraightLine([posX, 35],[posX, 390], colorDashedLine, setDash);


          } else if ((posX === 30 + deltaX * measurements)) {

            // get the end position: necessary to ajust the text on canvas
            // the last data to plot we remove the year!
            let newData = data[i].date;
            newData = newData.split("-");
            newData = newData[1] + "-" + newData[2];
            // repositioning the text in case we have a smaller screen
            if ( window.innerWidth <= 800 ) {
              UICanvas.drawText(newData, [posX - 50, 12], colorBackgroundText, invertYAxisText);
              UICanvas.drawStraightLine([posX, 35],[posX,390], colorDashedLine, setDash);
            // in case we have less than 30 measurements
            } else if ( measurements <= 30 ) {
              UICanvas.drawText(newData, [posX - 10, 12], colorBackgroundText, invertYAxisText);
              UICanvas.drawStraightLine([posX, 35],[posX, 390], colorDashedLine, setDash);
            } else {
              UICanvas.drawText(newData, [posX - 35, 12], colorBackgroundText, invertYAxisText);
              UICanvas.drawStraightLine([posX, 35],[posX, 390], colorDashedLine, setDash);
            }
          }
          posX = posX + deltaX;
        }
      },
      plotGraph: function(data) {
        UICanvas.eraseCanvas();
        // check the window size and if it is smaller than 1880px, it plots only the last week
        // if(window.innerWidth < 1880) {
        //   data = data.splice(data.length-7, 7);
        // }
        UICanvas.plotXLines();
        let posX = 30;
        let startPos, endPos, weightArray = [], weightArrayOriginal = [];
        // extract from data an weight array with only weight data
        data.forEach(function(item, index) {
          weightArrayOriginal.push(item.weight);
          const value = UICanvas.readjustWeightValues(item.weight);
          weightArray.push(value);
        });

        // if there a lot of data, we will hide the text!
        let hideText = false;
        if (data.length > 60 || (data.length > 7 && window.innerWidth < 800) ) {
          hideText = true;
        }

        deltaX = UICanvas.returnStepXDelta(weightArray);
        UICanvas.plotYDate(data, deltaX);

        weightArray.forEach(function(item, index) {
          startPos = [posX, weightArray[index]];
          if (index !== weightArray.length) {
            endPos = [posX + deltaX, weightArray[index + 1]];
            // drawing differents colors
            if(index % 2 === 0) {
              UICanvas.drawCircle(startPos, colorText2);
            } else {
              UICanvas.drawCircle(startPos, colorText);
            }

            UICanvas.drawStraightLine(startPos, endPos, colorLine);

            if (!hideText) {
              // UICanvas.drawText(weightArrayOriginal[index], startPos, colorText, invertYAxisText);
              // This we will write the text sometimes one time above the line and next time below the line!
              if(index % 2 === 0) {
                UICanvas.drawText(weightArrayOriginal[index+1], endPos, colorText, invertYAxisText);
              } else {
                endPos[1] = endPos[1] - 18;
                UICanvas.drawText(weightArrayOriginal[index+1], endPos, colorText2, invertYAxisText);
              }
            }
            // we plot here the last point!
            // if ((index + 2) === weightArray.length) {
            //   endPos[1] = endPos[1] + 18;
            //   UICanvas.drawCircle(endPos, colorText2);
            //   // if (!hideText) {
            //   //   // UICanvas.drawText(endPos[1], endPos, colorText, invertYAxisText);
            //   //   // This we will write the text sometimes one time above the line and next time below the line!
            //   //   UICanvas.drawText(weightArrayOriginal[index+1], endPos, colorText2, invertYAxisText);
            //   // }
            // }
            // deltaX
            posX = posX + deltaX;
          }
        })
      },
      drawStraightLine: function(startPos, endPos, color, dashed = []) {
        // Add 0.5 factor to see if it the image will be sharper!
        // we need to invert the y-axis
        ctx.beginPath(); // Start a new path
        ctx.setLineDash(dashed);
        ctx.moveTo(startPos[0]+0.5, invertYAxis - startPos[1]*factor +0.5); // Move the pen to (30, 50)
        ctx.strokeStyle = color;
        ctx.lineTo(endPos[0]+0.5, invertYAxis - endPos[1]*factor + 0.5); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
      },
      drawCircle: function(startPos, color, dashed = []) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.setLineDash(dashed);
        ctx.arc(startPos[0], invertYAxis - startPos[1]*factor, 3*factor, Math.PI * 2, false);
        ctx.stroke();
      },
      // drawText inputs: data = data, startPos = the x,y position
      drawText: function(data, startPos, color, invertYAxisText) {

        if(window.innerWidth <= 320) {
          ctx.font = "20px serif";
        } else if (window.innerWidth <= 1700) {
          ctx.font = textFont;
        } else {
          ctx.font = "32px serif";
        }

        ctx.fillStyle = color;
        ctx.fillText(data, startPos[0], invertYAxisText - startPos[1]*factor);
      },
      // erase the canvas drawing a white rectangles
      eraseCanvas: function() {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      },
      // calculate the gap in the x-axis! The distance between two measures in the x-axis.
      // To make it dynamically, it get the width of the window!
      returnStepXDelta: function(data) {
        const reduce = 20;
        switch (data.length) {
          case 7:
            return Math.floor( (window.innerWidth - reduce) / 7);
            break;
          case 14:
            return Math.floor( (window.innerWidth - reduce) / 14);
            break;
          case 30:
            return Math.floor( (window.innerWidth - reduce) / 30);
            break;
          case 60:
            return Math.floor( (window.innerWidth - reduce) / 60);
            break;
          case 90:
            return Math.floor( (window.innerWidth - reduce) / 90);
            break;
          case 180:
            return Math.floor( (window.innerWidth - reduce) / 180);
            break;
          case 360:
            return Math.floor( (window.innerWidth - reduce) / 180);
            break;
          default:
            // return Math.floor(window.innerWidth / data.length);
            return Math.floor( (window.innerWidth - reduce) / data.length);
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
      /**Calculate and display the time*/
      getTime: function() {
        const today = new Date();
        const hours = today.getHours();
        const min = today.getMinutes();

        const newHours = (hours < 10) ? "0" + hours : hours
        const newMin = (min < 10) ? "0" + min : min

        return ( newHours + ":" + newMin );
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
      },
      // check input values
      validateInputs({weight, height, date}) {
        // CHECKING THE WEIGHT:
        // we check that the weight shoudl be between 30 and 199.9
        const weightCheck1 = /^[3-9]{1}[0-9]{1}(.[0-9]{1})?$/;
        const weightCheck2 = /^[1]{1}[0-9]{1}[0-9]{1}(.[0-9]{1})?$/;

        if(!weightCheck1.test(weight) && !weightCheck2.test(weight)) {
          return ([false, "The weight should be between 30 and 199 kg!"]);
        }

        // CHECKING THE WEIGHT:
        // we check that the weight shoudl be between 30 and 259 cm
        const heightCheck1 = /^[3-9]{1}[0-9]{1}$/;
        const heightCheck2 = /^[1-2]{1}[0-9]{1}[0-9]{1}$/;

        if(!heightCheck1.test(height) && !heightCheck2.test(height)) {
          return ([false, "The height should be between 30 and 259 cm!"]);
        }

        // CHECKING THE DATE:
        // we check that the date should be between something like: 2019-08-17
        const dateCheck = /^[0-9]{1,4}-[0-9]{2}-[0-9]{2}$/;

        if(!dateCheck.test(date)) {
          return ([false, "Please, correct the date!"]);
        } else {
          return ([true, ""]);
        }

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
      // Add Event Listener To printBtn: print table/canvas
      document.querySelector(UICanvasSelectors.printBtn).addEventListener("click", printData);
      // Disable submit on enter
      document.addEventListener("keypress", function(e) {
        if (e.keyCode === 13 || e.which === 13) {
          e.preventDefault();
          return false;
        }
      });
      // Dropdown button table event listeners
      // For BMI
      document.querySelector(UISelectors.dropDownBMI).addEventListener("click", reloadBMIColumnTable);
      // For Date
      document.querySelector(UISelectors.dropDownDate).addEventListener("click", reloadDateColumnTable);
      // For Time
      document.querySelector(UISelectors.dropDownTime).addEventListener("click", reloadTimeColumnTable);
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
          case "zoomInBtn":
            // disable the zoomInbutton
            document.querySelector(UICanvasSelectors.btnFlagZoomIn).setAttribute("disabled", "");
            if(document.querySelector(UICanvasSelectors.btnFlagZoomOut).hasAttribute("disabled")) {
              document.querySelector(UICanvasSelectors.btnFlagZoomOut).removeAttribute("disabled");
            }
            zoomInBtn();
            break;
          case "zoomOutBtn":
            // disable the zoomInbutton
            document.querySelector(UICanvasSelectors.btnFlagZoomOut).setAttribute("disabled", "");
            // debugger
            if(document.querySelector(UICanvasSelectors.btnFlagZoomIn).hasAttribute("disabled")) {
              document.querySelector(UICanvasSelectors.btnFlagZoomIn).removeAttribute("disabled");
            }
            zoomOutBtn();
            break;
          default:
            let dataArray = StorageCtrl.getLSData();
            groupCanvasBtn(dataArray.length);
            break;
        }
      });
      // Submit button
      document.querySelector(UISelectors.submitBtn).addEventListener("click", itemToSubmit);
      // For dropdownMenu (above table)
      document.querySelector(UICanvasSelectors.hamburgerDown).addEventListener("click", toggleMenu);

    }

    const toggleMenu = function() {
      // document.querySelector("#navbarToggleExternalContent").classList.toggle("show");
    }
    const printData = function() {
      // get data to print
      let data = StorageCtrl.getLSData();
      let dataToPrint = "<h1>Table</h1><br>";

      dataToPrint += `
      <div style="color:black;text-align:center;font-size:160%;">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Weight</th>
            <th>BMI</th>
          </tr>
        </thead>
        <tbody>
      `;

      data.forEach(function(item, index) {
        dataToPrint += `
          <tr>
            <td>${data.length-index}</td>
            <td>${item.date}</td>
            <td>${item.weight}</td>
            <td>${item.BMI}</td>
          </tr>
        `;
      });

      dataToPrint += "</tbody></table></div>";
      UICanvas.print(dataToPrint);
    }
    // zoomInBtn
    const zoomInBtn = function() {
      let data = StorageCtrl.getLSData();
      let weightArray = [];

      // extract from data an weight array with only weight data
      data.forEach(function(item, index) {
        weightArray.push(item.weight);
      });
      console.log(`Logging weightArray: ${weightArray}`);

      const maxValue = Math.ceil(Math.max(...weightArray));
      const minValue = Math.floor(Math.min(...weightArray));
      // pass the max and min values of the weight measured and the data!
      UICanvas.zoomInCanvas(maxValue, minValue, data);

    }
    const zoomOutBtn = function() {
      console.log("zoom out clicked");

      let data = StorageCtrl.getLSData();
      let weightArray = [];

      // extract from data an weight array with only weight data
      data.forEach(function(item, index) {
        weightArray.push(item.weight);
      });

      // pass the max and min values of the weight measured and the data!
      UICanvas.zoomOutCanvas(data);

    }
    // DROPDOWN MENU: For WebResponsive
    // dropdown menu table reload Date
    const reloadDateColumnTable = function(event) {
      event.preventDefault();
      // Update The Display Text
      document.querySelector("#dropdownMenuButton").innerHTML = "Date";
      // Before populate, let's delete the tableBody
      UICtrl.deleteTable();
      // Populate the table
      UICtrl.populateTable(StorageCtrl.data);
    }
    // reload table BMI
    const reloadBMIColumnTable = function(event) {
      event.preventDefault();
      // Update The Display Text
      document.querySelector("#dropdownMenuButton").innerHTML = "BMI";
      // Before populate, let's delete the tableBody
      UICtrl.deleteTable();
      // Populate the table
      UICtrl.populateTable(StorageCtrl.data);
    }
    // reload table Time
    const reloadTimeColumnTable = function(event) {
      event.preventDefault();
      // Update The Display Text
      document.querySelector("#dropdownMenuButton").innerHTML = "Time";
      // Before populate, let's delete the tableBody
      UICtrl.deleteTable();
      // Populate the table
      UICtrl.populateTable(StorageCtrl.data);
    }
    // delete All
    const btnDeleteAll = function() {
      // Clear data array
      StorageCtrl.clearAllItems();
      // Clear LocalStorage
      StorageCtrl.clearItemsFromStorage();
      // Delete All items in the server!
      StorageServerCtrl.deleteData(".json");
      // Clear graphic
      UICanvas.eraseCanvas();
      // Clear table
      UICtrl.deleteTable();
      // Hide Highlights, buttons and canvas
      UICtrl.hideHighlights();
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
        // Sending a message to the user!
        UICtrl.showAlert("File Loaded!", "success alert-success");
      } else {
        // Sending a message to the user!
        UICtrl.showAlert("To Load Data From A File, you have to rename the download file to: table.json. Then copy this file to the folder storage! Then try it again!", "danger alert-danger");
      }
      // // Get the data from LocalStorage
      const items = StorageCtrl.getLSData();
      // Get the data from the server
      StorageServerCtrl.loadData();
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
    const itemToSubmit = function(event) {
      // to prevent to send the form (reload)
      event.preventDefault();
      //START: GET AND PREPARE THE DATA
      // Get the data from UI
      const dataToSubmit = UICtrl.getWeightDateHeightTime();
      // Validate inputs
      const message = ItemCtrl.validateInputs(dataToSubmit);
      if(message[0]) {
        // used here only to test
        StorageServerCtrl.getIDFromServer(10);
        // Generate IDs
        const ID = ItemCtrl.genIDs().next().value;
        // Add ID to the data
        dataToSubmit.ID = ID;
        // Calculate BMI
        const bmi = ItemCtrl.getBMI(dataToSubmit.weight, dataToSubmit.height);
        // Add BMI to the dataToSubmit
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
      } else {
        // Sending a message to the user!
        UICtrl.showAlert(message[1], "alert alert-danger");
      }
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
      const dataToBeUpdated = UICtrl.getWeightDateHeightTime();
      // destructuring assignment changing names
      let {heightEdit: height, weightEdit: weight, dateEdit: date, timeEdit: time} = dataToBeUpdated;
      // Validate inputs
      const message = ItemCtrl.validateInputs({height, weight, date});
      if(message[0]) {
        // Update the current Item that updates direct the data!
        // The currentItem is kind of a pointer to the data array!
        StorageCtrl.currentItem.weight = dataToBeUpdated.weightEdit;
        StorageCtrl.currentItem.date = dataToBeUpdated.dateEdit;
        StorageCtrl.currentItem.time = dataToBeUpdated.timeEdit;
        // Delete All items in the server!
        StorageServerCtrl.deleteData(".json");
        // Load Current Data Array to the localStorage
        StorageCtrl.uploadDataToLS();
        // Update the specific line on the table
        UICtrl.updateTable(StorageCtrl.currentItem, true);
        // Update input: actual weight
        UICtrl.populateInputs();
        // Update graphic
        plotGraph();
        // Sending a message to the user!
        UICtrl.showAlert("Item Edited!", "alert alert-info");
      } else {
        // Sending a message to the user!
        UICtrl.showAlert(message[1], "alert alert-danger");
      }
    }

    const btnBack = function() {
      // Populate the inputs!
      UICtrl.populateInputs();
      // Sending a message to the user!
      UICtrl.showAlert("No changes!", "alert alert-warning");
    }

    const btnDelete = function() {
      // Delete All items in the server!
      StorageServerCtrl.deleteData(".json");
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

  // // //The lines below was used only to check the graphic position for debugging
  // let canvas = document.getElementById("canvasWeight");
  // let ctx = canvas.getContext("2d");
  // // Mouse event click in canvas
  // document.querySelector("#canvasWeight").addEventListener("click", function(e) {
  //
  //   const rect = canvas.getBoundingClientRect();
  //   // const x = event.pageX - rect.left;
  //   // const y = event.pageY - rect.top;
  //   // let scaleX = canvas[0].width / rect.width;
  //   // let scaleY = canvas[0].height / rect.height;
  //
  //   const x = (event.pageX - rect.left);
  //   const y = (event.pageY - rect.top);
  //   console.log(`X position: ${x}, Y position: ${y}`);
  //   console.log(e);
  // });

  // check if the window has been resize
  document.getElementsByTagName("body")[0].onresize = function () {
    UICanvas.checkCanvas();
  };
}
