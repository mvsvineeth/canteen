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
const form = document.getElementById("form_1");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("error").style.display = "none";
  const username = document.getElementById("username").value;
  const pwd = document.getElementById("pwd").value;
  const collectionRef = firebase.firestore().collection("managerData");

  collectionRef
    .where("id", "==", username)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (pwd == data.pwd) {
            localStorage.setItem("canteen", data.can);
            localStorage.setItem("id", username);
            window.location.replace("managerportal.html");
          } else {
            document.getElementById("error").style.display = "block";
          }
        });
      } else {
        document.getElementById("error").style.display = "block";
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
const inputs = document.querySelectorAll(".input");

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});
