document.addEventListener("DOMContentLoaded", function() {
  const setTheme = document.body;
  let theme = localStorage.getItem("PageTheme");
  const toggleImg = document.getElementById("Img");

  if (theme === "DARK") {
    setTheme.classList.add("dark_mode");
    toggleImg.src = "./images/icon-sun.svg";
  }

  function toggle_icon() {
    setTheme.classList.toggle("dark_mode");

    if (setTheme.classList.contains("dark_mode")) {
      theme = "DARK";
      console.log("Dark mode");
      toggleImg.src = "./images/icon-sun.svg";
    } else {
      theme = "LIGHT";
      console.log("Light mode");
      toggleImg.src = "./images/icon-moon.svg";
    }

    // Save to localStorage
    localStorage.setItem("PageTheme", theme);
  }

  // Attach event listener to the toggle button
  toggleImg.addEventListener("click", toggle_icon);
});


// Function to handle filter click
function handleFilterClick(event) {
  // Remove the active class from all filter elements
  const filterElements = document.querySelectorAll('.filter');
  filterElements.forEach((filter) => {
    filter.classList.remove('active');
  });

  // Add the active class to the clicked filter label
  const clickedFilter = event.target.closest('label');
  clickedFilter.classList.add('active');
}

// Add click event listener to each filter element
const filterElements = document.querySelectorAll('.filter');
filterElements.forEach((filter) => {
  filter.addEventListener('click', handleFilterClick);
});



//------------Toggle functionality for both list item and circle icon-----------------
function toggleListItem(event) {
  event.stopPropagation();
  const listItem = event.target.closest('li');
  const circleIcon = listItem.querySelector('.icon-circle');
  const todoText = listItem.querySelector('p');
  let crossIcon = listItem.querySelector('.icon-cross');
  if (crossIcon) {
    // Remove the cross icon if it already exists
    listItem.removeChild(crossIcon);
    listItem.classList.remove('item-checked');
    circleIcon.classList.remove('icon-check');
    todoText.style.textDecoration = 'none';
  } else {
    // Add the check icon and remove the cross icon
    listItem.classList.add('item-checked');
    circleIcon.classList.add('icon-check');
    todoText.style.textDecoration = 'line-through';
  if (!crossIcon) {
    // Create and append the cross icon if it doesn't exist
    crossIcon = document.createElement('img');
    crossIcon.setAttribute('src', './images/icon-cross.svg');
    crossIcon.setAttribute('alt', 'Cross');
    crossIcon.classList.add('icon-cross');
    listItem.appendChild(crossIcon);

    // Click event listener to the cross icon removes the item from the list when the cross icon is clicked
    crossIcon.addEventListener('click', function () {
      listItem.remove();
      updateItemsLeft();
    });
  }
  }

  updateItemsLeft();
  saveItems();
}


function toggleCircleIcon(event) {
  event.stopPropagation();
  const circleIcon = event.target.closest('.icon-circle');
  if (circleIcon) {
    const listItem = circleIcon.parentNode;
    const todoText = listItem.querySelector('p');
    let crossIcon = listItem.querySelector('.icon-cross');
    if (crossIcon) {
      // Remove the cross icon if it already exists
      listItem.removeChild(crossIcon);
      listItem.classList.remove('item-checked');
      circleIcon.classList.remove('icon-check');
      todoText.style.textDecoration = 'none';
    } else {
      // Add the check icon and add the cross icon
      listItem.classList.add('item-checked');
      circleIcon.classList.add('icon-check');
      todoText.style.textDecoration = 'line-through';

      if (!crossIcon) {
        // Create and append the cross icon if it doesn't exist
        crossIcon = document.createElement('img');
        crossIcon.setAttribute('src', './images/icon-cross.svg');
        crossIcon.setAttribute('alt', 'Cross');
        crossIcon.classList.add('icon-cross');
        listItem.appendChild(crossIcon);

        // Click event listener to the cross icon removes the item from the list when the cross icon is clicked
        crossIcon.addEventListener('click', function () {
          listItem.remove();
          updateItemsLeft();
        });
      }
    }
    updateItemsLeft();
  }
  saveItems();
}

// Function to save the items to localStorage
function saveItems() {
  const todoList = document.getElementById('todoList');
  const items = Array.from(todoList.children).map((item) => ({
    description: item.querySelector('p').textContent,
    completed: item.classList.contains('item-checked'),
  }));
  localStorage.setItem('todoItems', JSON.stringify(items));
}

// Function to restore the items from localStorage
function restoreItems() {
  const savedItems = localStorage.getItem('todoItems');
  if (savedItems) {
    const items = JSON.parse(savedItems);
    items.forEach((item) => {
      generateItem(item.description, item.completed);
    });
  }
  updateItemsLeft();
}

// Function to generate a list item
function generateItem(description, completed) {
  // Create the list item
  const listItem = document.createElement('li');
  listItem.draggable = true;

  // Create the todo text element and append it to the list item
  const todoText = document.createElement('p');
  todoText.textContent = description;
  listItem.appendChild(todoText);

  // Create the circle icon and append it to the list item
  const circleSpan = document.createElement('span');
  circleSpan.classList.add('icon-circle');
  circleSpan.classList.add('align');
  const circleIcon = document.createElement('img');
  circleIcon.setAttribute('src', './images/icon-circle.svg');
  circleIcon.setAttribute('alt', 'circle');
  circleSpan.appendChild(circleIcon);
  listItem.appendChild(circleSpan);

   // Create the cross icon and append it to the list item
   const crossSpan = document.createElement('span');
   crossSpan.classList.add('icon-cross');
   crossSpan.classList.add('align');
   const crossIcon = document.createElement('img');
   crossIcon.setAttribute('src', './images/icon-cross.svg');
   crossIcon.setAttribute('alt', 'cross');
   crossIcon.classList.add('icon-cross');
   crossSpan.appendChild(crossIcon);
   listItem.appendChild(crossSpan);

    // Add click event listener to the cross icon
  crossIcon.addEventListener('click', function () {
    listItem.remove();
  });
 
   // Hide the cross icon initially
   crossSpan.style.display = 'none';
 
   //event listeners to show/hide the cross icon on hover
   listItem.addEventListener('mouseenter', function () {
     crossSpan.style.display = 'inline-block';
   });
   listItem.addEventListener('mouseleave', function () {
     crossSpan.style.display = 'none';
   });

  // Add the event listeners to the circle icon for hover and click events
  circleSpan.addEventListener('mouseover', function () {
    this.classList.add('hover');
  });
  circleSpan.addEventListener('mouseout', function () {
    this.classList.remove('hover');
  });

  // Add the event listener to the list item and circle icon for click event
  listItem.addEventListener('click', toggleListItem);
  circleSpan.addEventListener('click', toggleCircleIcon);

  // Add event listeners for mobile view and Desktop view drag and drop functionality
  listItem.addEventListener('dragstart', handleDragStart);
  listItem.addEventListener('dragover', handleDragOver);
  listItem.addEventListener('drop', handleDrop);

  // Append the list item to the todo list container
  const todoList = document.getElementById('todoList');
  todoList.appendChild(listItem);

  // Save the items to localStorage
  saveItems();
  updateItemsLeft();
}


// Add items to list using the ENTER KEY or CLICK ON CIRCLE ICON...
function addListItem() {
  const itemInput = document.getElementById('inputText');

  function handleEnterKey(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (itemInput.value.trim() !== '') {
        generateItem(itemInput.value.trim());
        itemInput.value = '';
      }
    }
  }

  function handleCircleIconClick() {
    if (itemInput.value.trim() !== '') {
      generateItem(itemInput.value.trim());
      itemInput.value = '';
    }
  }

  // Event listener for Enter key press
  itemInput.addEventListener('keydown', handleEnterKey);

  // Event listener for click on the circle icon
  const circleClick = document.getElementById('circleIcon');
  circleClick.addEventListener('click', handleCircleIconClick);
}

// Call the addListItem function and restoreItems function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  addListItem();
  restoreItems();
});

// Variables to store references to the dragged item and the current drop target
let draggedItem = null;
let dropTarget = null;

// Function to handle dragging of list items
function handleDragStart(event) {
  draggedItem = this;
  this.classList.add('dragging');
  // Set the drag effect to 'move'
  event.dataTransfer.effectAllowed = 'move';
  // Type of data to drag and drop
  event.dataTransfer.setData('text/plain', '');

}

// Function to handle the dragover event
function handleDragOver(event) {
  event.preventDefault();
  // Set the effect to 'move' for the dragover event
  event.dataTransfer.dropEffect = 'move';
}

// Function to handle the drop event
function handleDrop(event) {
  event.preventDefault();
  if (this !== draggedItem) {
    const listItem = Array.from(this.parentNode.children);
    const draggedIndex = listItem.indexOf(draggedItem);
    const dropIndex = listItem.indexOf(this);
    const isAfter = dropIndex > draggedIndex;
    if (isAfter) {
      this.parentNode.insertBefore(draggedItem, this.nextSibling);
    } else {
      this.parentNode.insertBefore(draggedItem, this);
    }
    this.classList.remove('dragover');
    draggedItem = null;
    dropTarget = null;

    updateItemsLeft();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let circleIcon = document.getElementById('circleIcon');
  circleIcon.addEventListener('click', addListItem);

  // ...mobile view all, active, completed labels functionality
  let allLabel1 = document.querySelector('#mobile-filter .filter:nth-child(1)');
  allLabel1.addEventListener('click', showAllTodos);

  let activeLabel1 = document.querySelector('#mobile-filter .filter:nth-child(2)');
  activeLabel1.addEventListener('click', showActiveTodos);

  let completedLabel1 = document.querySelector('#mobile-filter .filter:nth-child(3)');
  completedLabel1.addEventListener('click', showCompletedTodos);

  // ........Desktop view all, active, completed functionality...............
  let allLabel = document.querySelector('#desktop-filter .cont_All label');
  allLabel.addEventListener('click', showAllTodos);

  let completedLabel = document.querySelector('#desktop-filter .cont_completed label');
  completedLabel.addEventListener('click', showCompletedTodos);

  let activeLabel = document.querySelector('#desktop-filter .cont_active label');
  activeLabel.addEventListener('click', showActiveTodos);

  let clearCompletedLabel = document.querySelector('#desktop-filter .clear label');
  clearCompletedLabel.addEventListener('click', clearCompletedTodos);

  function showAllTodos() {
    let todos = document.querySelectorAll('#todoList li');
    todos.forEach((todo) => {
      todo.style.display = 'block';
    });
  }

  function showActiveTodos() {
    let todos = document.querySelectorAll('#todoList li');
    todos.forEach((todo) => {
      let circleIcon = todo.querySelector('.icon-circle');
      let todoText = todo.querySelector('p');
      if (!circleIcon.classList.contains('icon-check')) {
        todoText.style.textDecoration = 'none';
        todo.style.display = 'block';
      } else {
        todo.style.display = 'none';
      }
    });
  }

  function showCompletedTodos() {
    let todos = document.querySelectorAll('#todoList li');
    todos.forEach((todo) => {
      let circleIcon = todo.querySelector('.icon-circle');
      let todoText = todo.querySelector('p');
      if (circleIcon.classList.contains('icon-check')) {
        todoText.style.textDecoration = 'line-through';
        todo.style.display = 'block';
      } else {
        todoText.style.textDecoration = 'none';
        todo.style.display = 'none';
      }
    });
  }

  function clearCompletedTodos() {
    let completedTodos = document.querySelectorAll('#todoList li .icon-check');
    completedTodos.forEach((completedTodo) => {
      let listItem = completedTodo.parentNode;
      let todoText = listItem.querySelector('p');
      if (
        completedTodo.classList.contains('icon-check') &&
        todoText.style.textDecoration === 'line-through'
      ) {
        listItem.remove();
      }
    });
    updateItemsLeft();
    saveItems();
  }

  // Initial update of items left count
  updateItemsLeft();
});


// Function to update the items left count
function updateItemsLeft() {
  let itemsList = document.querySelectorAll('#todoList li');
  let removedItems = document.querySelectorAll('#todoList li.item-checked');
  let itemsLeft = itemsList.length - removedItems.length;
  let itemsLeftLabel = document.querySelector('.items-left');
  itemsLeftLabel.textContent = `${itemsLeft} ${itemsLeft === 1 ? 'item' : 'items'} left`;
}
