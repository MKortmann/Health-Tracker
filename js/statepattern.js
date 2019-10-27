"use strict"
// IMPORT COMPONENTS
import authImport from "../js/statepages/auth.js";
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
// Then for each state as (Overview, SignUp, BodyWeight, Blood Pressure, Blood Sugar, MyData)
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
    const currentElem = "." + currentState.__proto__.constructor.name;
    const newElem = "." + state.__proto__.constructor.name;
    // Update the active state of the nav element
    console.log(`CURRENT ELEMENT: ${currentElem}`);
    console.log(`NEW ELEMENT: ${newElem}`);
    document.querySelectorAll(currentElem).forEach((item) => {
      console.log(`REMOVING THE ACTIVE FROM ${item}`);
      item.classList.remove("active");
    });
    document.querySelectorAll(newElem).forEach((item) => {
      console.log(`ADDING THE ACTIVE FROM ${item}`);
      item.classList.add("active");
    });
    // update state
    currentState = state;
    // We need to reload the state as soon as the page reload!
    // EventListeners_Reload();
    animation();
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

          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleControls" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleControls" data-slide-to="1"></li>
              <li data-target="#carouselExampleControls" data-slide-to="2"></li>
              <li data-target="#carouselExampleControls" data-slide-to="3"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item  active">
                <div class="jumbotron w-100">
                  <h2 class="text-primary">Welcome to Health Tracker!</h2 >
                  <p class="lead">This app was done specially to help you to track and improve your health!</p>
                  <hr class="my-4">
                  <p>It is very important to check constantly our healthy. In this way, it is easier to detect any problem helping the doctors to make the correct diagnostic!  </p>
                  <!-- <p class="text-success"> Please visit regularly your doctor! </p> -->
                  <p class= "text-center">
                    <span class="text-success">&hearts;</span>
                      Thanks for using our app
                    <span class="text-success">&hearts;</span>
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <div class="jumbotron  w-100">
                  <h2 class="text-primary text-center mb-2">Body Weight</h2 >
                  <img src="imgs/bodyweight.jpg" class="mx-auto d-block w-50 bodyWeightImg" alt="bodyWeight">
                  <h3 class="text-center mt-2 carousel-caption text-secondary d-none d-lg-block"> easy way to track, analize and view your weight </h3>
                  <div class="text-center">
                    <button href="#" class="mt-3 btn btn-primary bodyWeight">Start Now</button>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="jumbotron w-100">
                  <h2 class="text-primary text-center mb-2">Blood Pressure</h2 >
                  <img src="imgs/bloodpressure.jpg" class="mx-auto d-block w-50 bodyPressureImg" alt="...">
                      <h3 class="text-center mt-2 carousel-caption text-secondary d-none d-lg-block"> be smart and check your blood pressure </h3>
                  <div class="text-center">
                    <a href="#" class="mt-3 btn btn-primary bloodPressure">Start Now</a>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="jumbotron w-100">
                  <h2 class="text-primary text-center mb-2">Blood Sugar</h2 >
                  <img src="imgs/bloodsugar.jpg" class="mx-auto d-block w-50 bloodySugarImg" alt="sugarImg">
                  <h3 class="text-center mt-2 carousel-caption text-secondary d-none d-lg-block"> be the boss and register your blood sugar  </h3>
                  <div class="text-center">
                    <a href="#" class="mt-3 btn btn-primary bloodSugar">Start Now</a>
                  </div>
                </div>
              </div>

            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
        </div>

          </div>
        </div>
      </div>
    </section>
  `;
}
///////////////////////////////////////////////////////////////////////////////
// Authenthicate
///////////////////////////////////////////////////////////////////////////////
const auth = authImport;
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

// function EventListeners_Reload () {
  // UI vars
  const overviewUI = document.querySelector(".homeState"),
    myDataUI = document.querySelector(".myData"),
    bodyWeightUI = document.querySelectorAll(".bodyWeight"),
    bloodPressureUI = document.querySelectorAll(".bloodPressure"),
    bloodSugarUI = document.querySelectorAll(".bloodSugar"),
    settingsUI = document.querySelector(".settings"),
    authUI = document.querySelector(".auth"),
    hamburgerMenu = document.querySelector(".hamburgerMenu");

  // EventListeners
  overviewUI.addEventListener("click", (e) => {
    page.change(new homeState);
    e.preventDefault();
  });
  myDataUI.addEventListener("click", (e) => {
    page.change(new myData);
    e.preventDefault();
  });

  bodyWeightUI.forEach(function(val) {
    val.addEventListener("click", (e) => {
      page.change(new bodyWeight);
      // load the bodyWeight.js! The file will be load dinamically!!!
      loadBodyWeight();
      e.preventDefault();
    });
  });

  bloodPressureUI.forEach( (item) => {
    item.addEventListener("click", (e) => {
      page.change(new bloodPressure);
      e.preventDefault();
    });
  });

  bloodSugarUI.forEach( (item) => {
    item.addEventListener("click", (e) => {
      page.change(new bloodSugar);
      e.preventDefault();
    });
  });

  settingsUI.addEventListener("click", (e) => {
    page.change(new mySettings);
    loadSettings();
    e.preventDefault();
  });

  authUI.addEventListener("click", (e) => {
    page.change(new auth);
    // call the function signUp at the file signup.js inside the folder statepages
    loadAuthLogic();
    e.preventDefault();
  })

  // // // Script for hamburger  -->
  function hamburgerMenuEventListener () {
    hamburgerMenu.addEventListener("click", () => {
      animation();
    })
  }
  function animation () {
    console.log(`[FUNCTION CALLED HERE!]`)
    document.querySelectorAll('.line').forEach( (item) => {
      item.classList.toggle("d-none");
    })
  }
  hamburgerMenuEventListener();


// };
// EventListeners_Reload();
