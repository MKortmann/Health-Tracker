"use strict"
// IMPORT COMPONENTS
import bodyWeightImport from "../js/statepages/bodyweight.js";
import bloodPressureImport from "../js/statepages/bloodpressure.js";
import bloodSugarImport from "../js/statepages/bloodsugar.js";
import myDataImport from "../js/statepages/mydata.js";
import mySettingsImport from "../js/statepages/settings.js";

// STATE PATTERN DESIGN IS BEEN USED TO CHANGE THE STATE OF THE PAGE!
// State Pattern is another behaviour type pattern. It reminder as Redux works.
// We have a state that we can change trough our script. So we do not have to
// fill the page with a lot of html files or code. We do all using javaScript

// We will create 01 function called PageState to track the state of the Page.
// Then for each state as (Overview, BodyWeight, Blood Pressure, Blood Sugar, MyData)
// we create one state for it.
///////////////////////////////////////////////////////////////////////////////
// Main Function PageState: track the page state
///////////////////////////////////////////////////////////////////////////////
const PageState = function() {
  let currentState = new homeState();

  this.init = function() {
    this.change(new homeState);
  }

  this.change = function(state) {
    // get the current and the future id of the nav element
    const currentId = currentState.__proto__.constructor.name;
    const newId = state.__proto__.constructor.name;
    // Update the active state of the nav element
    document.getElementById(currentId).classList.remove("active");
    document.getElementById(newId).classList.add("active");
    // update state
    currentState = state;
  }
  // return current state to be called outside
  this.returnState = function() {
    return currentState.__proto__.constructor.name;
  }

}
///////////////////////////////////////////////////////////////////////////////
// Home State
///////////////////////////////////////////////////////////////////////////////
const homeState = function() {
  document.querySelector("body").classList.add("backgroundBodyWeight");
  document.querySelector("#container").innerHTML = `
    <!-- sectionA first section -->
    <section class="sectionA">
      <div class="container p-0 ">
        <div class="card bg-dark mt-2" id="cardBackground">
          <!-- <img src="imgs/background6.png" id="background" class="img-fluid" alt="Responsive image"> -->
          <img src="imgs/background.jpg" class="img-fluid" id="backgroundOverview" alt="Background image">
          <!-- <img src="imgs/background10.jpg" id="background" class="img-fluid" alt="Responsive image"> -->
          <div class="card-img-overlay">
            <div class="jumbotron mt-sm-5">
              <h2 class=" text-info">Welcome to Health Tracker!</h2 >
              <p class="lead">This app was done specially to help you to track and improve your health!</p>
              <hr class="my-4">
              <p>It is very important to check constantly our healthy. In this way, it is easier to detect any problem helping the doctors to make the correct diagnostic!  </p>
              <p class="text-success"> Please visit regularly your doctor! </p>
              <p class= "text-info text-center">&hearts; Thanks for using our app &hearts; </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
///////////////////////////////////////////////////////////////////////////////
// myData
///////////////////////////////////////////////////////////////////////////////
const myData = myDataImport;

///////////////////////////////////////////////////////////////////////////////
// Body Weight
///////////////////////////////////////////////////////////////////////////////
const bodyWeight = bodyWeightImport;
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// Blood Pressure
///////////////////////////////////////////////////////////////////////////////
const bloodPressure = bloodPressureImport;
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// Blood Sugar
///////////////////////////////////////////////////////////////////////////////
const bloodSugar = bloodSugarImport;

///////////////////////////////////////////////////////////////////////////////
// Settings
///////////////////////////////////////////////////////////////////////////////
const mySettings = mySettingsImport;

// Instantiate PageState
const page = new PageState();

// UI vars
const overviewUI = document.getElementById("homeState"),
  myDataUI = document.getElementById("myData"),
  bodyWeightUI = document.getElementById("bodyWeight"),
  bloodPressureUI = document.getElementById("bloodPressure"),
  bloodSugarUI = document.getElementById("bloodSugar"),
  settingsUI = document.getElementById("settings");

// EventListeners
overviewUI.addEventListener("click", (e) => {
  page.change(new homeState);
  e.preventDefault();
});
myDataUI.addEventListener("click", (e) => {
  page.change(new myData);
  e.preventDefault();
});
bodyWeightUI.addEventListener("click", (e) => {
  page.change(new bodyWeight);
  // load the bodyWeight.js! The file will be load dinamically!!!
  loadBodyWeight();
  e.preventDefault();
});
bloodPressureUI.addEventListener("click", (e) => {
  page.change(new bloodPressure);
  e.preventDefault();
});
bloodSugarUI.addEventListener("click", (e) => {
  page.change(new bloodSugar);
  e.preventDefault();
});
settingsUI.addEventListener("click", (e) => {    
  page.change(new mySettings);
  settings();
  e.preventDefault();
});
