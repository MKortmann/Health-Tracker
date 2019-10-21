"use strict";
///////////////////////////////////////////////////////////////////////////////
// Sign Up
///////////////////////////////////////////////////////////////////////////////
const signUp = function() {
  document.querySelector("#container").innerHTML = `
  <div class="inputSignUp mt-5">
    <form class="mx-auto shadow-lg" style="max-width: 800px;">
        <div class="container">
        <h1 class="text-center display-4 text-info">Sign Up</h1>
        <h5 class="ml-2">Enter your data to sign up!</h5>
        <small class="form-text text-muted mb-3 ml-2">We will never share your data.</small>
          <div class="form-group">
              <label for="firstNameInput" class="firstNameLabel ml-1">First Name</label>
              <input type="text" class="form-control firstNameInput" aria-describedby="firstNameInput" placeholder="Enter your first name">
              <!-- <small id="emailHelp" class="form-text text-muted">Enter your first name</small> -->
          </div>
          <div class="form-group">
              <label for="lastNameInput" class="lastNameLabel ml-1">Last Name</label>
              <input type="text" class="form-control lastNameInput" aria-describedby="lastNameInput" placeholder="Enter your last name">
              <!-- <small id="emailHelp" class="form-text text-muted">Enter your last name</small> -->
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
      <!-- <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
      <button type="submit" class="btn btn-block btn-lg btn-info signUpBtn">Sign Up</button>
    </form>
  </div>
  <br><br>
  `;
}

export default signUp;
