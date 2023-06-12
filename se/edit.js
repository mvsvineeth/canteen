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
const db = firebase.firestore();
const productsCollection = db.collection("products").doc("data");
productsCollection
  .get()
  .then((doc) => {
    const products = doc.data().products;
    const tableBody = document.querySelector("#menu-table tbody");
    for (i = 0; i < products.length; i++) {
      const row = document.createElement("tr");
      const z = products[i].id.trim();
      const id = z;
      const name = z + "name";
      const price = z + "price";
      const type = z + "type";
      const avail = z + "avail";
      const save = z + "save";
      const del = z + "del";
      const can = z + "can";
      const edit = z + "edit";
      const initiallySelectedCanteens = products[i].avail;
      row.innerHTML = `
          <td >
            <textarea disabled=true id=${id}>
                ${products[i].id}
            </textarea>
          </td>
          <td >
            <textarea disabled=true id="${name}">
                ${products[i].name}
            </textarea>
          </td>
          <td >
            <textarea disabled=true id="${price}">
                ${products[i].price}
            </textarea>
          </td>
          <td >
            <textarea disabled=true id="${type}">
                ${products[i].type}
            </textarea>
          </td>
          <td >
            <textarea disabled=true >

                ${products[i].avail}
            </textarea>
            <div  style="display: none" id="${avail}">
        <input type="checkbox" name="canteen" value="main" class="${
          z + "c"
        }" /> Main
        <input type="checkbox" name="canteen" value="it" class="${z + "c"}"/> IT
        <input type="checkbox" name="canteen" value="mba" class="${
          z + "c"
        }" /> MBA
      </div>
          </td>
          <td><img src="https://drive.google.com/uc?export=view&id=1EnTUZyESnoY7CxbeB2YloLFLVexaX5lS" /></td>
          <td>
            <button class="btn btn-edit" id="${edit}" onclick="editRow(${z})">Edit</button>
            <button class="btn btn-save" id="${save}" onclick="saveRow(${z})">Save</button>
            <button class="btn btn-delete" id="${del}" onclick="deleteRow(${z})">Delete</button>
            <button class="btn btn-cancel" id="${can}" onclick="cancel(${z})">Cancel</button>
          </td>
        `;
      tableBody.appendChild(row);
      const checkboxes = document.getElementsByClassName(z + "c");
      console.log(checkboxes);
      Array.from(checkboxes).forEach((checkbox) => {
        if (initiallySelectedCanteens.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

function cancel(z) {
  document.getElementById(z + "can").style.display = "none";
  document.getElementById(z + "del").style.display = "block";
  document.getElementById(z + "save").style.display = "none";
  document.getElementById(z + "edit").style.display = "block";
  document.getElementById(z + "name").disabled = true;
  document.getElementById(z + "price").disabled = true;
  document.getElementById(z + "type").disabled = true;
  document.getElementById(z + "avail").style.display = "none";
}
function editRow(btn) {
  let x = window.prompt("Enter your edit password");
  if (x == "1234") {
    document.getElementById(btn + "edit").style.display = "block";
    document.getElementById(btn + "can").style.display = "block";
    document.getElementById(btn + "save").style.display = "block";
    document.getElementById(btn + "del").style.display = "none";
    document.getElementById(btn + "edit").style.display = "none";
    document.getElementById(btn).disabled = false;
    document.getElementById(btn + "name").disabled = false;
    document.getElementById(btn + "price").disabled = false;
    document.getElementById(btn + "type").disabled = false;
    document.getElementById(btn + "avail").style.display = "flex";
  } else {
    alert("Check your edit password");
  }
}

function saveRow(key) {
  const updatedSelectedCanteens = [];
  const checkboxes = document.getElementsByClassName(key + "c");
  updatedSelectedCanteens.length = 0; // Clear the array before updating
  Array.from(checkboxes).forEach((checkbox) => {
    if (checkbox.checked) {
      updatedSelectedCanteens.push(checkbox.value);
    }
  });
  if (updatedSelectedCanteens.length > 0) {
    productsCollection
      .get()
      .then((doc) => {
        if (doc.exists) {
          const products = doc.data().products;
          const indexToUpdate = products.findIndex((product) => {
            return product.id == key;
          });
          if (indexToUpdate >= 0) {
            products[indexToUpdate].id = document.getElementById(key).value;
            products[indexToUpdate].name = document.getElementById(
              key + "name"
            ).value;
            products[indexToUpdate].price = document.getElementById(
              key + "price"
            ).value;
            products[indexToUpdate].type = document.getElementById(
              key + "type"
            ).value;
            products[indexToUpdate].avail = updatedSelectedCanteens;
            productsCollection
              .update({ products: products })
              .then(() => {
                alert("product updated succesfully");
                location.reload();
                cancel(key);
              })
              .catch(() => {
                alert("something went wrong try again");
              });
          }
        }
      })
      .catch(() => {
        alert("some thing went wrong");
      });
  } else {
    alert("select atleat one canteen");
  }
}

function deleteRow(btn) {
  productsCollection
    .get()
    .then((doc) => {
      if (doc.exists) {
        const products = doc.data().products;
        const index = products.findIndex((product) => {
          return product.id == btn;
        });
        if (index !== -1) {
          products.splice(index, 1);
          productsCollection
            .update({ products: products })
            .then(() => {
              alert("deleted");
              location.reload();
            })
            .catch((error) => {
              alert("Something went wrong");
            });
        } else {
          alert("deleted");
        }
      }
    })
    .catch((error) => {
      alert("Something went wrong");
    });
}
