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

  <h2>We are at homeState</h2>

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
    <form>
      <div class="form-row p-2 justify-content-center">
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

    <div class="container mt-2 text-center">
    <div class="btn-group mb-1" role="group" aria-label="Basic example">
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
      <div class="form-row p-4 justify-content-center">
        <div class="col-3">
          <label for="weight">Weight</label>
          <input type="number" value="80" min="30" max="230" class="form-control my-1" id="weight" placeholder="Weight - kg">
        </div>
        <div class="col-3">
          <label for="date">Date</label>
          <input type="date" class="form-control my-1" id="date" placeholder="data">
        </div>
        <div class="col-4">
          <!-- <label for="submit">Submit</label> -->
          <submit id="submit" class="btn btn-primary btn-lg my-5 mx-0">Submit</submit>
          <btn id="editBtn" class="btn btn-outline-primary btn-lg my-5 mx-0 ">Edit</btn>
          <btn id="backBtn" class="btn btn-outline-info btn-lg my-5 mx-0">Back</btn>
          <btn id="deleteBtn" class="btn btn-outline-danger btn-lg my-5 mx-0">Delete</btn>
        </div>
        </div>
      </div>
    </form>

  <table class="table table-striped  table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Data</th>
        <th scope="col">Weight (kg)</th>
        <th scope="col">BMI (kg/m&sup2;)</th>
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
