const inputTextField = document.querySelector("#inputTextField");
const submitButton = document.querySelector("#submitButton");
const clearListButton = document.querySelector("#clearListButton");
const tableBody = document.querySelector("#todoAppListBody");
const listLengthHeader = document.querySelector("#todoListLengthHeader");

submitButton.addEventListener('click', function() {
    const trNode = document.createElement("tr");
    const thNode = document.createElement("th");
    thNode.scope = "row";
    thNode.textContent = inputTextField.value;
    thNode.id = "todoRowHeaderItem";

    const tdNode1 = document.createElement("td");
    tdNode1.textContent = new Date();
    const tdNode2 = document.createElement("td");
    tdNode2.id = "todoDeleteButton";
    tdNode2.innerHTML = "<img src='../Resources/close_icon.png' width='40px'>";

    trNode.appendChild(thNode);
    trNode.appendChild(tdNode1);
    trNode.appendChild(tdNode2);
    tableBody.appendChild(trNode);

    const itemDeleteButton = document.querySelectorAll("#todoDeleteButton");

    itemDeleteButton.forEach(function(item){
        item.onclick = function() {
            item.parentElement.remove();
            listLengthHeader.textContent = `Total list length is ${tableBody.childElementCount}`;
        }
    });
    
    listLengthHeader.textContent = `Total list length is ${tableBody.childElementCount}`;
});

clearListButton.addEventListener('click', function(){
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    listLengthHeader.textContent = `Total list length is 0`;
});