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

const userNavbarDropdownMenuLinkRef = document.getElementById("userNavbarDropdownMenuLink");
const authenticatedUserNavbarDropdownItemLinks = document.querySelectorAll(".dropdown-item.authenticated");
const unauthenticatedUserNavbarDropdownItemLinks = document.querySelectorAll(".dropdown-item.unauthenticated");
const projectsNavbarDropdownItemLinks = document.querySelectorAll(".dropdown-item.projects");

auth.onAuthStateChanged(function(user){
    if (user) {
        userNavbarDropdownMenuLinkRef.innerHTML = user.email;
        unauthenticatedUserNavbarDropdownItemLinks.forEach(item => item.style.display = "none");
        authenticatedUserNavbarDropdownItemLinks[2].onclick = () => auth.signOut();
    } else {
        userNavbarDropdownMenuLinkRef.innerHTML = "Join the network";
        projectsNavbarDropdownItemLinks.forEach(item => item.onclick = function() {
            swal("Access Denied!", "You can not view the page without signing in.", "error");
            return false;
        });
        authenticatedUserNavbarDropdownItemLinks.forEach(item => item.style.display = "none");
    }
});