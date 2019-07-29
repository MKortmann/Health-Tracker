"use strict"
// STATE PATTERN DESIGN IS BEEN USED TO CHANGE THE STATE OF THE PAGE!
// State Pattern is another behaviour type pattern. It reminder as Redux works.
// We have a state that we can change trough our script. So we do not have to
// fill the page with a lot of html files or code. We do all using javaScript

// We will create 01 function called PageState to track the state of the Page.
// Then for each state as (Overview, MyData, BodyWeight, Blood Pressure and Blood Sugar)
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
        <div class="col-3">
          <label for="height">Height</label>
          <input type="number" class="form-control" id="height" placeholder="height (cm)">
        </div>
        <div class="col-3">
          <label for="startWeight">Start Weight</label>
          <input type="number" class="form-control" id="startWeight" placeholder="Start (Kg)">
        </div>
        <div class="col-3">
          <label for="actualweight">Actual Weight (Kg)</label>
          <input type="number" class="form-control" id="actualweight" placeholder="Actual (Kg)">
        </div>
        <div class="col-3">
          <label for="diffWeight">Diff. Weight (Kg)</label>
          <input type="number" class="form-control" id="diffWeight" placeholder="Diff (Kg)">
        </div>
      </div>
    </form>

    <div class="container justify-content-right mt-2">
      <canvas id="canvasWeight"></canvas>
    </div>

    <form>
      <div class="form-row p-4 justify-content-center">
        <div class="col-3">
          <label for="weight">Weight</label>
          <input type="number" class="form-control" id="weight" placeholder="Weight - Kg">
        </div>
        <div class="col-4">
          <label for="date">Data</label>
          <input type="date" class="form-control" id="date" placeholder="data">
        </div>
        <div class="col-2">
          <submit id="submit" class="btn btn-primary btn-lg my-4">Submit</submit>
        </div>
      </div>
    </form>

  <table class="table table-striped table-bordered table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Data</th>
        <th scope="col">Weight (Kg)</th>
        <th scope="col">BMI</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>29.07.2019</td>
        <td>83 kg</td>
        <td>20</td>
      </tr>
    </tbody>
  </table>

  <!-- Add tht js file -->
  <script src="./js/bodyWeight.js"></script>
`;
}
///////////////////////////////////////////////////////////////////////////////
// Instantiate PageState
const page = new PageState();

// UI vars
const overviewUI = document.getElementById("homeState"),
      myDataUI = document.getElementById("myData"),
      bodyWeightUI = document.getElementById("bodyWeight");

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
