const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
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

