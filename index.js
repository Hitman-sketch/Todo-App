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
  let recordLabelsElements = document.querySelectorAll('.record label');
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

    // Added dark mode class to record labels
    recordLabelsElements.forEach(function (label) {
      label.classList.add('dark_mode');
    });
  } else {
    // Switch to light mode
    imageElement.src = "./images/icon-moon.svg";
    bodyElement.classList.remove("dark_mode");
    headerElement.classList.remove('dark_mode');
    todosContainerElement.classList.remove('dark_mode');
    recordElement.classList.remove('dark_mode');
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

    // Removed dark mode class from  labels
    recordLabelsElements.forEach(function (label) {
      label.classList.remove('dark_mode');
    });
  }
}


//---------------------------------------------------------------------------------------------

//----------------------------------//
var circleIcons = document.querySelectorAll('.icon-circle');
// Function to toggle the list item when the circle icon is clicked
function toggleListItem() {
  

  // Toggle the 'icon-check' class on the circle icon
  this.classList.toggle('icon-check');

  // Find the corresponding list item and todo text
  var listItem = this.parentNode;
  var todoText = listItem.querySelector('p');

  // Toggle the strikethrough effect on the todo text
  todoText.classList.toggle('strikethrough');

  // Check if the cross icon already exists
  var crossIcon = listItem.querySelector('.icon-cross');
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
  }
}

// Function to handle adding a new list item
function addListItem() {
  var inputText = document.getElementById('inputText');
  var text = inputText.value.trim();
  if (text !== "") {
    var todoList = document.getElementById('todoList');
    var listItem = document.createElement('li');

    // Create circle icon and appended it to the list item
    var circleSpan = document.createElement('span');
    circleSpan.classList.add('icon-circle');
    circleSpan.classList.add('align');
    var circleIcon = document.createElement('img');
    circleIcon.setAttribute('src', './images/icon-circle.svg');
    circleIcon.setAttribute('alt', 'circle');
    circleSpan.appendChild(circleIcon);
    listItem.appendChild(circleSpan);

    // Create todo text element and appended it to the list item
    var todoText = document.createElement('p');
    todoText.textContent = text;
    listItem.appendChild(todoText);

    // Check if there is a first item in the list
    var firstItem = todoList.firstChild;
    if (firstItem) {
      todoList.insertBefore(listItem, firstItem);
    } else {
      todoList.appendChild(listItem);
    }

    // Add the event listener to the new circle icons
    circleSpan.addEventListener('click', toggleListItem);
    circleSpan.addEventListener('mouseover', function() {
      this.classList.add('hover');
    });
    circleSpan.addEventListener('mouseout', function() {
      this.classList.remove('hover');
    });
    inputText.value = "";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var circleIcon = document.getElementById('circleIcon');
  circleIcon.addEventListener('click', addListItem);
});
