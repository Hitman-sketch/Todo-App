function toggle_icon() {
  // Get the required elements
  let imageElement = document.getElementById("Img");
  let bodyElement = document.body;
  let headerElement = document.querySelector('header');
  let todosContainerElement = document.querySelector('.todos-container');
  let listItemsElements = document.querySelectorAll('.list li');
  let circleIconsElements = document.querySelectorAll('.circle');
  let recordElement = document.querySelector('.record');
  let itemsLeftLabelElement = document.querySelector('.items-left label');
  let clearLabelElement = document.querySelector('.clear label');
  let dragDropParagraphElement = document.querySelector('.drag-drop p');
  
  if (imageElement.src.endsWith("icon-moon.svg")) {
    // Switch to dark mode
    imageElement.src = "./images/icon-sun.svg";
    bodyElement.classList.add("dark_mode");
    headerElement.classList.add('dark_mode');
    todosContainerElement.classList.add('dark_mode');
    recordElement.classList.add('dark_mode');
    itemsLeftLabelElement.classList.add('dark_mode');
    clearLabelElement.classList.add('dark_mode');
    dragDropParagraphElement.classList.add('dark_mode');

    // Added dark mode class to list items
    listItemsElements.forEach(function (item) {
      item.classList.add('dark_mode');
    });

    // Added dark mode class to circle icons
    circleIconsElements.forEach(function (icon) {
      icon.classList.add('dark_mode');
    });

  } else {
    // Switch to light mode
    imageElement.src = "./images/icon-moon.svg";
    bodyElement.classList.remove("dark_mode");
    headerElement.classList.remove('dark_mode');
    todosContainerElement.classList.remove('dark_mode');
    itemsLeftLabelElement.classList.remove('dark_mode');
    clearLabelElement.classList.remove('dark_mode');
    dragDropParagraphElement.classList.remove('dark_mode');

    // Removed dark mode class from list items
    listItemsElements.forEach(function (item) {
      item.classList.remove('dark_mode');
    });

    // Removed dark mode class from circle icons
    circleIconsElements.forEach(function (icon) {
      icon.classList.remove('dark_mode');
    });
  }

}
//------------Toggle functionality for both list item and circle icon-------------------------------------------
function toggleListItem(event) {
  event.stopPropagation();
  const listItem = event.target.closest('li');
  const circleIcon = listItem.querySelector('.icon-circle');
  const todoText = listItem.querySelector('p');
  const isItemChecked = listItem.classList.contains('item-checked');
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
}


function toggleCircleIcon(event) {
  event.stopPropagation();
  const circleIcon = event.target.closest('.icon-circle');
  if (circleIcon) {
    const listItem = circleIcon.parentNode;
    const todoText = listItem.querySelector('p');
    const isItemChecked = listItem.classList.contains('item-checked');
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
}






function generateItem() {
  let itemInput = document.getElementById('inputText');
  let text = itemInput.value.trim();

  if (text !== '') {
    let todoList = document.getElementById('todoList');
    let listItem = document.createElement('li');

    // Make the list item draggable
    listItem.draggable = true;

    // Create todo text element and append it to the list item
    let todoText = document.createElement('p');
    todoText.textContent = text;
    listItem.appendChild(todoText);

    // Create circle icon and append it to the list item
    let circleSpan = document.createElement('span');
    circleSpan.classList.add('icon-circle');
    circleSpan.classList.add('align');
    let circleIcon = document.createElement('img');
    circleIcon.setAttribute('src', './images/icon-circle.svg');
    circleIcon.setAttribute('alt', 'circle');
    circleSpan.appendChild(circleIcon);
    listItem.appendChild(circleSpan);

    // Check if there is a first item in the list
    let firstItem = todoList.firstChild;
    if (firstItem) {
      todoList.insertBefore(listItem, firstItem);
    } else {
      todoList.appendChild(listItem);
    }

    // Add the event listener to the new circle icons hover and click events
  
    circleSpan.addEventListener('mouseover', function () {
      this.classList.add('hover');
    });
    circleSpan.addEventListener('mouseout', function () {
      this.classList.remove('hover');
    });

      // Add the event listener to the new circle icons click events
    circleSpan.addEventListener('click', toggleCircleIcon);
    listItem.addEventListener('click', toggleListItem);

    // Add event listeners for mobile view and Desktop view drag and drop functionality
    const listItemsMobile = document.querySelectorAll('#todoList li');
    listItemsMobile.forEach((item) => {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('drop', handleDrop);
    });
    // Clear the input text
    itemInput.value = '';

    updateItemsLeft();
  }
}
// Add items to list using the ENTER KEY or CLICK ON CIRCLE ICON...
function addListItem() {
  const itemInput = document.getElementById('inputText');

  function handleEnterKey(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      generateItem(itemInput.value.trim());
      itemInput.value = '';
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

// Call the addListItem function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  addListItem();
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
  
  let allLabel1 = document.querySelector('.all');
  allLabel1.addEventListener('click', showAllTodos);

  let activeLabel1 = document.querySelector('.active');
  activeLabel1.addEventListener('click', showActiveTodos);

  let completedLabel1 = document.querySelector('.completed');
  completedLabel1.addEventListener('click', showCompletedTodos);

  // ........Desktop view all, active, completed functionality...............


  let allLabel = document.querySelector('.cont_All');
  allLabel.addEventListener('click', showAllTodos);

  let completedLabel = document.querySelector('.cont_completed');
  completedLabel.addEventListener('click', showCompletedTodos);

  let activeLabel = document.querySelector('.cont_active');
  activeLabel.addEventListener('click', showActiveTodos);

  let clearCompletedLabel = document.querySelector('.clear');
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
      if (completedTodo.classList.contains('icon-check') && todoText.style.textDecoration === 'line-through') {
        listItem.remove();
      }
    });
    updateItemsLeft();
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