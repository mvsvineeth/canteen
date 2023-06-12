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
const form = document.getElementById("login");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var checked = false;

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checked = true;
      break;
    }
  }

  if (!checked) {
    alert("Please check at least one option.");
  } else {
    const formData = new FormData(form);
    let avail = [];
    let x = Object.fromEntries(formData);
    if (x.ItemAvaile1 != undefined) {
      avail.push("main");
    }
    if (x.ItemAvaile2 != undefined) {
      avail.push("it");
    }
    if (x.ItemAvaile3 != undefined) {
      avail.push("mba");
    }
    const productsCollection = db.collection("products").doc("data");
    productsCollection
      .set(
        {
          products: firebase.firestore.FieldValue.arrayUnion({
            id: x.id,
            price: x.itemprice,
            type: x.itemtype,
            avail: avail,
            type: x.itemtype,
            name: x.name,
            re: false,
            qty: 0,
          }),
        },
        { merge: true }
      )
      .then(() => {
        alert("product added");
        form.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
