
let todoArray = JSON.parse(localStorage.getItem('Items')) || [];

function saveTodoList() {
  localStorage.setItem('Items', JSON.stringify(todoArray));
}


function displayTodoList() {
  const todoList = document.getElementById('todoList');
  let todoListHTML = '';

  todoArray.forEach((item, index) => {
    const completedClass = item.completed ? 'completed' : '';
    const textDecoration = item.completed ? 'text-decoration: line-through;' : '';
    todoListHTML += `
      <li class="${completedClass}">
        <input type="checkbox" class="checkbox" data-index="${index}" ${item.completed ? 'checked' : ''}>
        <span class="itemName" style="${textDecoration}">${item.name}</span>
        <span class="deleteBtn" data-index="${index}">X</span>
      </li>
    `;
  });

  todoList.innerHTML = todoListHTML;

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (a) => {
      const index = a.target.dataset.index;
      toggleCompleted(index);
    });
  });

  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (a) => {
      const index = a.target.dataset.index;
      removeItem(index);
    });
  });
}

// Function to add a new item to the todo list
function addItem() {
  const newEntry = document.getElementById('newEntry').value.trim();

  if (newEntry !== '' && newEntry.length > 3 && /^[A-Z].*/.test(newEntry)) {
    const newItem = {
      id: Date.now(),
      name: newEntry,
      createdDate: new Date().toLocaleDateString(),
      completed: false
    };

    todoArray.push(newItem);
    saveTodoList();
    displayTodoList();

    // Clear input field after adding the task
    document.getElementById('newEntry').value = '';
  } else {
    alert('Please enter a valid task. It should start with an uppercase letter, have more than three characters, and should not be empty.');
  }
}


function toggleCompleted(index) {
  todoArray[index].completed = !todoArray[index].completed;
  saveTodoList();
  displayTodoList();
}


function removeItem(index) {
  todoArray.splice(index, 1);
  saveTodoList();
  displayTodoList();
}

function sortItems() {
  todoArray.sort((b, c) => b.name.localeCompare(c.name));
  saveTodoList();
  displayTodoList();
}

document.getElementById('addBtn').addEventListener('click', addItem);

document.getElementById('sortBtn').addEventListener('click', sortItems);

displayTodoList();

