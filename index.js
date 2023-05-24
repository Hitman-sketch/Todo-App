function toggle_icon() {
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
    imageElement.src = "./images/icon-sun.svg";
    bodyElement.classList.add("dark_mode");
    headerElement.classList.add('dark_mode');
    quaryInputElement.classList.add('dark_mode');
    todosContainerElement.classList.add('dark_mode');
    recordElement.classList.add('dark_mode');
    itemsLeftLabelElement.classList.add('dark_mode');
    clearLabelElement.classList.add('dark_mode');
    dragDropParagraphElement.classList.add('dark_mode');

    listItemsElements.forEach(function (item) {
      item.classList.add('dark_mode');
    });

    circleIconsElements.forEach(function (icon) {
      icon.classList.add('dark_mode');
    });

    recordLabelsElements.forEach(function (label) {
      label.classList.add('dark_mode');
    });
  } else {
    imageElement.src = "./images/icon-moon.svg";
    bodyElement.classList.remove("dark_mode");
    headerElement.classList.remove('dark_mode');
    brandIconElement.classList.remove('dark_mode');
    brandIconTitleElement.classList.remove('dark_mode');
    quaryInputElement.classList.remove('dark_mode');
    todosContainerElement.classList.remove('dark_mode');
    recordElement.classList.remove('dark_mode');
    itemsLeftLabelElement.classList.remove('dark_mode');
    clearLabelElement.classList.remove('dark_mode');
    dragDropParagraphElement.classList.remove('dark_mode');
    listItemsElements.forEach(function (item) {
      item.classList.remove('dark_mode');
    });

    circleIconsElements.forEach(function (icon) {
      icon.classList.remove('dark_mode');
    });

    recordLabelsElements.forEach(function (label) {
      label.classList.remove('dark_mode');
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var circleIcon = document.getElementById('circleIcon');
  circleIcon.addEventListener('click', function() {
    var inputText = document.getElementById('inputText');
    var text = inputText.value.trim();
    if (text !== "") {
      var todoList = document.getElementById('todoList');
      var listItem = document.createElement('li');

      var circleSpan = document.createElement('span');
      circleSpan.classList.add('circle');
      circleSpan.classList.add('align');
      var circleIcon = document.createElement('img');
      circleIcon.setAttribute('src', './images/icon-circle.svg');
      circleIcon.setAttribute('alt', 'Circle');

      var todoText = document.createElement('p');
      todoText.textContent = text;

      listItem.appendChild(circleSpan);
      circleSpan.appendChild(circleIcon);
      listItem.appendChild(todoText);

       // Hide the footer and drag and drop section
       /*var footer = document.querySelector('footer');
       var dragDrop = document.querySelector('.drag-drop');
       footer.classList.add('hidden');
       dragDrop.classList.add('hidden');*/

      // Check if there is a first item
      var firstItem = todoList.firstChild;
      if (firstItem) {
        todoList.insertBefore(listItem, firstItem);
      } else {
        todoList.appendChild(listItem);
      }

      inputText.value = "";
    }
  });
});
