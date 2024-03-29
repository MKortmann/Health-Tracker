"use strict";
///////////////////////////////////////////////////////////////////////////////
// myData
///////////////////////////////////////////////////////////////////////////////
const settings = function() {
  document.querySelector("#container").innerHTML = `
    <!-- sectionA: first section -->
    <div class="d-flex flex-column">
      <section class="sectionA">
        <div class="jumbotron jumbotron-fluid bg-info mt-1 text-light text-center p-0" id="backgroundJumbotron">
        <h2 class="display-4 text-center mt-5">View Settings</h2>
        </div>
        <div class="container text-center mt-5 text-info">
        <div class="alert alert-info">
          <p class="lead">Change the text size</p>
          <p class="lead">Actual View: <span id="actualView"></span></p>
        </div>
          <div class="row">
          <button class="btn btn-lg btn-primary m-1 col-md" id="bigView">Big View</button>
          <button class="btn btn-lg btn-info m-1 col-md" id="normalView">Normal View</button>
          <button class="btn btn-lg btn-danger m-1 col-md" id="smallView">Small View</button>
          </div>
        </div>
      </section>
    </div>
    <br><br><br>
  `;
}

export default settings;
