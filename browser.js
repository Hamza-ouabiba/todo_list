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
let hna = document.querySelector('.hna')
let delete_all = document.querySelector('.butt');
let pattern = /^[a-z]{5,10}$/
const add_hna = (todo_num) => {
    hna.innerHTML = `you have ${todo_num} Pending tasks todo`
}
//pour faire supprimer tous les todos :
delete_all.addEventListener('click',(event) => {
   event.preventDefault();
   let toto = document.querySelectorAll('li');
   toto.forEach((to) => {
      to.remove()
      //supprimer dans la base de donnée :
      db.collection("Todos").delete  
   })
})
//pour faire supprimer un todo :
list.addEventListener('click',(e) => {
    e.preventDefault()
    if(e.target.tagName === "BUTTON"){
        let id = e.target.parentElement.getAttribute("data-id");
        delete_todo(id);
        db.collection("Todos").doc(id).delete()
    }
})
const delete_todo = (id) => {
      const Alltodos = document.querySelectorAll('li');
      Alltodos.forEach((todo) => {
        if(todo.getAttribute('data-id') === id) {
            todo.remove()
         }
      })
}
form.addEventListener('submit',(e) => {
     e.preventDefault()
     let obb = {
          todo: form.todo.value,
     };
     //return a promise:
     db.collection("Todos").add(obb).then((res) => console.log("added"),form.reset())
     .catch((error) => console.log(error,"failed"));
})
//la methode add todo: 
 const add_todo = (todo,id) => {
    let html = `
        <li class="list-group" data-id="${id}">${todo.todo}
        <button type="submit" class="click">
        <i class="fas fa-trash"></i>
        </button></li>
     `
     list.innerHTML += html
 }
 db.collection("Todos").onSnapshot((snap) => {
     snap.docChanges().forEach((to,index) => {
          if(to.type==="added"){
            add_todo(to.doc.data(),to.doc.id)
            add_hna(index+1)
          } else {
               delete_todo(to.doc.id)
          }
     })
 })
