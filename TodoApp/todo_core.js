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
const database =  firebase.firestore();

const inputTextField = document.querySelector("#inputTextField");
const submitButton = document.querySelector("#submitButton");
const clearListButton = document.querySelector("#clearListButton");

auth.onAuthStateChanged(function(user) {
    if (!user) {
        window.location.replace("../Authentication/perm_denied.html");
    }

    const collectionRef = database.collection(auth.currentUser.email + "/TodoApp/TodoItems/");
    const specificCollectionRef = collectionRef.orderBy("date", "asc");

    specificCollectionRef.onSnapshot(
        function(querySnapshot){
            collectionRef.get().then(function(querySnapshot){
                document.getElementById("todoListLengthHeader").innerHTML =
                `<small><em>Total length of the list:</em> ${querySnapshot.size}</small>`;
            });

            const nodes = document.querySelector("#todoAppListBody");
            while (nodes.firstChild) {
                nodes.removeChild(nodes.firstChild);
            }

            for (var i = 0; i < querySnapshot.size; i++){
                const item = querySnapshot.docs[i].data();
                const todoTextValue = item.todoText;
                const dateValue = item.date;

                const trNode = document.createElement("tr");
                const thNode = document.createElement("th");
                thNode.scope = "row";
                thNode.textContent = querySnapshot.docs[i].id;
                thNode.id = "todoRowHeaderItem";
                const tdNode1 = document.createElement("td");
                tdNode1.textContent = todoTextValue;
                const tdNode2 = document.createElement("td");
                tdNode2.textContent = dateValue;
                const tdNode3 = document.createElement("td");
                tdNode3.id = "todoCancelItem";
                tdNode3.innerHTML = "<img src='../Resources/close_icon.png' width='40px'>";
                trNode.appendChild(thNode);
                trNode.appendChild(tdNode1);
                trNode.appendChild(tdNode2);
                trNode.appendChild(tdNode3);
                document.querySelector("#todoAppListBody").appendChild(trNode);
            }

            document.querySelectorAll("#todoCancelItem").forEach((function(item){
                item.onclick = function (){
                    const documentID = document.querySelector("#todoRowHeaderItem").textContent;
                    database.collection(auth.currentUser.email + "/TodoApp/TodoItems/").doc(documentID).delete();
                }
            }));
        }
    );
});

submitButton.addEventListener("click", function () {
    if (inputTextField.value.length > 0) {
        database.collection(auth.currentUser.email + "/TodoApp/TodoItems/").add({
            todoText: inputTextField.value,
            date: new Date().toDateString() + " " + new Date().toTimeString()
        });
        inputTextField.value = "";
    } else {
        swal("Empty input!", "Your input length should be at least 1.", "error");
        return false;
    }
});

clearListButton.addEventListener("click", function () {
    const collectionRef = database.collection(auth.currentUser.email + "/TodoApp/TodoItems/");
    collectionRef.get().then(function(querySnapshot){
        for (var i = 0; i < querySnapshot.size; i++){
            collectionRef.doc(querySnapshot.docs[i].id).delete();
        }
    });
    swal("Success!", "You successfully cleared the list.", "success");
});
