import './style.css';

class ToDoList {

  items;
  listDepth;

  constructor(listDepth = 0) {
    this.items = [];
    this.listDepth = listDepth;
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
  finished;
  itemList;
  dueDate;
  notes;

  constructor(title = "test", description = "test", priority = 1, listDepth, dueDate = "January 1st, 2023", notes) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.itemList = new ToDoList((listDepth + 1));
    this.finished = false;
    this.itemDiv = this.itemList.ownDIv
    this.dueDate = dueDate
    this.notes = notes
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




function displayList(itemList) {
  if ((itemList.items.length === 0) && (itemList.listDepth === 0)) {
    displayInstructions();
  }
  else {
    let containerName = 'main-list';
    if (itemList.listDepth > 0) {
      console.log('hi')
      containerName = 'content-tasks';
    }
    let container = document.getElementById(containerName);
    for (let i = 0; i < itemList.items.length; i++){
      let newButton = document.createElement('button')
      newButton.setAttribute('class', `${containerName}-item`)
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
  document.getElementById('title').innerText = item.title;
  document.getElementById('description').innerText = item.description;
  document.getElementById('priority').innerText = `Priority: ${item.priority}`;
  document.getElementById('due-date').innerText = item.dueDate;
  document.getElementById('notes').innerText = item.notes;
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
let bottomItem1 = new ToDoItem;
let bottomItem2 = new ToDoItem;
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

displayList(mainList);