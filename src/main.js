if (!localStorage.getItem('userId')) {
  window.location.href = '/';
}

let usr = document.getElementById('main');
usr.innerHTML = `<h1>${localStorage.getItem(
  'userName'
)}'s TODOs<input type="submit" value="Logout"  name="logout" id="logout"/></h1>`;

let todoAddSection = document.getElementById('todo-form');
let todoListSection = document.getElementById('todo-lists');

const loadTodos = (userid) => {};

const startEdit = (todoid) => {
  console.log('Edit todo Id :: ', todoid);
};

const removeTodo = (todoid) => {
  fetch(`/api/todo/${todoid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('userId')}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res && res.todos && Array.isArray(res.todos)) {
        let htmlTags = '<ul>';
        res.todos.forEach((todo) => {
          htmlTags += `<li>${todo.title} <button type"button" name="toedit" id="toedit" onclick="startEdit('${todo._id}')">Edit</button> <button type"button" name="toedit" id="toedit" onclick="removeTodo('${todo._id}')">Delete</button></li>`;
        });
        htmlTags += '</ul>';
        todoListSection.innerHTML = htmlTags;
      } else {
        // clear the lists
        console.log('Cannot render');
      }
    })
    .catch(console.log);
};

const addTodo = () => {
  let todoTitle = document.getElementById('todo-title-box').value;
  let todoDesc = document.getElementById('todo-description-box').value;
  fetch('/api/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('userId')}`,
    },
    body: JSON.stringify({
      title: todoTitle,
      description: todoDesc,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('Add Todo Response :: ', res);
      if (res && res.todos && Array.isArray(res.todos)) {
        let htmlTags = '<ul>';
        res.todos.forEach((todo) => {
          htmlTags += `<li>${todo.title} <button type"button" name="toedit" id="toedit" onclick="startEdit('${todo._id}')">Edit</button> <button type"button" name="toedit" id="toedit" onclick="removeTodo('${todo._id}')">Delete</button></li>`;
        });
        htmlTags += '</ul>';
        todoListSection.innerHTML = htmlTags;
      } else {
        // clear the lists
        console.log('Cannot render');
      }
    })
    .catch(console.log);
};

let addTodoForm = `
    <form>
    <label for="todo-title-box">Title </label>
      <input type="text" name="todo-title-box" id="todo-title-box" /><br/>
      <label for="todo-description-box">Description </label>
      <textarea type="text" rows="5" cols="25" name="todo-description-box" id="todo-description-box"> </textarea><br/>
      <input type="submit" value="Add Todo"  name="add-button" id="add-button"/>
      <input type="submit" value="Edit Todo"  name="edit-button" id="edit-button"/>
    </form><br />`;

todoAddSection.innerHTML = addTodoForm;

let addTodoButton = document.getElementById('add-button');
addTodoButton.addEventListener('click', function (event) {
  event.preventDefault();
  addTodo();
});

let editTodoButton = document.getElementById('edit-button');
editTodoButton.addEventListener('click', function (event) {
  event.preventDefault();
  // postForm();
});

let btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click', function (event) {
  event.preventDefault();
  localStorage.removeItem('errorMsg');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  window.location.href = '/';
});
