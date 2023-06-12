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
productsCollection.get().then((doc) => {
  const products = doc.data().products;
  const tableBody = document.getElementById("display");
  for (i = 0; i < products.length; i++) {
    const inc = products[i].avail.includes(
      localStorage.getItem("canteen").toLowerCase()
    );
    if (inc) {
      const row = document.createElement("tr");
      const z = products[i].id.trim();
      const name = z + "name";
      row.setAttribute("id", z);

      row.innerHTML = `
            <td class="${products[i].re ? "availRow" : "unavailRow"}">
                ${products[i].name}
            </td>
            <td class="${products[i].re ? "availRow" : "unavailRow"}">
            <div class="input-wrapper">
            <button class="input-button" onclick="increment()">+</button>
            <input type="number" id="myInput" min="0" value="${
              products[i].qty
            }" />
            <button class="input-button" onclick="decrement()">-</button>
          </div>
            </td>
            <td class="${products[i].re ? "availRow" : "unavailRow"}">
            <center>
                <button class="unavailable" onclick="avail(${z})" style="display:${
        products[i].re ? "none" : "block"
      }">
                  MAKE IT AVAILABLE</button>
                  <div style="display: ${
                    products[i].re ? "flex" : "none"
                  }; justify-content: space-evenly; align-items: center; width: 100%;">
  <button class="available" onclick="unavail(${z})">MAKE IT UNAVAILABLE</button>
  <button class="available" style="margin-left: 10px;" onclick="updateQty(${z})">UPDATE</button>
</div>

                  </center>
            </td>
            `;
      tableBody.appendChild(row);
    }
  }
});
function avail(key) {
  let x = window.prompt("Enter the quantity of the items");
  if (isNumeric(x)) {
    var qty = parseInt(x);
    productsCollection
      .get()
      .then((doc) => {
        if (doc.exists) {
          const products = doc.data().products;
          const indexToUpdate = products.findIndex((product) => {
            return product.id == key;
          });
          if (indexToUpdate >= 0) {
            var name = products[indexToUpdate].name;
            products[indexToUpdate].re = true;
            products[indexToUpdate].qty = qty;
            productsCollection
              .update({ products: products })
              .then(() => {
                alert("Made " + name + " available with qty " + qty);
                location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch(() => {
        alert("some thing went wrong");
      });
  } else {
    alert("Enter legal quantity");
  }
}
function isNumeric(value) {
  return /^\d+$/.test(value);
}
function unavail(key) {
  productsCollection
    .get()
    .then((doc) => {
      if (doc.exists) {
        const products = doc.data().products;
        const indexToUpdate = products.findIndex((product) => {
          return product.id == key;
        });
        if (indexToUpdate >= 0) {
          var name = products[indexToUpdate].name;
          products[indexToUpdate].re = false;
          products[indexToUpdate].qty = 0;
          productsCollection
            .update({ products: products })
            .then(() => {
              alert("Made " + name + " unavailable");
              location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    })
    .catch(() => {
      alert("some thing went wrong");
    });
}
function updateQty(key) {
  let qty = document.getElementById("myInput").value;
  if (isNumeric(qty)) {
    productsCollection
      .get()
      .then((doc) => {
        if (doc.exists) {
          const products = doc.data().products;
          const indexToUpdate = products.findIndex((product) => {
            return product.id == key;
          });
          if (indexToUpdate >= 0) {
            var name = products[indexToUpdate].name;
            if (qty == 0) {
              products[indexToUpdate].re = false;
            }
            products[indexToUpdate].qty = qty;
            productsCollection
              .update({ products: products })
              .then(() => {
                alert("Made " + name + " available with qty " + qty);
                location.reload();
              })
              .catch((err) => {
                console.log(err);
                alert("some thing went wrong");
              });
          }
        }
      })
      .catch(() => {
        alert("some thing went wrong");
      });
  }
}
