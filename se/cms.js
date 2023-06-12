const firebaseConfig = {
  apiKey: "AIzaSyCpEwfVKR-fJbOzvoKrNgN1lJ_qwNQd-4k",
  authDomain: "armrita-eats.firebaseapp.com",
  projectId: "armrita-eats",
  storageBucket: "armrita-eats.appspot.com",
  messagingSenderId: "603598632419",
  appId: "1:603598632419:web:f0cc76e33efba382fc1cd6",
  measurementId: "G-T4ZN6T9LZ0",
};
const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
var dataRef = firestore.collection("managerData");
dataRef
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const dataItem = doc.data();
      addText_1(id, dataItem.id, dataItem.pwd, dataItem.can);
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
function showOverlay() {
  document.getElementById("overlay").style.display = "flex";
}

function hideOverlay() {
  document.getElementById("overlay").style.display = "none";
}
function show(count) {
  const passwordInput = document.getElementById(count + "pwd");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    document.getElementById(count + "show").innerHTML = "Hide";
    if (count != "a") {
      document.getElementById(count + "bc").style.display = "flex";
    }
  } else {
    passwordInput.type = "password";
    document.getElementById(count + "show").innerHTML = "Show";
    if (count != "a") {
      document.getElementById(count + "bc").style.display = "none";
    }
  }
}
var maxCols = 3;
var rowCount = 0;

function addText(id, password, canteen) {
  firestore
    .collection("managerData")
    .add({
      id: id,
      pwd: password,
      can: canteen,
    })
    .then((res) => {
      addText_1(res.id, id, password, canteen);
      alert("Manager added it may take 2 minutes to show up chnages");
    })
    .catch((err) => {
      alert("Something went wrong");
    });
}
function addText_1(real_id, id, password, canteen) {
  if (rowCount == 0 || rowCount % maxCols == 0) {
    var newRow = document.createElement("tr");
    document.getElementById("tableBody").appendChild(newRow);
  }
  const count = document.getElementsByTagName("td").length + "";
  var newCell = document.createElement("td");
  newCell.setAttribute("id", count + "td");
  var newForm = document.createElement("form");
  newForm.setAttribute("class", "form_1");
  newForm.setAttribute("id", count + "form");
  var newLabel1 = document.createElement("label");
  newLabel1.setAttribute("for", "id");
  newLabel1.appendChild(document.createTextNode("ID:"));
  var newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("disabled", true);
  newInput1.setAttribute("value", id);
  newInput1.setAttribute("id", count + "id");
  var newLabel2 = document.createElement("label");
  newLabel2.setAttribute("for", "password");
  newLabel2.appendChild(document.createTextNode("Password:"));
  var newDiv = document.createElement("div");
  newDiv.style.display = "flex";
  newDiv.style.flexDirection = "row";
  var newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "password");
  newInput2.setAttribute("disabled", true);
  newInput2.setAttribute("value", password);
  newInput2.setAttribute("id", count + "pwd");
  var newButton = document.createElement("button");
  newButton.setAttribute("type", "button");
  newButton.appendChild(document.createTextNode("Show"));
  newButton.setAttribute("id", count + "show");
  newButton.addEventListener("click", function () {
    show(count);
  });
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newButton);
  var newLabel3 = document.createElement("label");
  newLabel3.setAttribute("for", "canteen");
  newLabel3.appendChild(document.createTextNode("Canteen:"));
  var newSpan = document.createElement("span");
  newSpan.setAttribute("id", count + "canteen");
  newSpan.appendChild(document.createTextNode(canteen));
  var newDiv1 = document.createElement("div");
  newDiv1.style.display = "none";
  newDiv1.style.flexDirection = "row";
  newDiv1.style.justifyContent = "space-evenly";
  newDiv1.setAttribute("class", "button_con");
  newDiv1.setAttribute("id", count + "bc");
  var newButton1 = document.createElement("button");
  newButton1.setAttribute("type", "button");
  newButton1.appendChild(document.createTextNode("Edit"));
  newButton1.setAttribute("id", count + "edit");
  newButton1.setAttribute("class", "edit");
  newButton1.addEventListener("click", function () {
    edit(count);
  });
  var newButton4 = document.createElement("button");
  newButton4.setAttribute("type", "button");
  newButton4.appendChild(document.createTextNode("Save"));
  newButton4.setAttribute("id", count + "save");
  newButton4.setAttribute("class", "edit");
  newButton4.addEventListener("click", function () {
    save(count, real_id, id, password);
  });
  newButton4.style.display = "none";
  var newButton2 = document.createElement("button");
  newButton2.setAttribute("type", "button");
  newButton2.appendChild(document.createTextNode("Delete"));
  newButton2.addEventListener("click", function () {
    deleteVal(real_id, count);
  });
  newButton2.setAttribute("id", count + "del");
  newButton2.setAttribute("class", "del");
  var newButton3 = document.createElement("button");
  newButton3.setAttribute("type", "button");
  newButton3.appendChild(document.createTextNode("Cancel"));
  newButton3.setAttribute("id", count + "canc");
  newButton3.setAttribute("class", "del");
  newButton3.style.display = "none";
  newButton3.addEventListener("click", function () {
    cancel(count);
  });
  newDiv1.appendChild(newButton1);
  newDiv1.appendChild(newButton4);
  newDiv1.appendChild(newButton2);
  newDiv1.appendChild(newButton3);
  newForm.appendChild(newLabel1);
  newForm.appendChild(newInput1);
  newForm.appendChild(newLabel2);
  newForm.appendChild(newDiv);
  newForm.appendChild(newLabel3);
  newForm.appendChild(newSpan);
  newForm.appendChild(newDiv1);
  newCell.appendChild(newForm);

  document.getElementById("tableBody").lastChild.appendChild(newCell);

  rowCount++;

  if (rowCount % maxCols == 0) {
    var newCell = document.createElement("td");
    newCell.setAttribute("colspan", maxCols - (rowCount % maxCols));
    document.getElementById("tableBody").lastChild.appendChild(newCell);
  }
}
function edit(count) {
  let x = window.prompt("Enter your edit password");
  if (x == "1234") {
    document.getElementById(count + "id").removeAttribute("disabled");
    document.getElementById(count + "pwd").removeAttribute("disabled");
    document.getElementById(count + "edit").style.display = "none";
    document.getElementById(count + "del").style.display = "none";
    document.getElementById(count + "canc").style.display = "block";
    document.getElementById(count + "save").style.display = "block";
  } else {
    alert("Invalid edit password");
  }
}
function cancel(count) {
  document.getElementById(count + "id").setAttribute("disabled", true);
  document.getElementById(count + "pwd").setAttribute("disabled", true);
  document.getElementById(count + "edit").style.display = "block";
  document.getElementById(count + "del").style.display = "block";
  document.getElementById(count + "canc").style.display = "none";
  document.getElementById(count + "save").style.display = "none";
}
function save(count, real_id, id, password) {
  let x = document.getElementById(count + "id").value;
  let y = document.getElementById(count + "pwd").value;
  if (x != id || y != password) {
    const collectionRef = firebase.firestore().collection("managerData");
    const documentRef = collectionRef.doc(real_id);
    documentRef
      .update({
        id: x,
        pwd: y,
      })
      .then(() => {
        cancel(count);
        alert("updated");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("changed");
    cancel(count);
  }
}
function deleteVal(real_id, count) {
  let input = prompt("Enter Delete to delete");
  if (input == "Delete") {
    const collectionRef = firebase.firestore().collection("managerData");
    const documentRef = collectionRef.doc(real_id);
    documentRef
      .delete()
      .then(() => {
        cancel(count);
        alert("deleted");
        location.reload();
      })
      .catch(() => {
        cancel(count);
        alert("Something went wrong");
      });
  } else {
    cancel(count);
  }
}
