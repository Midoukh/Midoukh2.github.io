//selectors
const toDoButton = document.querySelector('#add-to-do')
const toDoInput = document.querySelector('.toDoName')
const toDoList = document.querySelector('.todo-list')
const audio = document.querySelector('audio')
const filterOption = document.querySelector('.filter-todo')
const messageCompleted = document.querySelector('#msg-com');
//Event Listener
document.addEventListener('DOMContentLoaded', getTodos)
toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);
//functions
function addToDo(event){
    event.preventDefault();
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo');
    //create li
    const newToDo = document.createElement('li')
    newToDo.textContent = toDoInput.value;
    newToDo.classList.add('todo-item')
    todoDiv.appendChild(newToDo);
    //create completed btn
    //add todo to local storage
    saveLocalTodos(toDoInput.value)
    const completedButton = document.createElement('button')
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add('completed-btn')
    todoDiv.appendChild(completedButton);
     //create trash btn
     const trashButton = document.createElement('button')
     trashButton.innerHTML = "<i class='fas fa-trash'></i>"
     trashButton.classList.add('trash-btn')
     todoDiv.appendChild(trashButton);
     //append toDoDiv to the ul
     toDoList.appendChild(todoDiv);
     //clear to do input value
     toDoInput.value = ""
}

function deleteCheck(e) {
    const iteM = e.target;
    //delete
    if (iteM.classList[0] === 'trash-btn'){
        const todo = iteM.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodo(todo)
        audio.play();
        todo.addEventListener('transitionend', () => {
          todo.remove();
        })
    }
    //mark
    if (iteM.classList[0] === 'completed-btn'){
        const todo = iteM.parentElement;
        messageCompleted.play();
        todo.classList.toggle('completed')
    }
}

function filterToDo(e) {
    const todos = toDoList.childNodes;
    todos.forEach(todo => {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!(todo.classList.contains('completed'))){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
        }
    })
}

function saveLocalTodos(todo) {
    // check if I have something
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem(todos, JSON.stringify(todos))
}

function getTodos() {
      // check if I have something
      let todos;
      if (localStorage.getItem('todos') === null){
          todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem('todos'));
      }
      todos.forEach(todo => {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo');
        //create li
        const newToDo = document.createElement('li')
        newToDo.textContent = todo;
        newToDo.classList.add('todo-item')
        todoDiv.appendChild(newToDo);
        //create completed btn
        //add todo to local storage
        const completedButton = document.createElement('button')
        completedButton.innerHTML = "<i class='fas fa-check'></i>"
        completedButton.classList.add('completed-btn')
        todoDiv.appendChild(completedButton);
         //create trash btn
         const trashButton = document.createElement('button')
         trashButton.innerHTML = "<i class='fas fa-trash'></i>"
         trashButton.classList.add('trash-btn')
         todoDiv.appendChild(trashButton);
         //append toDoDiv to the ul
         toDoList.appendChild(todoDiv);
      })
}

function removeLocalTodo(todo) {
    let todos;
      if (localStorage.getItem('todos') === null){
          todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem('todos'));
      }
      const todoIndex = todo.children[0].textContent;
      todos.splice(todos.indexOf(todoIndex), 1);
      localStorage.setItem('todos', JSON.stringify(todos))
}