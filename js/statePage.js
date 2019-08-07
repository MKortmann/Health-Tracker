"use strict"
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
  document.querySelector("#container").innerHTML = `
  <div class="container">

    <div class="jumbotron mt-2">
    <h1 class="display-4 text-info">Welcome to Health Tracker!</h1>
    <p class="lead">This app was done specially to help you to track and improve your health!!!</p>
    <hr class="my-4">
    <p>It is very important to check constantly our healthy. In this way, it is easier to detect any problem helping the doctors to make the correct diagnostic!  </p>
    <!-- <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a> -->
    </div>
  </div>

  `;
}
///////////////////////////////////////////////////////////////////////////////
// myData
///////////////////////////////////////////////////////////////////////////////
const myData = function() {
  document.querySelector("#container").innerHTML = `

  <h2>We are at myData</h2>

  `;
}
///////////////////////////////////////////////////////////////////////////////
// Body Weight
///////////////////////////////////////////////////////////////////////////////
const bodyWeight = function() {
  document.querySelector("#container").innerHTML = `
  <div class="container">
    <form id="formInputs1">
      <div class="form-row p-2 justify-content-center" id="formInputs2">
        <div class="col-2">
          <label for="height">Height (cm)</label>
          <input type="number" value="178" class="form-control" id="height" placeholder="height (cm)">
        </div>
        <div class="col-2">
          <label for="startWeight" class="text-info">Start Weight (kg)</label>
          <input type="number" value="90" class="form-control" id="startWeight" placeholder="Start (kg)">
        </div>
        <div class="col-2">
          <label for="actualweight" class="text-info">Actual Weight (kg)</label>
          <input type="number" disabled value="76" class="form-control" id="actualWeight" placeholder="Actual (kg)">
        </div>
        <div class="col-2">
          <label for="diffWeight" class="text-info">Diff. Weight (kg)</label>
          <input type="number" disabled class="form-control" id="diffWeight" placeholder="Diff (kg)">
        </div>
        <div class="col-2">
          <label for="actualBMI" class="text-primary">Actual BMI</label>
          <input type="number" disabled class="form-control" id="actualBMI" placeholder="Actual BMI">
        </div>
      </div>
    </form>

    <div class="containerGroup mt-2 text-center">
    <div class="btn-group mb-1 buttonGroup" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" id="oneWeekBtn">1 Week</button>
      <button type="button" class="btn btn-secondary" id="twoWeeksBtn">2 Weeks</button>
      <button type="button" class="btn btn-secondary" id="oneMonthBtn">1 Month</button>
      <button type="button" class="btn btn-secondary" id="twoMonthsBtn">2 Months</button>
      <button type="button" class="btn btn-secondary" id="threeMonthsBtn">3 Months</button>
      <button type="button" class="btn btn-secondary" id="sixMonthsBtn">6 Months</button>
      <button type="button" class="btn btn-secondary" id="oneYearBtn">1 Year</button>
      <button type="button" class="btn btn-secondary" id="AllMeasureBtn">All</button>
    </div>
    <!-- As soon as defined the height and width the image become sharp -->
      <canvas id="canvasWeight" height="200px" width="900px"></canvas>
    </div>

    <form>
      <div class="form-row p-4 justify-content-center d-flex align-items-end">
        <div class="col-3">
          <label for="weight">Weight</label>
          <input type="number" value="80" min="30" max="230" class="form-control my-1" id="weight" placeholder="Weight - kg">
        </div>
        <div class="col-3">
          <label for="date">Date</label>
          <input type="date" class="form-control my-1" id="date" placeholder="data">
        </div>
        <div class="col-4 d-flex align-items-end">
          <!-- <label for="submit">Submit</label> -->
          <div class="btn-group d-flex align-items-end" role="group" aria-label="Button group with nested dropdown">
            <submit id="submit" class="btn btn-primary btn-lg">Submit</submit>
            <btn type="button" id="editBtn" class="btn btn-outline-primary btn-lg">Edit</btn>
            <btn type="button" id="backBtn" class="btn btn-outline-info btn-lg">Back</btn>
            <btn type="button" id="deleteBtn" class="btn btn-outline-danger btn-lg">Delete</btn>
            <!-- Button trigger modal -->
            <btn type="button" id="deleteAllAskBtn" class="btn btn-outline-danger btn-lg" data-toggle="modal" data-target="#locModal">
              Delete All Items
            </btn>
          </div>
        </div>
        </div>
      </div>
    </form>



<!-- Modal -->
<div class="modal fade" id="locModal" tabindex="-1" role="dialog" aria-labelledby="locModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-body">
    <p>Are you sure that you want to delete all the items?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary bt-lg" data-dismiss="modal">Back</button>
      <btn type="button" id="deleteAllBtn" class="btn btn-outline-danger bt-lg" data-dismiss="modal">Delete All Items</btn>
    </div>
  </div>
</div>
</div>

<!-- Modal 2: BMI INFO -->
<div class="modal fade" id="locModal2" tabindex="-1" role="dialog" aria-labelledby="locModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-body text-center">
    <p class="display-5">Body mass index (BMI)</p>
    </div>
    <div class="text-center">
    <small class="text-muted">The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m&sup2;.</small>
    </div>

    <figure class="figure">
      <img src="./imgs/bmi.png" class="figure-img img-fluid rounded" alt="BMI-Graph">
      <!-- <figcaption class="figure-caption text-center">Body mass index (BMI)</figcaption> -->
    </figure>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary bt-lg" data-dismiss="modal">Close</button>
      <btn onclick="window.open('https://en.wikipedia.org/wiki/Body_mass_index')" class="btn btn-secondary bt-lg" data-dismiss="modal">More Info</btn>
      <!-- <btn onclick="window.location.href = 'https://en.wikipedia.org/wiki/Body_mass_index';" class="btn btn-secondary bt-lg" data-dismiss="modal">More Info</btn> -->
    </div>
  </div>
</div>
</div>

  <table class="table table-striped  table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Data</th>
        <th scope="col">Weight (kg)</th>
        <th scope="col">BMI (kg/m&sup2;)
        <!-- Button trigger modal -->
        <btn type="button" id="bmiInfoBtn" class="btn btn-outline-danger btn-lg float-right" data-toggle="modal" data-target="#locModal2">
          About BMI
        </btn>
        </th>
        <!-- <th scope="col">Edit</th> -->
      </tr>
    </thead>
    <tbody>
      <!-- <tr>
        <th scope="row">1</th>
        <td>29.07.2019</td>
        <td>83 kg</td>
        <td>20</td>
      </tr> -->
    </tbody>
  </table>
  </div>

  <!-- Add tht js file -->
  <script src="./js/bodyWeight.js"></script>
`;
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Blood Pressure
///////////////////////////////////////////////////////////////////////////////
const bloodPressure = function() {
  document.querySelector("#container").innerHTML = `

  <h2>We are at bloodPressure</h2>

  `;
}
///////////////////////////////////////////////////////////////////////////////
// Blood Sugar
///////////////////////////////////////////////////////////////////////////////
const bloodSugar = function() {
  document.querySelector("#container").innerHTML = `

  <h2>We are at blood Sugar</h2>

  `;
}
// Instantiate PageState
const page = new PageState();

// UI vars
const overviewUI = document.getElementById("homeState"),
  myDataUI = document.getElementById("myData"),
  bodyWeightUI = document.getElementById("bodyWeight"),
  bloodPressureUI = document.getElementById("bloodPressure"),
  bloodSugarUI = document.getElementById("bloodSugar");

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
