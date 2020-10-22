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