"use strict";
///////////////////////////////////////////////////////////////////////////////
// Sign Up
///////////////////////////////////////////////////////////////////////////////
const auth = function() {
  document.querySelector("#container").innerHTML = `
  <div class="inputSignUp mt-5">
    <!-- navs -->
    <ul class="nav nav-tabs mb-0 justify-content-center" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="signUpTab" data-toggle="pill" href="#signUp" role="tab" aria-controls="pills-home" aria-selected="true">Sign Up</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="signInTab" data-toggle="pill" href="#signIn" role="tab" aria-controls="pills-profile" aria-selected="false">Sign In</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="signOutTab" data-toggle="pill" href="#signOut" role="tab" aria-controls="pills-contact" aria-selected="false">Sign Out</a>
      </li>
    </ul>

    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="signUp" role="tabpanel" aria-labelledby="signUpTab">
        <!-- START SIGN UP -->
        <form class="mx-auto shadow-lg formSignUp" style="max-width: 800px;">
            <div class="container">
            <!-- <h1 class="text-center display-4 text-info">Sign Up</h1> -->
            <h5 class="ml-2 pt-2">Enter your data to register (Sign Up)!</h5>
            <small class="form-text text-muted mb-3 ml-2">We will never share your data.</small>
              <div class="form-group">
                  <label for="firstNameInput" class="firstNameLabel ml-1">First Name</label>
                  <input type="text" class="form-control firstNameInput" aria-describedby="firstNameInput" placeholder="Enter your first name">
                  <!-- <small id="emailHelp" class="form-text text-muted">Enter your first name</small> -->
              </div>
              <div class="form-group">
                  <label for="lastNameInput" class="lastNameLabel ml-1">Last Name</label>
                  <input type="text" class="form-control lastNameInput" aria-describedby="lastNameInput" placeholder="Enter your last name">
              </div>
              <div class="form-group">
                <label for="emailInput" class="emailLabel ml-1">Email address</label>
                <input type="email" class="form-control emailInput" aria-describedby="emailInput" placeholder="Enter your email">
                <!-- <small id="emailHelp" class="form-text text-muted">Enter your last email</small> -->
              </div>
              <div class="form-group">
                <label for="passwordInput" class="passwordLabel ml-1">Password</label>
                <input type="password" class="form-control passwordInput" placeholder="Password">
                <small id="passwordHelp" class="form-text text-muted">The password should be at least 6 characters</small>
              </div>
              <div class="form-group">
                <label for="passwordConfirmInput" class="passwordConfirmLabel ml-1">Confirm Password</label>
                <input type="password" class="form-control passwordConfirmInput" placeholder="Retype password">
                <!-- <small id="passwordHelp" class="form-text text-muted">Please, retype your password</small> -->
              </div>
            </div>
          <button type="submit" class="btn btn-block btn-lg btn-info signUpBtn">Sign Up</button>
        </form>
      </div> <!--FINISHED SIGN UP--------------------------------------------------------------->
      <div class="tab-pane fade" id="signIn" role="tabpanel" aria-labelledby="signInTab">
      <!--START SIGN IN-->
        <form class="mx-auto shadow-lg formSignIn" style="max-width: 800px;">
          <div class="container">
            <h5 class="pt-2">Click to Sign In</h5>
            <small id="emailHelp" class="form-text text-muted mb-1">Enter your data to sign in</small>
            <div class="form-group">
              <label for="emailInput" class="emailLabel">Email address</label>
              <input type="email" class="form-control emailInput" aria-describedby="emailInput" placeholder="Enter your email">
            </div>
            <div class="form-group">
              <label for="passwordInput" class="passwordLabel">Password</label>
              <input type="password" class="form-control passwordInput" placeholder="Password">
            </div>
          </div>
        <button type="submit" class="btn btn-block btn-lg btn-info signInBtn">Sign In</button>
        </form>
      </div> <!--FINISHED SIGN IN----------------------------------------------------------------->
      <!-- SignOut -->
      <div class="tab-pane fade" id="signOut" role="tabpanel" aria-labelledby="signOutTab">
        <!--START SIGN OUT-->
        <div>
          <form class="mx-auto shadow-lg formSignOut" style="max-width: 800px;">
              <!-- <div class="container"> -->
                <!-- <h1 class="text-center display-4 text-info">Sign Out</h1> -->
                <h5 class="ml-2 pt-2">Click to Sign Out</h5>
              <!-- </div> -->
            <!-- <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> -->
            <button type="submit" class="btn btn-block btn-lg btn-info signOutBtn">Sign Out</button>
          </form>
        </div>
      </div>
    </div>

  </div>
  <br><br>
  `;
}

export default auth;
