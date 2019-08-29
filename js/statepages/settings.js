"use strict";
///////////////////////////////////////////////////////////////////////////////
// myData
///////////////////////////////////////////////////////////////////////////////
const settings = function() {
  document.querySelector("#container").innerHTML = `
    <!-- sectionA: first section -->
    <div class="d-flex flex-column">
      <section class="sectionA">
        <h2 class="display-5 text-center mt-5 text-info">View Settings</h2>
        <div class="container text-center mt-5 text-info">
          <div class="row">
          <button class="btn btn-lg btn-primary m-1 col-md" id="bigView">Big View</button>
          <button class="btn btn-lg btn-info m-1 col-md" id="normalView">Normal View</button>
          <button class="btn btn-lg btn-danger m-1 col-md" id="smallView">Small View</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

export default settings;
