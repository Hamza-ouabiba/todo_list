  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAbFNKD787X2d5dkzSGTG_vOEmBihwXaEc",
    authDomain: "todo-list-af156.firebaseapp.com",
    projectId: "todo-list-af156",
    storageBucket: "todo-list-af156.appspot.com",
    messagingSenderId: "481115152156",
    appId: "1:481115152156:web:eecf4e46a46f57b1d564d9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //la creation de la base de donnée : 
  //pour communiquer avec la base : 
const db = firebase.firestore();
let form = document.querySelector('form');
let list = document.querySelector('ul');
let pattern = /^[a-z]{5,10}$/
form.addEventListener('submit',(e) => {
     e.preventDefault()
     let obb = {
          todo: form.todo.value,
     };
     //return a promise:
     db.collection("Todos").add(obb).then((res) => console.log("added"),alert("added"))
     .catch((error) => console.log(error,"failed"));
})
//la methode add todo: 
 const add_todo = (todo,id) => {
    let html = `
        <li class="list-group" data-id="${id}">${todo.todo}<span><i class="fas fa-trash"></i></span></li>
     `
     list.innerHTML += html
 }
 db.collection("Todos").onSnapshot((snap) => {
     snap.docChanges().forEach((to) => {
          add_todo(to.doc.data(),to.doc.id)
     })
 })