  //  web app Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAXTggvA8r9JWMfjBc5Oum7BRmTFVLuJIw",
    authDomain: "todo-2-e2574.firebaseapp.com",
    projectId: "todo-2-e2574",
    storageBucket: "todo-2-e2574.appspot.com",
    messagingSenderId: "313231024738",
    appId: "1:313231024738:web:1de616be6ecabe34eee73b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let form = document.querySelector('form');
let list = document.querySelector('ul');
let hna = document.querySelector('.hna')
let delete_all = document.querySelector('.butt');
let input = document.querySelector('#todo');
let pattern = /[a-zA-Z0-9]{5,}/
let h = document.querySelector('.text');
// input.addEventListener('keyup',(e) => {
//    e.preventDefault();
//    if(pattern.test(form.todo.value)){
//       console.log("yes")
//       h.innerHTML ="ok"
//    } else {
//       h.innerHTML = "nop"
//    }
// })
//To delete all todos  :
delete_all.addEventListener('click',(event) => {
   event.preventDefault();
      let toto = document.querySelectorAll('li');
   toto.forEach((to) => {
      to.remove()
      //delete from db:
      let id = to.getAttribute('data-id')
      db.collection("Todos").doc(id).delete()
   })
})
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
       if(pattern.test(form.todo.value)) {
        let obb = {
          todo: form.todo.value,
         };
          //return a promise:
         db.collection("Todos").add(obb).then((res) => console.log("added"),form.reset())
         .catch((error) => console.log(error,"failed"));
       } else {
         console.log(" no")
       }
})
 const add_todo = (todo,id) => {
    let html = `
        <li class="list-group" data-id="${id}">${todo.todo}
        <button type="submit" class="click">
        <i class="fas fa-trash"></i>
        </button> </li>
        
     `
     list.innerHTML += html
 }
 db.collection("Todos").onSnapshot((snap) => {
     snap.docChanges().forEach((to,index) => {
          if(to.type==="added"){
            add_todo(to.doc.data(),to.doc.id)
            console.log(snap.docs)
            if(!snap.empty) {
              hna.innerHTML = `you have ${snap.size} Pending tasks todo`
            } 
          } else {
               delete_todo(to.doc.id)
               snap.size--;
               hna.innerHTML = `you have ${snap.size} Pending tasks todo`
               if(snap.size == 0) {
                  hna.innerHTML = `No data`
               }
          }
     })
 })
