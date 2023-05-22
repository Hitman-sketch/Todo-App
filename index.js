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

