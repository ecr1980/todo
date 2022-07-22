import './style.css';

class ToDoList {

  itemList;
  ownDiv;
  newListContainer;
  listDepth;

  constructor(ownDIv, listDepth = 0) {
    this.itemList = [];
    this.ownDiv = ownDIv;
    this.newListContainer = document.createElement('div')
    this.listDepth = listDepth;
    console.log(this.listDepth)
  }

  addItem(item) {
    this.itemList.push(item)
    this.showList;
  }

  makeListADiv(thisList) {
    const newListDiv = document.createElement('div')
    const titleDiv = document.createElement('div')
    const descriptionDiv = document.createElement('div')
    const newList = thisList.itemList

    newListDiv.setAttribute('class', 'new-list-div')

    newListDiv.appendChild(titleDiv)
    newListDiv.appendChild(descriptionDiv)
    newListDiv.appendChild(this.newListContainer)
    newList.showList

    titleDiv.innerText = thisList.title
    descriptionDiv.innerText = thisList.description

    return newListDiv;
  }

  removeItem(item) {
    let newItemList = this.itemList.splice(item);
    this.itemList = newItemList;
  }

  sortList() {
    this.itemList.sort((a,b) => {
      return a.priority - b.priority;
    });
  }

  get showList(){
    let listDiv = document.createElement('div')
    if (this.itemList.length === 0) {
      listDiv.innerHTML = ''
    }
    else {
      this.sortList();
      for (let i = 0; i < this.itemList.length; i++) {
        let itemDiv = document.createElement('div');
        let newCheckBox = makeFinishedCheckBox(i, this.listDepth);
        itemDiv = this.makeListADiv(this.itemList[i]);
        itemDiv.appendChild(newCheckBox)
        listDiv.appendChild(itemDiv);
        this.itemList[i].showList;
      };
    };
    listDiv.appendChild(makeTaskButton(this, this.listDepth))
    if (this.listDepth > 0) {
      listDiv.appendChild(makeRemoveButton(this.ownDiv.parentElement))
    }
    this.ownDiv.innerHTML = "";
    this.ownDiv.appendChild(listDiv);
    return listDiv;
  };

  
}


class ToDoItem {

  title;
  description;
  priority;
  finished;
  internalSteps;
  itemList;
  itemDiv;

  constructor(title, description, priority, parentItem, listDepth) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    console.log('new list constructor')
    console.log(listDepth)
    console.log('new list constructor')
    this.itemList = new ToDoList(parentItem.newListContainer, (listDepth + 1));
    this.finished = false;
    this.itemDiv = this.itemList.ownDIv
  }

}

class ToDoForm {

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

const mainList = document.getElementById('main-list');
let mainListDisplay = new ToDoList(mainList);
mainListDisplay.showList;



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


function makeRemoveButton(removedDiv){
  const addButton = document.createElement('button')
  addButton.setAttribute('class', 'remove-element')
  addButton.setAttribute('id', 'remove-element')
  addButton.innerText = "Cancel"
  addButton.addEventListener('click', () => {removeDiv(removedDiv)});
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
  let parantDiv = removedDiv.parentElement;
  parantDiv.removeChild(removedDiv)
}



