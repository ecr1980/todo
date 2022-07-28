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
 
}


class ToDoItem {

  title;
  description;
  priority;
  finished;
  itemList;

  constructor(title = "test", description = "test", priority = 1, listDepth) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.itemList = new ToDoList((listDepth + 1));
    this.finished = false;
    this.itemDiv = this.itemList.ownDIv
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

let top = new ToDoList;
let topItem1 = new ToDoItem;
let topItem2 = new ToDoItem;
let bottomItem1 = new ToDoItem;
let bottomItem2 = new ToDoItem;
console.log(top.items);
top.addItem(topItem1);
top.addItem(topItem2);
console.log(topItem1.itemList.items);
topItem1.itemList.addItem(bottomItem1);
topItem2.itemList.addItem(bottomItem2);
console.log(topItem1.itemList.items);
console.log(topItem2.itemList.items);
console.log(top.items)

