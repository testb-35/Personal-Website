const firebaseConfig = {
    apiKey: "AIzaSyA_LdzCOcwHaMuhTk4G_7vv3i3x0wOXKaw",
    authDomain: "personalwebsite-38d63.firebaseapp.com",
    databaseURL: "https://personalwebsite-38d63.firebaseio.com",
    projectId: "personalwebsite-38d63",
    storageBucket: "personalwebsite-38d63.appspot.com",
    messagingSenderId: "982231030814",
    appId: "1:982231030814:web:3fddb8d4b16b31179de20f",
    measurementId: "G-12K9G01BBY"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const analytics = firebase.analytics();

const loginEmailInputFieldRef = document.getElementById("loginEmailInputField");
const loginPasswordInputFieldRef = document.getElementById("loginPasswordInputField");
const loginButtonRef = document.getElementById("loginButton");

loginButtonRef.addEventListener("click", function(e) {
    const email = loginEmailInputFieldRef.value;
    const password = loginPasswordInputFieldRef.value;

    auth.signInWithEmailAndPassword(email,password).
    then(function() {
        swal("Redirecting in 3 seconds!", "You logged in successfully!", "success");

        var count = 3;
        setInterval(function(){
            count--;
            if (count == 0) {
                window.location.replace("../");
            }
        }, 1000);

    }).catch(function(error) {
        swal("Error!",error.message,"error");
    });

    loginEmailInputFieldRef.value = "";
    loginPasswordInputFieldRef.value = "";
});

