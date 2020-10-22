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
const storage = firebase.storage();
const storageRef = storage.ref();

const registerUsernameInputFieldRef = document.getElementById("registerUsernameInputField");
const registerEmailInputFieldRef = document.getElementById("registerEmailInputField");
const registerPasswordInputFieldRef = document.getElementById("registerPasswordInputField");
const registerProfilePhotoFormControlFileInputFieldRef = document.getElementById("registerProfilePhotoFormControlFileInputField");
const registerButtonRef = document.getElementById("registerButton");

registerButtonRef.addEventListener("click", function(e) {
    const email = registerEmailInputFieldRef.value;
    const password = registerPasswordInputFieldRef.value;
    const username = registerUsernameInputFieldRef.value;
    const profile_photo = registerProfilePhotoFormControlFileInputFieldRef.files[0];

    auth.createUserWithEmailAndPassword(email, password).then(function (){
        swal("Redirecting in 3 seconds!", "You signed up successfully!", "success");

        storageRef.child(email + "/profilePhoto/" + profile_photo.name).put(profile_photo);
        auth.currentUser.sendEmailVerification();
        auth.currentUser.updateProfile({displayName: username});

        var count = 3;
        setInterval(function(){
            count--;
            if (count == 0) {
                window.location.replace("../");
            }
        }, 1000);
    }).catch(function(err){
        swal("Error!", err.message, "error");
    });

    registerUsernameInputFieldRef.value = "";
    registerEmailInputFieldRef.value = "";
    registerPasswordInputFieldRef.value = "";
    registerProfilePhotoFormControlFileInputFieldRef.value = "";
});



