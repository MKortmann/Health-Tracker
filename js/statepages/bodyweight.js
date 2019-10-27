"use strict";
///////////////////////////////////////////////////////////////////////////////
// Body Weight
///////////////////////////////////////////////////////////////////////////////
const bodyWeight = function() {
  document.querySelector("#container").innerHTML = `
    <!-- SectionA: first display input data as start weight, actual weight... -->
  <div class="d-flex flex-column">
    <section class="sectionA order-1" >
      <div class="container-fluid mt-0 mb-0 mx-0 px-0">
        <form id="formOutput">
        <h2 class="display-4 text-center text-info">Highlights</h2>
          <p class="lead text-center inputHighlightMessage">
            Here, is where you <strong>view</strong> your data!
          </p>
          <div class="form-row justify-content-center" id="formInputs2">
            <!-- Start Weight -->
            <div class="col-md m-1">
              <label for="startWeight" class="text-info">Start Weight (kg)</label>
              <input type="number" disabled value="90" class="form-control" id="startWeight" placeholder="Start (kg)">
            </div>
            <!-- Actual Weight -->
            <div class="col-md m-1">
              <label for="actualweight" class="text-info">Actual Weight</label>
              <input type="number" disabled value="76" class="form-control" id="actualWeight" placeholder="Actual (kg)">
            </div>
            <!-- Diff Weight -->
            <div class="col-md m-1">
              <label for="diffWeight" class="text-info">Diff. Weight</label>
              <input type="number" disabled class="form-control" id="diffWeight" placeholder="Diff (kg)">
            </div>
            <!-- Actual BMI -->
            <div class="col-md m-1">
              <label for="actualBMI" class="text-info">Actual BMI</label>
              <input type="number" disabled class="form-control" id="actualBMI" placeholder="Actual BMI">
            </div>
          </div>
          <!-- AVERAGES -->
          <div class="form-row justify-content-center" id="formInputs2">
            <!-- Diff Weight -->
            <div class="col-md m-1">
              <label for="avgWeight" class="text-primary">Average Weight</label>
              <input type="number" disabled class="form-control" id="avgWeight" placeholder="Average Weight (kg)">
            </div>
            <!-- Actual BMI -->
            <div class="col-md m-1">
              <label for="avgBMI" class="text-primary">Average BMI</label>
              <input type="number" disabled class="form-control" id="avgBMI" placeholder="Average BMI">
            </div>
        </div>

        </form>
      </div>
    </section>

  <!-- Section B: Canvas buttons! -->
  <section class="sectionBCanvasButtons order-2">
    <div class="container containerGroup mt-0 text-center">
      <div class="btn-group mb-1 buttonGroup" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info" id="oneWeekBtn">1 Week</button>
        <button type="button" class="btn btn-info d-none d-md-block" id="twoWeeksBtn">2 Weeks</button>
        <button type="button" class="btn btn-info d-none d-md-block" id="oneMonthBtn">1 Month</button>
        <button type="button" class="btn btn-info d-none d-md-block" id="twoMonthsBtn">2 Months</button>
        <button type="button" class="btn btn-info d-none d-md-block" id="threeMonthsBtn">3 Months</button>
        <button type="button" class="btn btn-info d-none d-lg-block" id="sixMonthsBtn">6 Months</button>
        <button type="button" class="btn btn-info d-none d-lg-block" id="oneYearBtn">1 Year</button>
        <button type="button" class="btn btn-info" id="AllMeasureBtn">All</button>
        <button type="button" class="btn btn-secondary p-0" id="btnFlagZoomIn">
          <img src="./icons/zoom-in.svg" class="img-fluid" id="zoomInBtn"  ></img>
        </button>
        <button type="button" class="btn btn-secondary p-0" id="btnFlagZoomOut" disabled>
          <img src="./icons/zoom-out.svg" class="img-fluid" id="zoomOutBtn" ></img>
        </button>
      </div>
    </div>
  </section>

  <section class="sectionCCanvas order-3">
    <div class="d-flex justify-content-center">
    <!-- As soon as defined the height and width the image become sharp width="1880px"-->
      <canvas id="canvasWeight" height="400px" width="1920px"></canvas>
    </div>
    <span class="containerToAddAlertMsg"></span>
  </section>

<!-- SECTION D encloses the input and button forms -->
<section class="sectionDInputFormButtons mt-4 order-0">
  <div class="container-fluid p-0" >
    <form id="formInput" >
      <h2 class="display-4 text-center text-primary">Input Field</h2>
      <p class="lead text-center inputDataMessage">
        Please, <strong>insert</strong> your data!
      </p>
      <!-- first row -->
      <div class="form-row p-4 m-0 justify-content-center" id="containerInputToHighlight">
        <div class="col-sm-3 order-2">
          <label for="height">Height</label>
          <input id="height" type="number" value="178" min="30" max="259" class="form-control" placeholder="height (cm)">
        </div>
        <div class="col-sm-3 order-3">
          <label for="weight ">Weight</label>
          <input id="weight" type="number" value="80" min="30" max="199" step="0.1" class="form-control" placeholder="Weight - kg">
        </div>
        <div class="col-sm-3 order-1">
          <label for="time">Time</label>
          <input id="time" type="time" class="form-control"  placeholder="time">
        </div>
        <div class="col-sm-3 order-0">
          <label for="date">Date</label>
          <input id="date" type="date" class="form-control"  placeholder="data">
        </div>
      </div>
      <!-- second row -->
      <div class="form-row">
        <div class="col">
          <!-- <label for="submit">Submit</label> -->
          <!-- FEEDBACK -->
          <span class="containerToAddAlertMsg"></span>
          <button id="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
        </div>
      </div>
      <!-- third row -->
        <!-- <div class="form-row">
          <div class="col">
            <btn type="button" id="editBtn" class="btn btn-outline-primary btn-lg col-sm">Edit</btn>
            <btn type="button" id="backBtn" class="btn btn-outline-info btn-lg col-sm">Back</btn>
            <btn type="button" id="deleteBtn" class="btn btn-outline-danger btn-lg col-sm">Delete
            </btn>
          </div> -->
    </form>
  </div>
</section>

<!-- It encloses the drawer below submit and above the table -->
<section class="sectionEDrawer order-4 mt-2">
  <!-- CONTENT OF THE HAMBURGER: this content will be pop-up DOWN -->
  <!-- Delete All - Download/Save JSON -->
  <!-- UNCOLLAPSED STATE ENCLOSES BUTTONS AS DELETE ALL; ABOUT BMI; SAVE; LOAD -->
  <div class="collapse" id="navbarToggleExternalContent">
    <div class="bg-dark p-4">
      <h5 class="text-white h4">Extra functions</h5>
      <span class="text-light lead"><p><strong>Save:</strong> it will download a JSON (kind of table) file with your information that you can open it in any text editor.</p>
      <p>If you have any issues to print your data in your phone, please, switch your browser to <strong>desktop mode</strong>!</p>
      <div class="d-none d-md-block">
        <strong>Load:</strong> this function is available in PC, MAC or Linux not in smartphones or tablets. It will load your json file (that should be named: table.json) and placed at Health-Tracker storage folder. For
        that you have to download the program to your computer and follow the instructions in my gitHub page!
      </div>
      <a class="text-info" href="https://github.com/MKortmann/Health-Tracker"><strong>Health Tracker</strong></a>!
      </span>
        <!-- Button trigger modal: BMI -->
      <button type="button" id="bmiInfoBtn" class="btn btn-primary btn-block btn-lg my-2" data-toggle="modal" data-target="#locModal2">
      About BMI </button>
      <button type="button" id="deleteAllAskBtn" class="btn btn-danger btn-block my-2 btn-lg " data-toggle="modal" data-target="#locModal">
      Delete All Items
      </button>
      <button type="button" id="saveBtn" class="btn btn-info btn-block my-2 btn-lg">Save </btn>
      <button type="button" id="loadJSONBtn" class="btn btn-warning btn-block my-2 btn-lg">Load File </button>
      <button type="button" id="printBtn" class="btn btn-warning btn-block my-2 btn-lg">Print</button>
    </div>
  </div>

  <!-- HAMBURGER TO OPEN THE NAVBAR DOWN (COLLAPSED STATE) -->
  <nav class="navbar navbar-dark bg-dark mt-3">
    <button id="hamburgerDown" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="lineDown"></span>
    <span class="lineDown"></span>
    <span class="lineDown" style="margin-bottom: 0;"></span>
    </button>

    <!-- <button id="hamburgerDown" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="lineDown"></span>
      <span class="lineD crossPos d-none"></span>
      <span class="lineD crossNeg d-none"></span>
      <span class="lineD"></span>
      <span class="lineD" style="margin-bottom: 0;"></span>
    </button> -->
  </nav>
<!-- CLOSE THE DRAWER -->
</section>

<!-- Section F represents the table! -->
  <section class="sectionFTable order-5">
    <!-- TABLE -->
    <!-- style="overflow-y: scroll; height: 200px" -->
    <div class="container-fluid p-0" id="tableContainer" style="overflow-y: scroll; height: 500px">
      <table class="table table-borderless  table-dark">
        <thead>
          <tr>
            <th scope="col" class="align-middle">#</th>
            <th scope="col" class="align-middle">
            <!-- DROPDOWN MENU  -->
              <div class="dropdown d-sm-none p-0 ml-0">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Date
                </button>
                <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                  <a id="dropDownDate" class="dropdown-item" href="#">Date</a>
                  <a id="dropDownTime" class="dropdown-item" href="#">Time</a>
                  <a id="dropDownBMI"class="dropdown-item d-sm-none " href="#">BMI</a>
                </div>
              </div>
            <!-- span -->
              <span class="d-none d-sm-block">Date</span>
            </th>
            <th scope="col" class="align-middle d-none d-sm-block">
              Time
            </th>
            <th scope="col" class="align-middle">Weight</th>
            <th scope="col" class="align-middle d-none d-sm-table-cell">BMI</th>
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
  </section>
  <br>

<!-- HERE ARE THE MODALS AND FUNCTIONS USED IN THIS PAGE: THEY ARE PLACED AT THE END BECAUSE THEY DO NOT BELONGS TO THE DOCUMENT FLOW READING! -->
<!-- Modal Dialog: TO CONFIRM DELETE -->
  <div class="modal fade" id="locModal" tabindex="-1" role="dialog" aria-labelledby="locModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete All Items</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure that you want to delete all the items?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary bt-lg" data-dismiss="modal">Back</button>
          <button type="button" id="deleteAllBtn" class="btn btn-danger bt-lg" data-dismiss="modal">Delete All Items</button>
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
        </figure>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary bt-lg" data-dismiss="modal">Close</button>
          <btn onclick="window.open('https://en.wikipedia.org/wiki/Body_mass_index')" class="btn btn-secondary bt-lg" data-dismiss="modal">More Info</btn>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Dialog 3: TO EDIT, DELETE OR BACK -->
    <div class="modal fade" id="locModal3" tabindex="-1" role="dialog" aria-labelledby="locModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Dialog</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="lead">You can edit, delete or return!</p>
            <!-- first row -->
            <div class="form-row p-4 m-0 justify-content-center" id="containerInputToHighlight">
              <div class="col-sm-6 order-2 mt-1">
                <label for="heightEdit">Height</label>
                <input id="heightEdit" type="number" value="178" min="30" max="259" class="form-control">
              </div>
              <div class="col-sm-6 order-3 mt-1">
                <label for="weightEdit">Weight</label>
                <input id="weightEdit" type="number" value="80" min="30" max="199" step="0.1" class="form-control" >
              </div>
              <div class="col-sm-6 order-1 mt-1">
                <label for="timeEdit">Time</label>
                <input type="time" class="form-control" placeholder="data" id="timeEdit">
              </div>
              <div class="col-sm-6 order-0 mt-1">
                <label for="dateEdit">Date</label>
                <input type="date" class="form-control" placeholder="data" id="dateEdit">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!-- third row -->
              <div class="form-row">
                <div class="col">
                  <button type="button" id="editBtn" class="btn btn-primary btn-lg" data-dismiss="modal">Edit</button>
                  <button type="button" id="backBtn" class="btn btn-info btn-lg mx-2" data-dismiss="modal">Back</btn>
                  <button type="button" id="deleteBtn" class="btn btn-danger btn-lg mx-1" data-dismiss="modal">Delete
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div> <!--FINISH FLEX CONTAINER-->
  `;


}

export default bodyWeight;
