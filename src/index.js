import './style.css';

class ToDoList {

  items;
  listDepth;
  parentItem;

  constructor(listDepth = 0, parentItem = null, parentArray = []) {
    this.items = [];
    this.listDepth = listDepth;
    this.parentItem = parentItem;
    this.parentArray = parentArray;
  }

  addItem(item) {
    this.items.push(item)
  }

  getLength() {
    return this.items.length;
  }
 
}


class ToDoItem {

  title;
  description;
  priority;
  complete;
  itemList;
  dueDate;
  notes;
  parentItem;
  parentArray;

  constructor(title = "test", description = "test", priority = 1, listDepth, dueDate = "January 1st, 2023", notes, parentItem, parentArray = []) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.itemList = new ToDoList((listDepth + 1), this, parentArray);
    this.complete = false;
    this.itemDiv = this.itemList.ownDIv
    this.dueDate = dueDate
    this.notes = notes
    this.parentItem = parentItem;
    this.parentArray = parentArray;
    this.parentArray.push(parentItem);
  }

  toggleComplete() {
    console.log('toggle complete called')
    if (this.complete === false) {
      this.complete = true;
      console.log('set true')
    }
    else {
      this.complete = false;
      console.log('set false')
    }
  }

}

/*class ToDoForm {

  parentItem;
  title;
  description;
  priority;
  listDepth;

  constructor(parentItem, listDepth) {
    this.parentItem = parentItem;
    this.title = this.titleForm();
    this.description = this.descriptionForm();
    this.priority = this.priorityForm();
    this.listDepth = listDepth;
    let addButton = this.makeButton();

    this.formDiv = document.createElement('div');
    this.formDiv.setAttribute('class', 'form-div');
    this.formDiv.appendChild(this.title);
    this.formDiv.appendChild(this.description);
    this.formDiv.appendChild(this.priority)
    this.formDiv.appendChild(addButton);

    addButton.addEventListener('click', () => {
      this.addItemToButton();
    });
  }

  addItemToButton() { 
    const newItem = new ToDoItem(this.title.lastChild.value, this.description.lastChild.value, this.priority.lastChild.value, this.parentItem, this.listDepth)
    this.parentItem.addItem(newItem)
    this.parentItem.showList;
  };

  makeButton() {
    let newButton = document.createElement('button');
    newButton.setAttribute('id', 'toDoSubmit')
    newButton.innerHTML = 'Add Item';

    return newButton;
  }

  titleForm() {
    let titleDiv = document.createElement('div');
    let inputDiv = document.createElement('div');
    let titleInput = document.createElement('input');

    inputDiv.textContent = 'Task';
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('name', 'title');

    titleDiv.appendChild(inputDiv);
    titleDiv.appendChild(titleInput);

    return titleDiv;
  }

  descriptionForm() {
    let titleDiv = document.createElement('div');
    let inputDiv = document.createElement('div');
    let titleInput = document.createElement('input');

    inputDiv.textContent = 'Description';
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'description');
    titleInput.setAttribute('name', 'description');

    titleDiv.appendChild(inputDiv);
    titleDiv.appendChild(titleInput);

    return titleDiv;
  }

  get div() {
    return this.formDiv;
  }

  priorityForm() {
    let priorityDiv = document.createElement('div');
    let inputDiv = document.createElement('div');
    let priorityInput = document.createElement('input');

    priorityDiv.textContent = 'Priority';
    priorityInput.setAttribute('type', 'number');
    priorityInput.setAttribute('id', 'priority');
    priorityInput.setAttribute('name', 'priority');

    priorityDiv.appendChild(inputDiv);
    priorityDiv.appendChild(priorityInput);

    return priorityDiv;
  }

}





function addForm(addButton, parentItem, listDepth){
  const parentElement = addButton.parentElement;
  const newDiv = document.createElement('div');
  const testForm = new ToDoForm(parentItem, listDepth);
  let removeButton = makeRemoveButton(newDiv);
  newDiv.setAttribute('class', 'new-div');

  parentElement.appendChild(newDiv);
  newDiv.appendChild(removeButton);
  
  newDiv.appendChild(testForm.div);
}


function makeRemoveButton(removedDiv, ownerList = null, index = null){
  const addButton = document.createElement('button')
  addButton.setAttribute('class', 'remove-element')
  addButton.setAttribute('id', 'remove-element')
  addButton.innerText = "Cancel"
  addButton.addEventListener('click', () => {
    removeDiv(removedDiv)
    if (ownerList != null) {
      ownerList.removeItem(index);
    }
  });
  return addButton;
}

function makeTaskButton(parentItem, listDepth){
  const addButton = document.createElement('button')
  addButton.setAttribute('class', 'show-add-form')
  addButton.setAttribute('id', 'show-add-form')
  addButton.innerText = "Add Task"
  addButton.addEventListener('click', () => {addForm(addButton, parentItem, listDepth)});
  return addButton;
}

function makeFinishedCheckBox(index, listDepth){
  const addBox = document.createElement('input');
  addBox.setAttribute('type', 'checkbox');
  addBox.addEventListener("change", () => {toggleFinished(index, listDepth)})
  addBox.setAttribute('id', `finished-${index}-${listDepth}`);
  addBox.setAttribute('name', `finished-${index}-${listDepth}`);
  return addBox;
}

function toggleFinished(index, listDepth){

  let checkChecked = document.getElementById(`finished-${index}-${listDepth}`) 
  let parentDiv = checkChecked.parentElement;
  if (checkChecked.checked === true) {
    parentDiv.classList.add('finished');
  }
  else {
    parentDiv.classList.remove('finished');
  }
}

function removeDiv(removedDiv) {
  if (removedDiv != (document.getElementById('content'))){
    let parantDiv = removedDiv.parentElement;
    parantDiv.removeChild(removedDiv)
  }
}

*/

/*const mainList = document.getElementById('main-list');
let todaysDate = new Date().toLocaleDateString()
let topBarDate = document.getElementById('top-bar-date')
topBarDate.innerText = todaysDate
let mainListDisplay = new ToDoList(mainList);
mainListDisplay.showList; */

let mainList = new ToDoList;
let defaultItem = new ToDoItem();
let currentItem = defaultItem;

//This button toggles item complete status and sends item to another function to add or remove strike-through from the display text accordingly.
document.getElementById('complete-button').addEventListener('click', function() {
  console.log("clicked")
  currentItem.toggleComplete();
  checkCompleteForDisplay(currentItem);
})

//This function adds or removes strikethrough text decoration from the display element depending on if the item is complete or not.
function checkCompleteForDisplay(item) {
  let display = document.getElementById('display')
  if (item.complete === true) {
    display.classList.add('complete');
  }
  else {
    display.classList.remove('complete')
  }
}

//This function displays the list as buttons with each item's title at the top left of the screen, or on the right of the display element
//if they are sub-tasks.
function displayList(itemList, topLevelList = true) {
  if ((itemList.items.length === 0) && (itemList.listDepth === 0)) {
    displayInstructions();
  }
  else {
    let containerName = 'main-list';
    if (topLevelList === false) {
      containerName = 'content-tasks';
    }
    let container = document.getElementById(containerName);
    container.innerHTML = ""
    for (let i = 0; i < itemList.items.length; i++){
      let newButton = document.createElement('button')
      newButton.setAttribute('class', `${containerName}-item`)
      if (itemList.items[i].complete === true) {
        newButton.classList.add('complete')
      }
      newButton.setAttribute('id', `${containerName}-item-${i}`)
      newButton.innerText = itemList.items[i].title;
      newButton.addEventListener("click", function() {
        displayItem(itemList.items[i]);
      })
      container.appendChild(newButton);
    }
  }
}

function displayItem(item) {
  hideParents();
  currentItem = item;
  checkCompleteForDisplay(item)
  document.getElementById('title').innerText = item.title;
  document.getElementById('description').innerText = item.description;
  document.getElementById('priority').innerText = `Priority: ${item.priority}`;
  document.getElementById('due-date').innerText = item.dueDate;
  document.getElementById('notes').innerText = item.notes;
  displayList(item.itemList, false)
  if (item.parentArray[0] != undefined) {
    displayParents(item)
  }
  console.log(item.parentArray)
}

function displayParents(item) {
  console.log(item.parentArray)
  for (let i = 0; i < item.parentArray.length; i++) {
    let parentDiv = document.getElementById(`parent-div-${i}`);
    parentDiv.innerText = item.parentArray[i].title;
    parentDiv.style.visibility = 'visible';
  }
}

function hideParents() {
  for (let i = 0; i < 5; i++){
    let parentDiv = document.getElementById(`parent-div-${i}`);
    parentDiv.style.visibility = 'hidden';
  }
}

function setParentButtons() {
  for (let i = 0; i < 5; i++) {
    let parentDiv = document.getElementById(`parent-div-${i}`);
    parentDiv.addEventListener('click', function(){
      if (currentItem.parentArray.length >= i) {
        if (currentItem.parentArray[i] != undefined) {
          displayItem(currentItem.parentArray[i])
        }
      }
    })
  }
}




// The following code is only to create a test list
let notes1 = "There is a lot of dust on the floor.";
let notes2 = "It's amazing how quickly a stove can get dirty after cooking 400 gallons of spaghetti sauce. Next year, perhaps you should plant fewer tomatos.";
let notes3 = "Use cedar. It looks nice, it's relatively inexpensive, and it is naturally resistant to the elements."
let notes4 = "The pond should be complete by now. Surely some ducks have flown in? If not, do a lot of quacking and they'll come."
let topItem1 = new ToDoItem("Sweep Floor", "Get broom and sweep the floor.", 1, 0, "January 1st, 2023", notes1);
let topItem2 = new ToDoItem("Clean Kitchen", "The kitchen needs to have the stove cleaned.", 2, 0, "March 23rd, 2023", notes2);
let topItem3 = new ToDoItem("Build Deck", "Now that the old patio is gone, it's time for a new wooden deck.", 3, 0, "August 19th, 2022", notes3);
let topItem4 = new ToDoItem("Feed the ducks", "Remember not to give them bread, it isn't good for them.", 5, 0, "September 7th, 2074", notes4);
let bottomItem1 = new ToDoItem("test", "test", 1, 1, "January 5, 2043", "test notes only", topItem1);
let bottomItem2 = new ToDoItem("test", "test", 1, 1, "January 5, 2043", "test notes only", topItem2);;
//console.log(mainList.items);
mainList.addItem(topItem1);
mainList.addItem(topItem2);
mainList.addItem(topItem3);
mainList.addItem(topItem4);
//console.log(topItem1.itemList.items);
topItem1.itemList.addItem(bottomItem1);
topItem2.itemList.addItem(bottomItem2);
//console.log(topItem1.itemList.items);
//console.log(topItem2.itemList.items);
//console.log(mainList.items)


// Thus ends the test code. Anything after this line should be considered potential production code.
setParentButtons();
displayList(mainList);