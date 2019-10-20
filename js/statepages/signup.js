"use strict";
///////////////////////////////////////////////////////////////////////////////
// Sign Up
///////////////////////////////////////////////////////////////////////////////
const signUp = function() {
  document.querySelector("#container").innerHTML = `
  <div class="container mt-5">
    <form>
      <h1 class="text-center display-4 text-info">Sign Up</h1>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        <small id="passwordHelp" class="form-text text-muted">The password should be at least 6 characters</small>
      </div>
      <!-- <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
      <button type="submit" class="btn btn-block btn-lg btn-info signUpBtn">Sign Up</button>
    </form>
  </div>
  `;
}

export default signUp;
