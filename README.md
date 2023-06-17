# Todo-App
This is a TodoApp for managing user todo list, comes with a dark mode and light mode, it is an NSS Project given by Amalitech..




// Function to toggle the list item when the circle icon is clicked
function toggleListItem() {
  // Toggle the 'icon-check' class on the circle icon
  this.classList.toggle('icon-check');
  // Find the corresponding list item and todo text
  let listItem = this.parentNode;
  let todoText = listItem.querySelector('p');
  // Toggle the strikethrough effect on the todo text
  if (this.classList.contains('icon-check')) {
    todoText.style.textDecoration = 'line-through';
  } else {
    todoText.style.textDecoration = 'none';
  }
 

  // Check if the cross icon already exists
  let crossIcon = listItem.querySelector('.icon-cross');
  if (crossIcon) {
    // Remove the cross icon if it already exists
    listItem.removeChild(crossIcon);
  } else {
    // Create and append the cross icon
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

  updateItemsLeft();
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

    //Event listner to check thr icon when I click the item
    listItem.addEventListener('click', toggleListItem);
    circleSpan.addEventListener('click', toggleListItem);
    // Add the event listener to the new circle icons hover and click events
    circleSpan.addEventListener('mouseover', function () {
      this.classList.add('hover');
    });
    circleSpan.addEventListener('mouseout', function () {
      this.classList.remove('hover');
    });

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



-------------------------------------------------------------------
// Function to toggle the list item when the circle icon is clicked
function toggleListItem(event) {
  event.stopPropagation();
  const listItem = event.ta;
  const checkIcon = listItem.querySelector('.icon-check');
  const todoText = listItem.querySelector('p');

  if (checkIcon) {
    // Remove the check icon
    listItem.removeChild(checkIcon);
    listItem.classList.remove('item-checked');
    checkIcon.classList.remove('icon-check');
    todoText.style.textDecoration = 'none';
  } else {
    // Create and append the check icon
    const checkIcon = document.createElement('span');
    checkIcon.classList.add('icon-check');
    listItem.appendChild(checkIcon);
    listItem.classList.add('item-checked');
    todoText.style.textDecoration = 'line-through';
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

    if (isItemChecked) {
      // Remove the check icon
      listItem.classList.remove('item-checked');
      circleIcon.classList.remove('icon-check');
      todoText.style.textDecoration = 'none';
    } else {
      // Add the check icon
      listItem.classList.add('item-checked');
      circleIcon.classList.add('icon-check');
      todoText.style.textDecoration = 'line-through';
    }

    updateItemsLeft();
  }
}

