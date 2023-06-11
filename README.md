# Todo-App
This is a TodoApp for managing user todo list, comes with a dark mode and light mode, it is an NSS Project given by Amalitech..




function addListItem() {
  // Get the necessary elements
  const itemInput = document.getElementById('inputText');
  
  // Function to generate a new item
  function generateItem() {
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
      circleSpan.addEventListener('click', toggleListItem);
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

      // Insert the new list item at the top of the list
      todoList.insertBefore(listItem, todoList.firstChild);

      // Clear the input text
      itemInput.value = '';

      updateItemsLeft();
    }
  }

  // Event listener for Enter key press
  itemInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      generateItem();
    }
  });
  
  // Event listener for click on a button or circle icon
  const circleClick = document.getElementById('circleIcon');
  circleClick.addEventListener('click', generateItem);
}





