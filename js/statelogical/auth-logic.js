"use strict"
/*
 * We are using here the MVO: Model View Octopus or MVC, MVVM, MVP and so on.
 * Additionally: we build it using the JavaScript Pattern: Module Revealing Pattern!
 * Why? I think it is a great way to organize the code that brings a lot of benefits!
 */
// Basic sctructure: BLUE PRINT of Module Revealing Pattern!
// See, that these are immediately-invoked function expression or IIFE (pronounced iffy).
// The syntax might seem a bit odd, but all we're doing is wrapping a function in parentheses,
// then adding a pair of parentheses at the end of that to invoke it!
// The Revealing Module Pattern
// The underlying philosophy of the Revealing Module Pattern is that, while we still maintain encapsulation (as in the Module Pattern), we also reveal certain properties (and methods). The key ingredients to the Revealing Module Pattern are:
//
// 1) An IIFE (wrapper)
// 2) The module content (variables, methods, objects, etc.)
// 3) A returned object literal

// (function() {
//   // Declare private vars and functions
//
//   return {
//     // Declare public var and functions
//   }
//
// })();

// THIS IS THE MAIN MODULE: loadBodyWeight THAT WILL BE DINAMICALLY LOAD!
// We will have five mains object: the model object is represented by the StorageCtrl, the
// octopus divided into two: the ItemCtrl and the AppCtrl. The Item Ctrl is responsible
// to control each item, the AppCtrl controls the App (eventlisteners and so on) and
// the last is the view Model that will be diveded into:  UICtrl responsible to control the user interface and the UICanvas responsible to control the canvas!
// Anonymous "self-invoking" function


// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("user logged in: ", user);
    // document.querySelector(".bodyWeight").classList.remove("d-none");
    document.querySelector(".bloodPressure").classList.remove("d-none");
    document.querySelector(".bloodSugar").classList.remove("d-none");
    document.querySelector(".myData").classList.remove("d-none");
    // document.querySelector(".settings").classList.remove("d-none");
  } else {
    console.log("user logged out");
    // document.querySelector(".bodyWeight").classList.add("d-none");
    document.querySelector(".bloodPressure").classList.add("d-none");
    document.querySelector(".bloodSugar").classList.add("d-none");
    document.querySelector(".myData").classList.add("d-none");
    // document.querySelector(".settings").classList.add("d-none");
  }
});

// get data
db.collection("bodyWeight").get().then(snapshot => {
  console.log(snapshot.docs);
  snapshot.docs.forEach(doc => {
    console.log(doc.data());

  })
})

function loadAuthLogic() {

  // document.querySelector(".signUp").addEventListener("click", (e) => {
  //   debugger
  //   e.preventDefault();
  //   alert("clicked!");
  // });
  const StorageServerCtrl = (function() {
    // Declare private vars and functions
    let currentItem = null;

    return {
      // Get Item ID from Firebase
      getIDFromServer: function() {

      },
    }
  })();

  /*
 * VIEW MODEL: UICtrl and UICanvas
 */
  // UICtrl
  const UICtrl = (function() {
    // Declare private vars and functions
    let currentItem = null;

    const UISelectors = {
      formSignUp: ".formSignUp",
      formSignOut: ".formSignOut",
      signUpBtn: ".signUpBtn",
      signInBtn: ".signInBtn",
      signOutBtn: ".signOutBtn",
      firstNameInput: ".firstNameInput",
      firstNameLabel: ".firstNameLabel",
      lastNameInput: ".lastNameInput",
      lastNameLabel: ".lastNameLabel",
      emailInput: ".emailInput",
      emailLabel: ".emailLabel",
      passwordInput: ".passwordInput",
      passwordLabel: ".passwordLabel",
      passwordConfirmInput: ".passwordConfirmInput",
      passwordConfirmLabel: ".passwordConfirmLabel"
    }

    return {
      // Declare public var and functions
// return the UI Selectors
      getSelectors: function() {
        return UISelectors;
      },

    }
  })();

  const AppCtrl = (function(StorageServerCtrl, UICtrl) {
    // Declare private vars and functions
    let currentItem = null;

    // Variables
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // load event listeners
    const loadEventListeners = function() {
    // Add EventListeners for buttons
    document.querySelector(UISelectors.signUpBtn).addEventListener("click", signUpBtn);
    document.querySelector(UISelectors.signInBtn).addEventListener("click", signInBtn);
    document.querySelector(UISelectors.signOutBtn).addEventListener("click", signOutBtn);
    document.querySelector(UISelectors.firstNameInput).addEventListener("focus", firstName);
    document.querySelector(UISelectors.firstNameInput).addEventListener("focusout", focusOut);
    document.querySelector(UISelectors.lastNameInput).addEventListener("focus", lastName);
    document.querySelector(UISelectors.lastNameInput).addEventListener("focusout", focusOut);
    // document.querySelector(UISelectors.emailInput).addEventListener("focus", emailInput);
    document.querySelectorAll(UISelectors.emailInput).forEach( (item) => {
      item.addEventListener("focus", emailInput);
      item.addEventListener("focusout", focusOut);
    });
    // document.querySelector(UISelectors.passwordInput).addEventListener("focus", passwordInput);
    document.querySelectorAll(UISelectors.passwordInput).forEach( (item) => {
      item.addEventListener("focus", passwordInput);
      item.addEventListener("focusout", focusOut);
    });
    document.querySelector(UISelectors.passwordConfirmInput).addEventListener("focus", passwordConfirmInput);
    document.querySelector(UISelectors.passwordConfirmInput).addEventListener("focusout", focusOut);
    };


    // LISTEN FOR AUTH STATUS CHANGES
    // const trackStatusUser = () => {
    //   alert("function loaded");
    //
    // };

    const firstName = function() {
      activateDeactivateLabel("firstNameLabel");
    }
    const focusOut = function() {
      activateDeactivateLabel("all black");
    }
    const lastName = function() {
      activateDeactivateLabel("lastNameLabel");
    }
    const emailInput = function() {
      activateDeactivateLabel("emailLabel");
    }
    const passwordInput = function() {
      activateDeactivateLabel("passwordLabel");
    }
    const passwordConfirmInput = function() {
      activateDeactivateLabel("passwordConfirmLabel");
    }

    const activateDeactivateLabel = (label) => {
      document.querySelector(UISelectors.firstNameLabel).style.color = (label === "firstNameLabel" ? "red" : "black");
      document.querySelector(UISelectors.lastNameLabel).style.color = (label === "lastNameLabel" ? "red" : "black");
      document.querySelectorAll(UISelectors.emailLabel).forEach((item) => {
        item.style.color = (label === "emailLabel" ? "red" : "black");
      });
      document.querySelectorAll(UISelectors.passwordLabel).forEach((item) => {
        item.style.color = (label === "passwordLabel" ? "red" : "black");
      });
      document.querySelector(UISelectors.passwordConfirmLabel).style.color = (label === "passwordConfirmLabel" ? "red" : "black");
    }

    const clearAllInputs = () => {
      document.querySelector(UISelectors.firstNameInput).value = "";
      document.querySelector(UISelectors.lastNameInput).value = "";
      document.querySelectorAll(UISelectors.emailInput).forEach((item) => {
        item.value = "";
      });
      document.querySelectorAll(UISelectors.passwordInput).forEach((item) => {
        item.value = "";
      });
      document.querySelector(UISelectors.passwordConfirmInput).value = "";
    }

    const signUpBtn = function(e) {
      e.preventDefault();
      const email = document.querySelector(UISelectors.emailInput).value;
      const password = document.querySelector(UISelectors.passwordInput).value;
      // sign up the user
      auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
        clearAllInputs();
        // close the page
        // Simulate a mouse click:
        // window.location.href = "http://www.w3schools.com";
        // document.querySelector(UISelectors.formSignUp).classList.add("d-none");
        // document.querySelector(UISelectors.formSignOut).classList.remove("d-none");
        // document.querySelector(".auth").textContent = "Sign Out";
        // alert("You are Signed Up");
      });
    };

    const signInBtn = function(e) {
      e.preventDefault();

      let email = null;
      // get the user information
      document.querySelectorAll(UISelectors.emailInput).forEach((item, index) => {
        index === 1 ? email = item.value : email = null
      });
      let password = null;
      document.querySelectorAll(UISelectors.passwordInput).forEach((item, index) => {
        index === 1 ? password = item.value : password = null
      });
      console.log(email, password);

      auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        // alert("You Clicked at Sign In");
        clearAllInputs();
      });
    }

    const signOutBtn = function(e)  {
      e.preventDefault();
      auth.signOut().then( ( ) => {
        console.log("User Signed Out");
        // document.querySelector(UISelectors.formSignUp).classList.remove("d-none");
        // document.querySelector(UISelectors.formSignOut).classList.add("d-none");
        // document.querySelector(".auth").textContent = "Sign Up";
        // alert("You are Signed Out");
      })
    }

    return {
      // Get Item ID from Firebase
      init: () => {
        loadEventListeners();
      }
    }
  })(StorageServerCtrl, UICtrl);

  AppCtrl.init();

}
